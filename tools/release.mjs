// Generates the PUBLIC INDEX.md (what the deployed site is built from) as a trimmed
// snapshot of INDEX.full.md (the permanent, complete progress record).
//
// A topic counts as "released" the moment its notebook is committed to git --
// that's the real signal, since that's exactly what's present in the checkout
// Cloudflare Pages builds from. No manual step: this runs automatically as part
// of `npm run build` / `npm run dev` / `npm run content` (see web/package.json),
// so pushing a notebook is the only thing you need to do.
//
// Usage:
//   node tools/release.mjs         # regenerate INDEX.md + relations.json from git state
//   node tools/release.mjs list    # print the currently auto-detected release set

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FULL_INDEX = path.join(ROOT, "INDEX.full.md");
const PUBLIC_INDEX = path.join(ROOT, "INDEX.md");
const FULL_RELATIONS = path.join(ROOT, "relations.full.json");
const PUBLIC_RELATIONS = path.join(ROOT, "relations.json");

function getTrackedNotebooks() {
  // Tracked in git (staged or committed), not just present on disk -- so notebooks
  // generated locally ahead of time but not yet added/committed stay unreleased.
  let out;
  try {
    out = execFileSync("git", ["ls-files", "python", "java"], { cwd: ROOT, encoding: "utf8" });
  } catch {
    return new Set(); // not a git checkout / git unavailable -- release nothing
  }
  return new Set(out.split("\n").filter((f) => f.endsWith(".ipynb")));
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

    if (notebookPath && releasedSet.has(notebookPath)) {
      out.push(`- [x] ${tier} ${itemText} → \`${notebookPath}\``);
    } else {
      out.push(`- [ ] ${tier} ${itemText}`);
    }
  }

  writeFileSync(PUBLIC_INDEX, out.join("\n"));
}

function generateRelations(releasedSlugSet) {
  const full = JSON.parse(readFileSync(FULL_RELATIONS, "utf8"));
  const edges = full.edges.filter((e) => releasedSlugSet.has(e.a) && releasedSlugSet.has(e.b));
  writeFileSync(PUBLIC_RELATIONS, JSON.stringify({ edges }, null, 2) + "\n");
  return edges.length;
}

function main() {
  const trackedNotebooks = getTrackedNotebooks(); // e.g. "python/02_mutable_default_argument.ipynb"
  const releasedSlugs = new Set([...trackedNotebooks].map((f) => f.replace(/\.ipynb$/, "")));

  if (process.argv[2] === "list") {
    console.log(releasedSlugs.size ? [...releasedSlugs].sort().join("\n") : "(nothing released yet)");
    return;
  }

  generate(trackedNotebooks);
  const edgeCount = generateRelations(releasedSlugs);
  console.log(`wrote INDEX.md with ${releasedSlugs.size} released topic(s), relations.json with ${edgeCount} edge(s).`);
}

main();
