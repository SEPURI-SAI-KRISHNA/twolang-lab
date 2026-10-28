## Interview angle

`send`/`throw`/`close` are rarely tested directly, but `yield from` shows up whenever a candidate is asked
to compose generators — "flatten these nested generators without a manual loop" is a natural exercise where
`yield from` is the clean answer, and knowing it also forwards `send`/`throw` and captures the sub-generator's
return value shows real depth beyond "it's like a nested for-loop."

## Industry practice

`yield from` is the standard tool for generator composition and delegation — breaking a large generator into
smaller, reusable pieces without manually re-yielding each value. The full `send`/`throw` two-way protocol
is genuinely rare in typical application code; it's foundational to how `asyncio` coroutines worked before
`async`/`await` became the syntax, so understanding it helps when reading older async code or asyncio
internals, even though almost nobody writes raw `send`/`throw` generators directly anymore.
