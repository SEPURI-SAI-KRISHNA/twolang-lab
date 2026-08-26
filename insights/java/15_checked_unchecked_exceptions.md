## Interview angle

A good debate question as much as a knowledge check: "should this new exception be checked or unchecked?"
Strong candidates can articulate the actual tradeoff (checked exceptions force callers to consciously handle
a failure mode, but at the cost of API rigidity and the well-known temptation to catch-and-swallow just to
satisfy the compiler) rather than reciting the syntax rule alone.

## Industry practice

Checked exceptions are genuinely controversial in the Java community — much of the modern standard library
and popular frameworks (Spring's `DataAccessException` hierarchy, for instance) deliberately favor unchecked
exceptions, partly because checked exceptions compose badly with lambdas and streams (a lambda that calls a
checked-exception-throwing method won't even compile without a wrapper). New library APIs in actively
maintained codebases skew unchecked by default today, reserving checked exceptions for cases where forcing
the caller to handle a specific, recoverable failure is genuinely the right API design.
