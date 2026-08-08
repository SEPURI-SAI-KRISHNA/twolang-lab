// Generates the PUBLIC INDEX.md (what the deployed site is built from) as a trimmed
// snapshot of INDEX.full.md (the permanent, complete progress record), based on which
// topics have actually been "released" (committed/pushed) so far.
//
// Usage:
//   node tools/release.mjs                                   # regenerate INDEX.md from the current release set
//   node tools/release.mjs add python/01_x java/01_y          # add topics to the release set, then regenerate
//   node tools/release.mjs list                                # print the current release set
//
// After running this, also run (from web/): npm run content && npm run build
// to regenerate the site's data/pages to match.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FULL_INDEX = path.join(ROOT, "INDEX.full.md");
const PUBLIC_INDEX = path.join(ROOT, "INDEX.md");
const FULL_RELATIONS = path.join(ROOT, "relations.full.json");
const PUBLIC_RELATIONS = path.join(ROOT, "relations.json");
const RELEASED_FILE = path.join(ROOT, "RELEASED.json");

function loadReleased() {
  if (!existsSync(RELEASED_FILE)) return [];
  return JSON.parse(readFileSync(RELEASED_FILE, "utf8"));
}

function saveReleased(list) {
  writeFileSync(RELEASED_FILE, JSON.stringify(list, null, 2) + "\n");
}

function generate(releasedSet) {
  const text = readFileSync(FULL_INDEX, "utf8");
  const lines = text.split("\n");

  const itemRe = /^- \[( |x|~)\] (T[123]) (.+)$/;
  const linkRe = /^(.*) → `([^`]+)`$/;

  const out = [];
  let inProgressLog = false;

  for (const line of lines) {
    if (line.startsWith("## Progress log")) {
      inProgressLog = true;
      out.push(line);
      out.push("");
      out.push(
        `_This is a snapshot of an actively-growing index. ${releasedSet.size} of the full set of topics ` +
          "are released so far; more land incrementally. Full batch-by-batch history isn't published yet " +
          "to avoid spoiling what's coming._"
      );
      continue;
    }
    if (inProgressLog) continue; // skip the rest of the full progress log in the public version

    const m = line.match(itemRe);
    if (!m) {
      out.push(line);
      continue;
    }

    const [, , tier, rest] = m;
    const linkMatch = rest.match(linkRe);
    const itemText = linkMatch ? linkMatch[1] : rest;
    const notebookPath = linkMatch ? linkMatch[2] : null;
    const slug = notebookPath ? notebookPath.replace(/\.ipynb$/, "") : null;

    if (slug && releasedSet.has(slug)) {
      out.push(`- [x] ${tier} ${itemText} → \`${notebookPath}\``);
    } else {
      out.push(`- [ ] ${tier} ${itemText}`);
    }
  }

  writeFileSync(PUBLIC_INDEX, out.join("\n"));
}

function generateRelations(releasedSet) {
  const full = JSON.parse(readFileSync(FULL_RELATIONS, "utf8"));
  const edges = full.edges.filter((e) => releasedSet.has(e.a) && releasedSet.has(e.b));
  writeFileSync(PUBLIC_RELATIONS, JSON.stringify({ edges }, null, 2) + "\n");
  return edges.length;
}

function main() {
  const args = process.argv.slice(2);
  let released = loadReleased();

  if (args[0] === "list") {
    console.log(released.length ? released.join("\n") : "(nothing released yet)");
    return;
  }

  if (args[0] === "add") {
    const toAdd = args.slice(1);
    if (toAdd.length === 0) {
      console.error("usage: node tools/release.mjs add <lang/slug> [<lang/slug> ...]");
      process.exit(1);
    }
    const set = new Set(released);
    for (const slug of toAdd) set.add(slug);
    released = [...set];
    saveReleased(released);
    console.log(`added ${toAdd.length} topic(s). total released: ${released.length}`);
  }

  const releasedSet = new Set(released);
  generate(releasedSet);
  const edgeCount = generateRelations(releasedSet);
  console.log(`wrote INDEX.md with ${released.length} released topic(s), relations.json with ${edgeCount} edge(s).`);
}

main();
