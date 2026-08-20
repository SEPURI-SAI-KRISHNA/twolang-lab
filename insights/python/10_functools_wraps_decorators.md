## Interview angle

A frequent follow-up once a candidate demonstrates they can write a decorator: "what's missing?" It's a
great filter because it separates people who can write *a* decorator from people who write *correct*,
debuggable ones — and it opens naturally into a discussion of introspection (`__name__`, `__doc__`) and why
tooling depends on it.

## Industry practice

Forgetting `functools.wraps` is a genuinely-shipped bug class: it silently breaks `help()`, documentation
generators (Sphinx), debuggers, and anything that introspects `__name__` — including some test frameworks
and caching layers keyed by function identity. It's the kind of bug that doesn't fail loudly; it just quietly
degrades tooling until someone spends an hour confused about why a stack trace or a docs page shows the
wrong function name.
