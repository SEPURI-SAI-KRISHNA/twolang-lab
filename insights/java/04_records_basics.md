## Interview angle

A good "do you know modern Java" signal (records landed in Java 16). Interviewers sometimes push past "less
boilerplate" to the real tradeoff: records give you a correct, free `equals`/`hashCode`/`toString`, but you
give up mutable state and the ability to extend a class — articulating that tradeoff, not just the syntax,
is what shows genuine understanding.

## Industry practice

Records rapidly became the default choice for DTOs, API request/response payloads, and immutable value
objects in any codebase targeting Java 17+, directly replacing hand-written or Lombok-generated immutable
POJOs for that use case. Teams still pinned to Java 8–11 continue reaching for Lombok's `@Value` to get the
same effect, which is one of the more common reasons codebases on older LTS versions cite for wanting to
upgrade.
