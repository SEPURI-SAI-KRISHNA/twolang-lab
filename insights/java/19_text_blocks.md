## Interview angle

Not a trick question so much as a "have you touched Java in the last few years" check — text blocks are
Java 15+, and knowing the incidental-whitespace-stripping rule (rather than just "it's a multi-line string")
shows real hands-on use rather than a skim of the release notes.

## Industry practice

Text blocks rapidly became the default for embedded SQL, JSON, HTML, and any other multi-line template
string in Java codebases targeting 15+ — replacing the well-known eyesore of `"line one\n" + "line two\n" +
...` concatenation chains. The main adoption friction is purely version-based: codebases still on Java 8/11
LTS can't use them at all, which is itself a recurring argument for upgrading in teams that write a lot of
embedded query or template strings.
