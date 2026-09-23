## Interview angle

A good "have you actually debugged production Python" question: ask what `__cause__` and `__context__` are
for, and why a traceback sometimes says "During handling of the above exception, another exception occurred."
Candidates who've never noticed that message have likely never read a real chained traceback carefully — this
is a low-stakes way to gauge debugging experience.

## Industry practice

`raise ... from e` is the idiomatic way to wrap a low-level exception (a driver error, a parsing failure) in
a higher-level, more meaningful one for callers, without losing the original root cause for whoever reads the
logs. `raise ... from None` shows up in library code specifically to hide an implementation-detail exception
that would only confuse the caller — a deliberate API design choice, not a bug, though it should be used
sparingly since it does throw away real debugging information.
