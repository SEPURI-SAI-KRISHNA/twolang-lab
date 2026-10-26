## Interview angle

A strong practical question: "chain two independent async calls and combine their results — what method do
you reach for?" (`thenCombine`), followed by "now make the second call depend on the first's result"
(`thenCompose`, not `thenApply`) — mixing these two up (using `thenApply` when the transform itself returns
a future) is one of the most common real mistakes, producing a `CompletableFuture<CompletableFuture<T>>`
that candidates often don't immediately recognize as wrong.

## Industry practice

`CompletableFuture` chains are the standard way to compose async operations in Java before or alongside
virtual threads — orchestrating calls to multiple downstream services, combining their results, and handling
failures without blocking threads unnecessarily. The sync-vs-async (`thenApply` vs `thenApplyAsync`) distinction
matters most when a callback does real work: forgetting the `Async` variant can accidentally run expensive
logic on a thread you didn't intend to occupy (sometimes the calling thread, sometimes whichever pool thread
happened to complete the previous stage).
