## Interview angle

A strong "do you know modern Java" question with real depth to probe: ask why a `sealed` interface plus a
pattern-matching `switch` lets you drop the `default` branch, and what happens if someone adds a new
permitted subtype later. The correct answer — the compiler forces every exhaustive switch over that sealed
type to be updated, turning a class of runtime bugs (an unhandled new case silently falling through) into a
compile-time error — is a great signal for someone who thinks about API evolution, not just current-state
correctness.

## Industry practice

`sealed` plus exhaustive pattern-matching switches are rapidly becoming the idiomatic way to model closed
sets of variants in Java 21+ codebases — effectively Java's answer to algebraic data types / discriminated
unions from other languages — replacing older patterns like the visitor design pattern or instanceof
chains for exactly this use case. Teams modeling domain events, parser ASTs, or API response variants are
early, enthusiastic adopters specifically because the compiler-enforced exhaustiveness catches an entire
category of "forgot to handle the new case" bugs at build time instead of in production.
