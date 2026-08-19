## Interview angle

Commonly tested with a "predict this function call" question mixing positional args, unpacked iterables,
keyword args, and unpacked mappings — getting the precedence and collision rules right (and knowing exactly
which combination raises `TypeError`) shows real fluency, versus knowing `*args`/`**kwargs` only as
buzzwords to drop into a sentence.

## Industry practice

This is the mechanism that makes decorators, mixins, and wrapper/proxy functions possible in virtually every
non-trivial Python codebase — logging decorators, ORM method wrapping, web framework middleware all depend
on transparently forwarding arbitrary arguments. If you can't unpack and forward arguments correctly, you
can't write a general-purpose decorator, which makes this one of the highest-leverage topics for actually
reading library and framework source code instead of just using it.
