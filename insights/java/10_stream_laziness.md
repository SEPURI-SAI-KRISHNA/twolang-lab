## Interview angle

Frequently probed with a "will this line print anything?" question involving `peek()` or a `filter` before
`findFirst()` — testing whether the candidate actually understands the pull-based execution model, versus
having memorized "streams are lazy" as a fact they can't apply to predict real behavior.

## Industry practice

Misunderstanding stream laziness is a genuine source of production bugs: code that expects a stream's side
effects to run eagerly (via `peek` or a mapped function with side effects), or that builds a stream once and
tries to reuse it across two terminal operations — streams are single-use and throw
`IllegalStateException` on a second terminal call. Both patterns show up regularly in code review feedback
on teams newly adopting streams over classic for-loops.
