## Interview angle

A quick, high-signal question: "why does every class you write need `__repr__`?" A candidate who says
"for debugging" is half right; the fuller answer is that `__repr__` is the fallback for `__str__`, the
representation used inside containers, and what shows up in a debugger/REPL/traceback by default — so
skipping it means every one of those contexts prints an unhelpful `<__main__.Foo object at 0x...>`.

## Industry practice

Style guides (Google's Python style guide among them) explicitly require `__repr__` on any class intended
for reuse, precisely because debugging a collection of objects with no `__repr__` means staring at memory
addresses. It's one of the cheapest, highest-value additions to any class, and its absence is a near-universal
first comment on a new class in code review at teams that care about debuggability.
