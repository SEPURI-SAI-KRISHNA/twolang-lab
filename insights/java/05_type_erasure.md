## Interview angle

A deep-cut but common senior-level question — "why can't you do `new T[]`?" or "why is `list instanceof
List<String>` meaningless?" — specifically used to separate candidates who've internalized how generics
actually work at the bytecode level from those who've only used generics as type-safety syntax without
thinking about what the compiler does with them.

## Industry practice

Understanding erasure is essential for reading and writing generic library code — collections, builders, and
reflection-based frameworks like Jackson or Gson have to work around it explicitly (via patterns like
`TypeToken`/`TypeReference`) to recover type information erasure throws away. Most application-level code
never has to think about this directly, but anyone writing a reusable generic API or debugging a
`ClassCastException` from an unchecked-warning code path hits it immediately.
