# Contributing

This is primarily a personal, ongoing learning log — new topics get added incrementally rather than all at
once — but corrections and suggestions are genuinely welcome.

## Reporting a mistake

The one rule this whole project holds itself to: **every code example's output is real, actually executed**,
not written from memory or "this should print." If you spot a claim that's wrong, or you ran the same code
and got a different result, please [open an issue](../../issues/new/choose) — that's the most valuable kind
of contribution this repo can get, since it directly tests the project's core premise.

## Suggesting a topic

Open an issue describing the feature/gotcha and why it belongs alongside the existing topics (see `INDEX.md`
for the kind of thing already covered, and the tone/depth of an existing notebook under `python/` or
`java/` for the bar to match).

## Contributing a topic directly

If you want to submit a topic yourself:

1. Every code cell must be **actually executed**, with the real output captured — no hand-written or edited
   output. Notebooks run under a registered Jupyter kernel (`python-mastery` for Python,
   `rapaio-jupyter-kernel` for Java via JShell — see the notebooks' kernel metadata).
2. Add a short markdown explanation cell above the code, focused on *why* the behavior is non-obvious, not
   just what the syntax does.
3. Add a matching entry to `INDEX.md` (tier `T1`/`T2`/`T3`, linked to your notebook path).
4. Optionally, add `insights/<lang>/<slug>.md` with `## Interview angle` and `## Industry practice` sections
   — real, specific reasoning, not generic filler.
5. Run `cd web && npm run build` and confirm it succeeds before opening a PR.

## Local development

See the "Running locally" section in `README.md`.
