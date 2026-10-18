## Interview angle

A quick "how current is your Python" check similar to `match`/`case` — `StrEnum` is 3.11+, so knowing it
exists (and that its members compare equal to plain strings, unlike a regular `Enum`) signals someone's kept
up with recent releases. `Flag`'s bitwise-combination behavior is also a nice practical question: "how would
you represent a set of independently-togglable options?" — testing whether someone reaches for `Flag` or
falls back to a set of booleans or raw integer bit-twiddling.

## Industry practice

Plain `Enum` is the default choice for a closed set of named constants (statuses, categories, modes) instead
of magic strings or integers scattered through a codebase — it gives you type safety and an authoritative
list of valid values in one place. `StrEnum` specifically solves a real, common pain point: needing enum-like
safety internally while still serializing cleanly to plain strings for JSON APIs or database columns, without
the awkward `.value` access a regular `Enum` requires everywhere it crosses that boundary.
