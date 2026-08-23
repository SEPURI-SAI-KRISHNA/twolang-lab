## Interview angle

One of the most reliable ways to separate candidates who've genuinely worked with concurrent Java from those
who've only read about it: "does `volatile` make `count++` thread-safe?" The correct, confident "no — it's
three unsynchronized steps, and `volatile` only guarantees visibility, not atomicity" answer, with a real
explanation of *why*, is a strong senior-level signal.

## Industry practice

Real production bugs from this distinction are usually silent and rare-looking — a counter that's very
occasionally slightly wrong under load, not a crash — which makes them notoriously hard to root-cause without
already knowing this exact rule. `AtomicInteger`/`AtomicLong` exist specifically to give you compound-operation
atomicity without full lock overhead, and are the default choice over hand-rolled `synchronized` counters in
performance-conscious concurrent code.
