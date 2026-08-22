## Interview angle

A pointed follow-up to "how do you make a class usable as a dict key or set member?" — most candidates know
to override `__eq__`, far fewer know Python then silently sets `__hash__` to `None` unless you also define
it. That's a great signal question because the failure mode is a hard `TypeError`, not a subtle bug, so a
candidate who's actually hit it remembers it vividly.

## Industry practice

This is Python's language design actively preventing the equivalent Java bug (topic-linked: Java's
`hashCode`/`equals` contract can be silently violated) — by refusing to let an eq-only class be hashed at
all, rather than letting it corrupt a `set`/`dict` at runtime. In practice this surfaces immediately (and
loudly) the first time someone tries to put such an object in a set, which is exactly why this class of bug
is rarer in Python codebases than in Java ones with hand-written `equals`.
