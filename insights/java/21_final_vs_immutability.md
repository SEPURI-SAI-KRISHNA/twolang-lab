## Interview angle

A precise question that catches a common misconception: "if a field is `final`, is the object it points to
immutable?" Many candidates conflate the two. The correct answer — `final` only locks the reference, not the
referenced object's state — is exactly the distinction that matters for writing genuinely immutable classes,
not just ones that look immutable at a glance.

## Industry practice

Real immutability requires every field to be `final` *and* to only ever point at immutable objects (or
defensively copy mutable ones) — a `final List<String>` field is not actually immutable unless you also
never expose a mutable reference to that list. "Effectively final" is what makes local-variable capture in
lambdas work without ceremony; understanding it explains why some perfectly reasonable-looking code doesn't
compile the moment a captured variable gets reassigned anywhere in its scope.
