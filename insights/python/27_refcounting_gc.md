## Interview angle

A strong "do you understand CPython, not just Python" question: "if CPython uses reference counting, why
does it also need a garbage collector?" The correct answer — cycles — shows real understanding of memory
management rather than a vague "Python handles memory for you." A good follow-up is asking why reference
counting alone gives Python *deterministic* cleanup (unlike a purely tracing-GC language), which explains
why `__del__` timing is predictable in CPython in ways it isn't in, say, Java.

## Industry practice

Reference cycles are a real, if uncommon, source of memory growth in long-running Python services —
especially with objects that reference each other bidirectionally (parent/child trees, observer patterns,
callback registries). The standard fixes are breaking the cycle deliberately (a `weakref` on the back-edge)
or trusting the cyclic collector, tuning its thresholds only after profiling shows it's actually a
bottleneck — premature GC tuning is a common, usually unnecessary micro-optimization.
