## Interview angle

A good systems-thinking question for a candidate who's used Python at any real scale: "you're creating
millions of small objects — what's one language-level change that could meaningfully cut memory usage?"
`__slots__` is the right answer, and knowing the actual tradeoff (no dynamic attributes, tricky multiple
inheritance) shows they understand it's a deliberate design choice, not a free optimization.

## Industry practice

`__slots__` is standard practice in performance-sensitive libraries that create huge numbers of small
objects — ORMs, parsers, data-processing libraries, and game engines all use it for exactly this reason.
It's less common in typical application code, where the flexibility of `__dict__` usually outweighs the
memory savings — reached for specifically when profiling shows object overhead actually matters, not applied
reflexively to every class.
