// Converts ../INDEX.md + ../{python,java}/*.ipynb + ../insights/**/*.md + ../relations.json
// into JSON the app reads. Re-run any time a new notebook batch or insight/relation lands:
//   node scripts/build-content.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const WEB = path.resolve(__dirname, "..");

const ANSI_RE = /\x1b\[[0-9;]*m/g;

function stripAnsi(s) {
  return s.replace(ANSI_RE, "");
}

function joinSource(src) {
  return Array.isArray(src) ? src.join("") : src ?? "";
}

// ---------- 1. Parse INDEX.md into a category tree ----------

function parseIndex() {
  const text = readFileSync(path.join(ROOT, "INDEX.md"), "utf8");
  const lines = text.split("\n");

  const tree = { python: [], java: [] };
  let lang = null;
  let category = null;
  let inBody = false;

  const itemRe = /^- \[( |x|~)\] (T[123]) (.+)$/;
  const linkRe = /^(.*) → `([^`]+)`$/;

  for (const line of lines) {
    if (line.startsWith("## PYTHON")) {
      lang = "python";
      inBody = true;
      continue;
    }
    if (line.startsWith("## JAVA")) {
      lang = "java";
      inBody = true;
      continue;
    }
    if (line.startsWith("## Progress log")) {
      inBody = false;
      continue;
    }
    if (!inBody || !lang) continue;

    if (line.startsWith("### ")) {
      const heading = line.slice(4).trim();
      const m = heading.match(/^([A-Z])\.\s+(.+)$/);
      category = {
        letter: m ? m[1] : heading,
        name: m ? m[2] : heading,
        heading,
        items: [],
      };
      tree[lang].push(category);
      continue;
    }

    const m = line.match(itemRe);
    if (m && category) {
      const [, statusChar, tier, rest] = m;
      const linkMatch = rest.match(linkRe);
      const text = linkMatch ? linkMatch[1] : rest;
      const notebookPath = linkMatch ? linkMatch[2] : null;
      category.items.push({
        status: statusChar === "x" ? "done" : statusChar === "~" ? "in_progress" : "todo",
        tier,
        text,
        notebookPath,
      });
    }
  }

  return tree;
}

// ---------- 2. Convert a notebook into simplified JSON ----------

function convertOutputs(outputs) {
  if (!outputs) return [];
  return outputs.map((out) => {
    if (out.output_type === "stream") {
      return { kind: "stream", stream: out.name, text: stripAnsi(joinSource(out.text)) };
    }
    if (out.output_type === "error") {
      return {
        kind: "error",
        ename: out.ename,
        evalue: out.evalue,
        traceback: (out.traceback || []).map(stripAnsi),
      };
    }
    if (out.output_type === "execute_result" || out.output_type === "display_data") {
      const data = out.data || {};
      const text = data["text/plain"] ? stripAnsi(joinSource(data["text/plain"])) : "";
      const html = data["text/html"] ? joinSource(data["text/html"]) : null;
      return { kind: "result", text, html };
    }
    return { kind: "unknown", raw: out };
  });
}

function readInsights(language, slug) {
  const file = path.join(ROOT, "insights", language, `${slug}.md`);
  if (!existsSync(file)) return { interview: null, industryPractice: null };
  const text = readFileSync(file, "utf8");
  const interviewMatch = text.match(/## Interview angle\s*\n([\s\S]*?)(?=\n## |$)/);
  const practiceMatch = text.match(/## Industry practice\s*\n([\s\S]*?)(?=\n## |$)/);
  return {
    interview: interviewMatch ? interviewMatch[1].trim() : null,
    industryPractice: practiceMatch ? practiceMatch[1].trim() : null,
  };
}

function convertNotebook(language, notebookRelPath) {
  const full = path.join(ROOT, notebookRelPath);
  const nb = JSON.parse(readFileSync(full, "utf8"));

  const cells = nb.cells.map((cell) => {
    if (cell.cell_type === "markdown") {
      return { type: "markdown", source: joinSource(cell.source) };
    }
    if (cell.cell_type === "code") {
      return {
        type: "code",
        source: joinSource(cell.source),
        outputs: convertOutputs(cell.outputs),
      };
    }
    return { type: cell.cell_type, source: joinSource(cell.source) };
  });

  const firstMd = cells.find((c) => c.type === "markdown");
  let title = path.basename(notebookRelPath, ".ipynb");
  if (firstMd) {
    const headingLine = firstMd.source.split("\n").find((l) => l.trim().startsWith("#"));
    if (headingLine) title = headingLine.replace(/^#+\s*/, "").trim();
  }

  const slug = path.basename(notebookRelPath, ".ipynb");
  const insights = readInsights(language, slug);

  return { language, slug, title, notebookPath: notebookRelPath, cells, ...insights, related: [] };
}

// ---------- 3. Relations: concept map + compare pairs ----------

function loadRelations(topicsById) {
  const file = path.join(ROOT, "relations.json");
  if (!existsSync(file)) return { edges: [] };
  const raw = JSON.parse(readFileSync(file, "utf8"));
  const edges = (raw.edges || []).filter((e) => topicsById.has(e.a) && topicsById.has(e.b));
  return { edges };
}

// ---------- 4. Build output ----------

function main() {
  const tree = parseIndex();

  const outDataDir = path.join(WEB, "src", "data");
  const topicsDir = path.join(outDataDir, "topics");
  // Clean stale topic JSON first -- otherwise topics removed from (or never yet added to)
  // INDEX.md keep sitting here from a previous run, which both bloats the output and,
  // for a staged/partial release, leaks not-yet-released topic content into the data dir.
  rmSync(topicsDir, { recursive: true, force: true });
  mkdirSync(path.join(topicsDir, "python"), { recursive: true });
  mkdirSync(path.join(topicsDir, "java"), { recursive: true });

  const manifest = { python: [], java: [] };
  const searchIndex = [];
  const topicsById = new Map(); // "lang/slug" -> topic object

  for (const lang of ["python", "java"]) {
    for (const category of tree[lang]) {
      const manifestCategory = {
        letter: category.letter,
        name: category.name,
        heading: category.heading,
        items: [],
      };
      for (const item of category.items) {
        const manifestItem = {
          tier: item.tier,
          text: item.text,
          status: item.status,
          slug: null,
        };
        if (item.status === "done" && item.notebookPath) {
          const topic = convertNotebook(lang, item.notebookPath);
          topic.category = category.name;
          topic.categoryLetter = category.letter;
          topic.tier = item.tier;
          manifestItem.slug = topic.slug;
          manifestItem.title = topic.title;
          topicsById.set(`${lang}/${topic.slug}`, topic);
          searchIndex.push({
            language: lang,
            slug: topic.slug,
            title: topic.title,
            category: category.name,
            tier: item.tier,
            text: item.text,
          });
        }
        manifestCategory.items.push(manifestItem);
      }
      manifest[lang].push(manifestCategory);
    }
  }

  // Wire up relations: attach `related` to each topic, build graph.json + compare-pairs.json
  const { edges } = loadRelations(topicsById);
  const compareRef = (id) => {
    const t = topicsById.get(id);
    return { language: t.language, slug: t.slug, title: t.title };
  };

  for (const edge of edges) {
    const a = topicsById.get(edge.a);
    const b = topicsById.get(edge.b);
    a.related.push({ language: b.language, slug: b.slug, title: b.title, kind: edge.kind, label: edge.label ?? null });
    b.related.push({ language: a.language, slug: a.slug, title: a.title, kind: edge.kind, label: edge.label ?? null });
  }

  const graph = {
    nodes: [...topicsById.values()].map((t) => ({
      id: `${t.language}/${t.slug}`,
      language: t.language,
      slug: t.slug,
      title: t.title,
      category: t.category,
      categoryLetter: t.categoryLetter,
      tier: t.tier,
    })),
    edges: edges.map((e) => ({ a: e.a, b: e.b, kind: e.kind, label: e.label ?? null })),
  };

  const comparePairs = edges
    .filter((e) => e.kind === "compare")
    .map((e) => ({ a: compareRef(e.a), b: compareRef(e.b), label: e.label ?? null }));

  let converted = 0;
  for (const topic of topicsById.values()) {
    writeFileSync(path.join(topicsDir, topic.language, `${topic.slug}.json`), JSON.stringify(topic, null, 2));
    converted++;
  }

  writeFileSync(path.join(outDataDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  writeFileSync(path.join(outDataDir, "search-index.json"), JSON.stringify(searchIndex, null, 2));
  writeFileSync(path.join(outDataDir, "graph.json"), JSON.stringify(graph, null, 2));
  writeFileSync(path.join(outDataDir, "compare-pairs.json"), JSON.stringify(comparePairs, null, 2));

  console.log(`Converted ${converted} notebooks.`);
  console.log(`Relations: ${edges.length} edges (${comparePairs.length} compare pairs).`);
  console.log("Wrote manifest.json, search-index.json, graph.json, compare-pairs.json, and topic JSON files.");
}

main();
