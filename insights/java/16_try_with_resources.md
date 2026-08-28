## Interview angle

"What happens if both the try block AND `close()` throw?" is a great follow-up once a candidate demonstrates
they know try-with-resources exists — the correct answer (the body's exception propagates as primary, the
close-time one is attached via `getSuppressed()`, neither is silently lost) shows they understand the
mechanism, not just the syntax sugar.

## Industry practice

Try-with-resources is the default, expected idiom for anything implementing `AutoCloseable` in modern Java —
manual `finally { resource.close(); }` blocks are a routine code-review comment asking "why not
try-with-resources?" unless there's a specific reason (e.g. needing the resource to outlive the block). The
suppressed-exception mechanism specifically exists because early Java's manual cleanup code had a well-known
failure mode: a `close()` exception in a `finally` block would silently *replace* the original exception,
destroying the actual root cause.
