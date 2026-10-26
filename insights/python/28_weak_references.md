## Interview angle

"How would you build a cache that doesn't cause a memory leak?" is a great open-ended question where
`weakref`/`WeakValueDictionary` is the ideal answer for a specific class of cache (one that shouldn't be the
reason an object stays alive). Candidates who reach for a plain `dict` cache without considering eviction or
weak references are showing a real gap most people only close after debugging an actual memory leak.

## Industry practice

Weak references show up in observer/listener registries (so registering a callback doesn't keep the
subscriber alive forever), object caches, and circular-reference-breaking patterns (e.g. a child object
holding a weak reference back to its parent instead of a strong one). It's a deliberately narrow tool — most
code never needs it — reached for specifically when "this collection shouldn't extend an object's lifetime"
is a real requirement, not a default choice.
