## Interview angle

"Implement an LRU cache" is one of the most common interview exercises in the industry, and the elegant
solution is a `LinkedHashMap` in access-order mode with `removeEldestEntry` overridden — candidates who know
this solve it in a few lines; candidates who don't end up hand-rolling a doubly-linked list plus a hash map
from scratch. Recognizing when the "hard" data-structure question has a one-line stdlib answer is itself a
valuable signal.

## Industry practice

Choosing the wrong `Map` implementation is a real, if quiet, bug source — code that implicitly depends on
`HashMap`'s iteration order (which can silently change between JVM versions or even between runs) is fragile
in a way that's easy to miss until it breaks. `TreeMap` is reached for specifically when sorted iteration is
a genuine requirement, not a default; `LinkedHashMap` is the pragmatic middle ground whenever deterministic
order (either insertion or access) actually matters for correctness.
