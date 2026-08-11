## Interview angle

Comes up naturally in questions about caching, memoization, or writing pure functions, and it's a good
filter question because a shallow `copy()` of a list-of-lists is a *silent* bug — nothing raises, the
program just quietly shares state it shouldn't. Interviewers use it to check whether a candidate reflexively
reaches for the correct copy depth for nested data, not just whether they can recite the two function names.

## Industry practice

Deep copies are used deliberately but sparingly, since they're O(total object size) and can be genuinely
expensive on large nested structures — which is part of why performance-sensitive code often prefers
immutable data (tuples, frozen dataclasses) to sidestep the shallow-vs-deep question entirely rather than
paying for deep copies defensively. Libraries that hand back internal state (ORMs, caching layers) usually
document explicitly whether a returned value is a copy or a shared reference, because getting this wrong —
in either direction — is a recurring, hard-to-trace class of production bug.
