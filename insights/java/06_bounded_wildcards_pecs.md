## Interview angle

Frequently tested by asking a candidate to write a generic copy or transform utility's signature, to see
whether they reach for `? extends`/`? super` correctly rather than over-constraining with an exact type
parameter. It's a strong, practical signal of real API-design experience versus textbook generics knowledge
that never got applied to an actual method signature.

## Industry practice

The `java.util.Collections` API (`copy`, `max`, `addAll`) is essentially a PECS reference implementation, and
well-designed generic library methods across the ecosystem follow the same shape. In code review on
library-quality Java code, an overly rigid generic signature that forces callers into unnecessary casts or
duplicate overloads is a routine, specific comment — "this should probably be `? extends T`."
