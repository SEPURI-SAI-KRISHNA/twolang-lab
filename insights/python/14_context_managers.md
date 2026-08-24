## Interview angle

"Write a context manager that times a block of code" is a common practical exercise — it's small enough to
finish in an interview, but touches `__enter__`/`__exit__`, exception propagation, and (for bonus points)
whether the candidate reaches for `@contextlib.contextmanager` instead of a full class when a generator would
do. Asking what `__exit__`'s return value means is a good follow-up most people get wrong on the first try.

## Industry practice

Context managers are the idiomatic way to guarantee cleanup in Python — file handles, database
connections/transactions, locks, and temporary state changes (`unittest.mock.patch`) are all built on this
protocol. Code review in any serious Python codebase treats manual `acquire()`/`release()` pairs without a
`try/finally` or a context manager as a real bug waiting to happen, since any exception between the two
leaks the resource.
