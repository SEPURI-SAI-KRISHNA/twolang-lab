## Interview angle

Extremely common as a "what's wrong with this function?" question, and a genuinely good one — it cleanly
separates candidates who've actually been bitten by this in real code from those who've only read about
Python. The strong follow-up is "why does Python behave this way?" (defaults are evaluated once, at
`def`-time, and stored on the function object itself) — that "why" is what lets someone reason about
related surprises, like default arguments that call a function at def-time instead of per-call.

## Industry practice

Every mainstream Python linter flags this automatically (pylint's `dangerous-default-value`, ruff's `B006`),
so it rarely survives code review on a team with CI lint gates — but it's still one of the most common bugs
in scripts, notebooks, and legacy code without linting. It's consistently one of the first things a senior
engineer points out reviewing a junior contributor's first pull request, and the `None`-sentinel fix
(`def f(x=None): x = x or []`) is idiomatic enough that seeing the raw mutable-default version is itself a
weak signal about a codebase's review rigor.
