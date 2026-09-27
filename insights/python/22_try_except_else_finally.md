## Interview angle

"What does `else` do in a try/except that `finally` doesn't?" is a great small question because most
Python developers have never used `try`'s `else` clause at all — it's one of the least-used pieces of core
syntax, and knowing it exists (and why it's more correct than just appending code after the `except` block)
is a real signal of having read the language reference rather than pattern-matched from Stack Overflow.

## Industry practice

The `finally`-overrides-`return` gotcha is a real, documented trap — linters (pylint's `lost-exception`,
ruff's equivalent) specifically flag a `return`/`break`/`continue` inside a `finally` block, because it's
almost never intentional and it silently discards whatever exception or return value was in flight. Any code
reviewer who's been burned by it once treats a bare `return` inside `finally` as an automatic red flag for
the rest of their career.
