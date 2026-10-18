## Interview angle

A practical fluency check: ask a candidate to group a list of objects by a field and count each group — the
one-line `Collectors.groupingBy(..., Collectors.counting())` answer versus a manual `HashMap` and a for-loop
is a quick, low-drama way to gauge how comfortable someone is with the modern Collectors API versus
pre-Java-8 idioms.

## Industry practice

`groupingBy`/`partitioningBy` are the default idiom for reshaping data in any Java codebase written since
streams became standard — replacing manual accumulation loops almost entirely for this kind of task.
`teeing` (Java 12+) is newer and less universally known, reached for specifically to avoid iterating a stream
twice when two independent aggregations are both needed — a real, measurable efficiency win on large
collections that's still catching on in codebases slower to adopt newer Java versions.
