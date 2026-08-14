## Interview angle

Frequently tested through a "implement a custom iterable class" exercise, which quietly checks several
things at once: does the candidate split `__iter__`/`__next__` correctly, do they remember to raise
`StopIteration`, and — the detail most people miss — does their `__iter__` return a *fresh* iterator (so the
object can be looped over more than once) or `self` (which exhausts after one pass)? That last distinction
is a great signal of real depth versus surface familiarity.

## Industry practice

Almost no production code hand-writes iterator classes anymore — generators (`yield`) are the idiomatic,
far more common way to implement custom iteration — but understanding the underlying protocol is essential
for reading library internals (how `itertools`, database cursors, or file objects behave) and for debugging
the recurring "why can I only loop over this once" bug, which is almost always an exhausted iterator being
mistaken for a reusable iterable.
