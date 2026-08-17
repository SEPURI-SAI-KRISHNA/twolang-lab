## Interview angle

Comes up as "what's the actual difference between `List.of()` and `Collections.unmodifiableList()`?" —
testing whether a candidate knows the newer factory methods are *genuinely* immutable, not just an
unmodifiable *view* over a backing list that something else can still mutate out from under you. That
distinction matters directly for defensive-copying discussions.

## Industry practice

`List.of()`/`Map.of()` are now the default choice for returning read-only collections from public APIs in
modern Java, specifically because they fail fast and loudly with `UnsupportedOperationException` on
accidental mutation, rather than the silent-drift risk of handing back a plain `ArrayList` and hoping callers
respect an unwritten "don't mutate this" convention.
