# twolang-lab

**Python & Java, in depth — every example actually executed, real output, nothing written from memory.**

[![Live site](https://img.shields.io/badge/live-twolang--lab.pages.dev-0f6e64)](https://twolang-lab.pages.dev)
[![CI](https://github.com/SEPURI-SAI-KRISHNA/twolang-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/SEPURI-SAI-KRISHNA/twolang-lab/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**[twolang-lab.pages.dev →](https://twolang-lab.pages.dev)**

## What this is

A growing collection of Python and Java topics aimed at the stuff most tutorials — and most LLM-written
code — skip past: the small-int cache, why `finally` can silently swallow an exception, what `List.of()`
actually enforces, why a `ConcurrentModificationException` doesn't always fire when you'd expect one, what
`invokedynamic` actually does. Every one of those claims above was verified by running real code against
Python 3.12 and OpenJDK 21 and recording exactly what came back — including the times the expected result
*didn't* show up, which turned out to be some of the most interesting findings.

Each topic gets:

- A real Jupyter notebook — markdown explanation, syntax-highlighted code, and the **actual captured
  output** of running it (Python via a real kernel, Java via a JShell-backed kernel)
- A **predict-the-output** interaction — the recorded output is hidden behind a reveal, so reading a topic
  is active recall, not passive scrolling
- An **interview angle** and **industry practice** note — why this specific thing gets asked, and how it
  actually shows up in real codebases/tooling
- A live, editable **Python playground** (real CPython compiled to WebAssembly via Pyodide, runs client-side)
- Placement on a curated **concept map** and, where a genuine equivalent exists, a **Python ↔ Java compare
  view** — not a forced 1:1 mapping, only pairs that are actually the same underlying idea

## Status

This repo grows incrementally rather than all at once — new topics get added and pushed in small batches.
Check `INDEX.md` for exactly what's live right now and what tier (`T1` high-leverage / `T2` intermediate /
`T3` internals) each topic is.

## Repo structure

```
python/               Released Python notebooks (.ipynb, real executed output)
java/                  Released Java notebooks (.ipynb, real executed output)
insights/python/       Interview-angle + industry-practice notes, one .md per released Python topic
insights/java/         Same, for Java
INDEX.md               The taxonomy: every released topic, its tier, and a link to its notebook
relations.json         Curated concept-map edges + Python↔Java compare pairs (released topics only)
RELEASED.json          The list of topic slugs currently live
tools/release.mjs      Publishes more topics from the maintainer's full local index (see below)
web/                   The Next.js site (static export, deployed to Cloudflare Pages)
```

`web/` is a normal static-export Next.js app — nothing in it is specific to this content beyond reading
the files above. `web/scripts/build-content.mjs` converts `INDEX.md` + the notebooks + `insights/` +
`relations.json` into the JSON the site actually renders, regenerated automatically on every build.

## Running locally

Requires Node 22+.

```bash
git clone https://github.com/SEPURI-SAI-KRISHNA/twolang-lab.git
cd twolang-lab/web
npm install
npm run dev      # regenerates content from ../INDEX.md, then starts the dev server
```

`npm run build` does the same content regeneration, then produces a static export in `web/out/` — that's
what Cloudflare Pages deploys.

To author a new notebook yourself, you'll need a Jupyter environment with a Python kernel and a
[JShell-backed Java kernel](https://github.com/padreati/rapaio-jupyter-kernel) registered — see
`CONTRIBUTING.md` for the actual authoring workflow and the standard this project holds every example to.

## Tech stack

Next.js 16 (App Router, static export) · React 19 · Tailwind CSS 4 · Pyodide (client-side Python) ·
Jupyter / JShell for authoring · deployed on Cloudflare Pages.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) — corrections to existing topics are the single most valuable kind
of issue this repo can get, since the whole premise rests on every recorded output being real.

## License

[MIT](LICENSE) © 2026 [Sepuri Sai Krishna](https://github.com/SEPURI-SAI-KRISHNA)
