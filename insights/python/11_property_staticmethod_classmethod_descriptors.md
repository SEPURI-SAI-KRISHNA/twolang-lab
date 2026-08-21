## Interview angle

A strong senior-level question is "implement your own version of `@property` using `__get__`/`__set__`" —
it's a clean way to check whether a candidate understands Python's attribute-lookup machinery, or has only
ever used `property` as a black box. The classmethod-as-alternative-constructor pattern (`cls(...)` inside a
`@classmethod`) is also a great "do you write inheritance-safe code" check: a hardcoded class name instead of
`cls` silently breaks for subclasses.

## Industry practice

Alternative constructors via `@classmethod` are everywhere in real APIs — `dict.fromkeys`, `datetime.fromisoformat`,
and most ORMs' `Model.from_json(...)`-style factories all use this pattern specifically so subclasses inherit
working constructors for free. Hand-written descriptors are rare in application code but foundational to
libraries like Django (model fields), SQLAlchemy (columns), and `attrs`/`pydantic` — understanding the
protocol is what lets you actually read how those libraries work instead of treating them as magic.
