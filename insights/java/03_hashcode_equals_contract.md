## Interview angle

A must-know for any Java role beyond entry level. Interviewers use it to check whether a candidate
understands *why* the contract exists — how hash-based lookup actually finds a bucket, then confirms the
match — rather than just knowing that IDEs auto-generate both methods together. That "why" is what lets
someone diagnose a broken contract in code they didn't write.

## Industry practice

IDE-generated implementations (IntelliJ, Eclipse) and Lombok's `@EqualsAndHashCode` exist specifically
because hand-written violations of this contract were such a common, hard-to-debug source of "why isn't my
object found in this `HashSet`" bugs. Even so, custom `equals`-only overrides — a frequent mistake on JPA
entity classes in particular — remain a recurring real-world defect that surfaces as objects mysteriously
"disappearing" from hash-based collections.
