## Interview angle

A good "do you actually understand this or just use it" question: "when would `.parallelStream()` make code
*slower*?" Strong candidates mention small collections (splitting/merging overhead dominates), I/O-bound
work (parallel streams are for CPU-bound work; blocking I/O ties up common-pool threads other parallel work
needs), and stateful/order-dependent operations — showing they've thought about the cost side, not just the
API.

## Industry practice

Parallel streams are a genuinely common performance-review "why is this slower than expected" finding — they
get reached for reflexively as a speed boost and then blamed when they don't help (or actively hurt) on small
or I/O-bound workloads. They share the same common `ForkJoinPool` as everything else using parallel streams
JVM-wide, which is a real, sometimes-surprising source of contention in larger applications that use them in
more than one place without realizing the pool is shared.
