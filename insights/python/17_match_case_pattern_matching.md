## Interview angle

A "do you know Python 3.10+" signal question, and a good practical exercise is asking a candidate to
destructure a nested structure (a dict inside a list, or a custom class via `__match_args__`) rather than
just matching literal values — that's what separates `match` from a dressed-up `if`/`elif` chain, and testing
it directly shows whether someone understands it's real structural pattern matching.

## Industry practice

Adoption is still gradual — codebases with a minimum Python version below 3.10 can't use it at all, and many
teams are conservative about adopting it broadly since `if`/`elif` remains perfectly idiomatic for simple
cases. Where it earns its place is exactly the scenario shown here: dispatching on the *shape* of data (a
parsed JSON payload, an AST-like structure, a small sealed set of message types) where the destructuring is
doing real work, not just replacing a value comparison.
