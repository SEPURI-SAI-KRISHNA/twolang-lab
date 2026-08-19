## Interview angle

Commonly tested by asking a candidate to sort a list of custom objects by multiple fields — checking
fluency with `Comparator.comparing().thenComparing()` chains versus writing a manual, error-prone
`compareTo` implementation by hand. It's also a decent proxy for how current someone's Java knowledge is,
since the fluent `Comparator` API is Java 8+.

## Industry practice

Most real sorting requirements involve multiple criteria or context-dependent ordering, which rules out
`Comparable`'s single "natural" ordering as a complete solution — so `Comparator` chains are the default
idiom in modern Java code. A hand-rolled multi-field `compareTo` with nested `if` statements is a code-review
red flag: it's both more error-prone (easy to get the tiebreak logic subtly wrong) and less readable than
the fluent equivalent.
