## Interview angle

A strong "read this code and tell me what happens" question, because a correct answer requires actually
understanding dict internals rather than having memorized "don't mutate a dict while iterating it." Good
interviewers push further: does changing an *existing* key's value also raise? (No.) That's the detail that
separates "knows the rule" from "understands the mechanism."

## Industry practice

This is one of the most common real `RuntimeError`s in Python codebases that filter or clean up
collections — exactly why `list(d.items())` snapshotting, or rewriting the loop as a dict/list comprehension,
is the idiomatic fix and shows up constantly in code review suggestions. An experienced reviewer treats any
`for k in some_dict:` loop that also calls `.pop()`, `del`, or assigns a new key inside the loop body as an
automatic red flag worth a second look, even before running it.
