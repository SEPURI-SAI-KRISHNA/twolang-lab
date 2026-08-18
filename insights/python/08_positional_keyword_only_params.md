## Interview angle

Less a "gotcha" and more a "how current is your Python" signal — a candidate who knows `/` and `*` syntax
and can explain *why* an API designer would reach for them (freedom to rename parameters internally without
breaking callers who pass positionally) shows they think about API design deliberately, not just consume
APIs other people designed.

## Industry practice

The standard library itself uses positional-only parameters post-3.8 specifically to keep implementation
details out of the public contract (`dict.get`'s signature is a common example). API-design-conscious teams
adopt the same convention for their own public functions for the same reason: parameter *names* become a
free-to-change internal detail instead of an accidental part of the API surface that breaking-change
policies have to account for.
