## Interview angle

A precise, high-signal question: "what's the difference between `orElse` and `orElseGet`, and when does it
actually matter?" Candidates who've only skimmed `Optional`'s API often say "they're the same" — the correct
answer requires understanding that `orElse`'s argument is a plain method parameter, evaluated eagerly no
matter what, which is exactly the kind of detail that only shows up once you've profiled or debugged a
surprising extra database call.

## Industry practice

This is a real, recurring performance bug: `optional.orElse(expensiveFallbackCall())` silently pays the cost
of the fallback on every call, present or not. Static analysis tools (like Error Prone's `OptionalOrElseCall`)
which flag exactly this pattern for anything more expensive than a constant. It's also why `Optional` as a
*field* type is broadly considered an anti-pattern — `Optional` was designed as a return type for
"might not have a value," not as a general-purpose nullable wrapper for object state.
