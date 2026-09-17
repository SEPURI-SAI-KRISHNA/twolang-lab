## Interview angle

A genuinely great filter question: "is `counter += 1` thread-safe in Python, since there's a GIL?" Weak
candidates say yes ("only one thread runs at a time"). Strong candidates say no, and can explain *why* in
terms of bytecode — the GIL guarantees one instruction runs at a time, not one *statement*, and `+=` is
several instructions. The best candidates also know that demonstrating the resulting bug reliably is itself
nondeterministic, which is a mark of real production experience, not textbook knowledge.

## Industry practice

This exact confusion — "the GIL means my Python code doesn't need locks" — is a real, recurring source of
subtle production bugs in codebases that use threads for shared mutable state. The standard fix isn't
avoiding threads; it's using `threading.Lock`, `queue.Queue`, or `Atomic`-style patterns for anything beyond
single, indivisible operations. It's also the direct motivation for why so much concurrent Python code
prefers message-passing (queues) over shared mutable counters/state in the first place — sidestepping the
question of atomicity entirely rather than reasoning about it case by case.
