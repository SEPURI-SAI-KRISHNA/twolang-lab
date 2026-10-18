## Interview angle

A quick, precise check: "what's the difference between `f.andThen(g)` and `f.compose(g)`?" Candidates who've
only glanced at the functional interfaces often guess, rather than knowing confidently — a good sign of
whether someone has actually built a validation pipeline or filter chain with these methods versus just
writing individual lambdas.

## Industry practice

`Predicate.and`/`or`/`negate` are the standard way to compose filter conditions without duplicating stream
`.filter()` calls or writing a nested boolean expression by hand — especially useful for building up a
condition from named, independently-testable pieces (`isActive.and(isPastDue)`). `Function.andThen`/`compose`
are common in validation and transformation pipelines where each step is a small, named function rather than
one large lambda that's hard to unit test in isolation.
