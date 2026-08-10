## Interview angle

A close cousin of the String `==` question and just as popular, specifically because autoboxing hides the
object-vs-primitive distinction. Candidates who've mostly worked with primitive `int` and never hit a
`List<Integer>` comparison bug in production often miss this entirely — which is exactly the gap the
question is designed to surface.

## Industry practice

This is a real, recurring bug in code that boxes numbers into collections (`List<Integer>`, `Map<Long, ...>`)
and compares with `==` instead of `.equals()`/`Objects.equals()`. It's especially insidious because it
"works" during development and small-number testing (within the -128..127 cache) and only fails against
production-scale data — a textbook "works on my machine" defect that's much harder to catch without a lint
rule or a code reviewer specifically watching for boxed-type comparisons.
