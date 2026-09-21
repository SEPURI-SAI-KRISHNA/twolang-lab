## Interview angle

A practical "have you actually shipped date-handling bugs" question — asking why `Calendar.JANUARY == 0`
matters, or why `Date` being mutable is dangerous, tends to get much more specific, war-story answers from
candidates who've actually debugged an off-by-one-month bug or a shared-mutable-date bug in production than
from candidates reciting API docs.

## Industry practice

`java.time` has been the unambiguous default for any new code since Java 8 — style guides and static analysis
at any team with a modern codebase flag new usage of `Date`/`Calendar` as a code-review comment on sight.
Legacy codebases still interoperate with the old API at I/O boundaries (some old libraries and JDBC drivers
still speak `java.sql.Date`), so `Date.from(instant)`/`Date.toInstant()`-style conversions at the boundary,
followed by `java.time` everywhere else, is the standard migration pattern.
