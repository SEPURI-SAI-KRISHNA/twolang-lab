## Interview angle

The "list of lambdas in a loop" bug is one of the most-asked Python gotcha questions, because it's subtle,
genuinely common, and has a clean, testable fix — which makes it a great springboard into a deeper
conversation about closures and variable scoping rather than a pure trivia check.

## Industry practice

This shows up realistically in GUI/event-handler registration code (binding callbacks inside a loop) and in
dynamically generated test cases — both real, documented bug classes with canonical Stack Overflow answers.
Modern linters catch it too: ruff's `B023` specifically flags "function defined in a loop uses a loop
variable," turning what used to be a purely experiential lesson into something CI can catch before review.
