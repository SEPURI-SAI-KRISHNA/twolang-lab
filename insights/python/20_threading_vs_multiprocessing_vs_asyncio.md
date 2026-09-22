## Interview angle

A very common systems-design-adjacent question: "you need to speed up X — threading, multiprocessing, or
asyncio?" The strong answer starts by classifying the workload (CPU-bound vs. I/O-bound) before naming a
tool, since picking wrong is a real, common mistake — reaching for threading on CPU-bound work and being
confused when it doesn't help is one of the most frequent "why isn't my Python code faster" questions online.

## Industry practice

Real systems routinely combine all three: a web service might use asyncio for request handling
(I/O-bound — waiting on databases and downstream APIs), hand CPU-heavy work (image processing, ML inference)
off to a `ProcessPoolExecutor`, and occasionally use a background thread for something that must stay
synchronous but blocking (a legacy library with no async equivalent). Picking the wrong tool for a given
piece of work is a common performance-review finding — "why does adding more threads not help" is one of
the most frequent Python performance questions on any team's internal channels.
