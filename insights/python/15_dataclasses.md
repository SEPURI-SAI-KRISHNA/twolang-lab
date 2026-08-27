## Interview angle

A good "how current is your Python" check, similar to Java records: candidates who know `field(default_factory=...)`
exists (and *why* — the mutable-default trap still applies to dataclass fields) show they've actually used
dataclasses in real code, not just read the one-line pitch. Asking "what does `frozen=True` cost you" is a
nice follow-up that tests whether they understand the mutability tradeoff, not just the syntax.

## Industry practice

Dataclasses are now the default choice for internal data-holding classes in modern Python codebases — DTOs,
config objects, structured return values — specifically to avoid hand-writing `__init__`/`__repr__`/`__eq__`
boilerplate and the bugs that come with keeping them in sync by hand. Teams that need genuine immutability or
validation reach for `pydantic` or `attrs` instead, but the base mental model (declared fields, generated
dunders) is the same one dataclasses established as standard.
