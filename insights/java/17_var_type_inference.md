## Interview angle

A quick "is this dynamic typing?" check separates candidates who understand `var` from those who've only
seen the keyword — the correct answer is a firm no: the type is resolved once, at compile time, from the
initializer, and is exactly as fixed as if it had been written explicitly. It's also a light API-design/style
question: good engineers can articulate *when* `var` helps readability versus when it hides useful type
information from the reader.

## Industry practice

Team style guides on `var` usage vary widely and are genuinely debated — Google's Java style guide encourages
it when the type is obvious from context (`var list = new ArrayList<String>()`), while discouraging it when
it would obscure the type (`var result = process(input)` tells the reader nothing). Most linters/IDE
inspections default to flagging `var` usages where the initializer's type isn't immediately clear from the
right-hand side, rather than banning or mandating it outright.
