## Interview angle

"Implement a thread-safe counter without using `synchronized`" is a common exercise, and `AtomicInteger` is
the expected answer — a good follow-up is asking *how* CAS actually achieves thread safety without a lock,
which tests whether the candidate understands the mechanism (retry-on-conflict) rather than just knowing the
class name.

## Industry practice

Atomic classes are the default choice for simple shared counters and flags in performance-sensitive
concurrent code — metrics counters, rate limiters, simple state flags — specifically because CAS-based
updates avoid the overhead of acquiring a lock under contention. For anything beyond a single field (multiple
related values that need to change together atomically), a lock or a proper concurrent data structure is
still the right tool; atomics don't generalize to protecting multi-field invariants.
