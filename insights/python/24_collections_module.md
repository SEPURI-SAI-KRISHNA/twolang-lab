## Interview angle

A practical, low-drama fluency check: does the candidate reach for `collections.Counter`/`defaultdict` or
hand-roll the equivalent with a plain `dict` and manual `if key not in d` checks? It's not a hard question,
but hand-rolling stdlib-provided functionality is a mild but real signal about how much Python someone's
actually written versus translated from another language.

## Industry practice

`Counter` and `defaultdict` show up constantly in real data-processing and analytics code — frequency counts,
grouping, and histogram-building are extremely common tasks these two types were built for. `deque` is the
correct choice any time code needs a sliding window, a work queue, or repeated insertion/removal from both
ends — using a plain `list` for that pattern is a recurring, easy-to-miss performance bug, since the O(n) cost
of `list.insert(0, ...)` only becomes visible at scale, exactly as the benchmark here shows.
