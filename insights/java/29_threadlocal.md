## Interview angle

"You're using `ThreadLocal` in a thread pool — what's the risk?" is a strong practical question, since the
correct answer (state leaking across unrelated tasks reusing the same pooled thread, unless explicitly
cleared) requires understanding both `ThreadLocal` and how thread pools actually reuse threads — a
combination that trips up even experienced developers the first time they hit it.

## Industry practice

This is a real, documented production bug class — most famously associated with web frameworks that use
`ThreadLocal` for request-scoped context (like the current user or transaction) on top of a thread pool.
Forgetting to clear it at the end of a request can leak one user's context into the next request handled by
the same pooled thread — a genuine security-relevant bug, not just a memory leak, which is why frameworks
that rely on `ThreadLocal` are careful to clear it in a `finally` block around every request.
