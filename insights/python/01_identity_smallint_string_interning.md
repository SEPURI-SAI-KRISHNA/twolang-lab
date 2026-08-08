## Interview angle

This is a classic gotcha question precisely because it's easy to get *partially* right — most candidates
know "the cache is -5 to 256" as a memorized rule, without understanding *why*, which is exactly what a
good interviewer probes with a follow-up like "would that still be true inside a function, or in the REPL?"
A strong answer explains the mechanism (a real runtime singleton cache vs. compiler constant-folding vs.
string auto-interning are three different things), not just the observed behavior. That distinction is also
what lets someone predict *new* edge cases instead of having memorized one.

## Industry practice

In real code, nobody uses `is` to compare ints or strings for equality on purpose — linters catch it
outright (`ruff`'s F632, ILP32-style checks in most IDEs) and code review would flag it immediately. The one
legitimate, idiomatic use of `is` in production Python is comparing against singletons you control: `is
None`, `is True`, or your own sentinel objects and `Enum` members. String interning specifically matters in
performance-sensitive code that handles huge volumes of repeated short strings (tokenizers, parsers) where
an explicit `sys.intern()` call is sometimes used deliberately as a memory optimization.
