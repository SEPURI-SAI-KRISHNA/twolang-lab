## Interview angle

Interviewers use "which of these four kinds of method reference is this?" as a quick, low-stakes fluency
check when reviewing stream-heavy code — being able to name and explain the difference between a bound and
unbound instance reference in particular shows real comfort with the functional-interface machinery, not
just pattern-matching syntax you've seen before.

## Industry practice

Method references are near-universal in idiomatic modern Java stream pipelines specifically because they're
more concise and often clearer than the equivalent lambda (`Person::name` vs `p -> p.name()`). Code review at
teams with a strong functional-Java style will often suggest converting a trivial pass-through lambda into
the equivalent method reference; the reverse — an unnecessarily verbose lambda where a reference would do —
is a common, gentle style comment.
