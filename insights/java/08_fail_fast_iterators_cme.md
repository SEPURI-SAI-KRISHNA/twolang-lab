## Interview angle

A classic "find the bug" exercise — a for-each loop that calls `list.remove()` inside it — but the *strong*
version of this question (the one this topic demonstrates) probes whether the candidate knows fail-fast
detection isn't 100% reliable. A candidate who confidently says "that always throws `CME`" is exposing
exactly the kind of half-knowledge that turns into a real, position-dependent production bug.

## Industry practice

This is a genuinely common production bug, and an unsettling one because it's *position-dependent* — it
might pass a quick manual test and only misbehave on certain input sizes, which is why it sometimes survives
into production as a "flaky" issue before someone traces it back. The correct, idiomatic fix —
`Iterator.remove()` or `Collection.removeIf()` — is something any experienced Java reviewer checks for on
sight in a loop that mutates the collection it's iterating.
