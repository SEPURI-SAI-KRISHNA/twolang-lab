## Interview angle

A staple "what will this print, and in what order?" question, because generator laziness is one of the
cleanest ways to test whether someone actually traces execution rather than pattern-matching on syntax.
Generator-writing exercises (e.g. "write a generator for the Fibonacci sequence") are popular precisely
because they test syntax knowledge and an understanding of the memory/laziness tradeoff at the same time.

## Industry practice

Generators are everywhere in production Python: streaming large files or paginated API responses line by
line, ETL pipelines, and ORM query iteration (Django, SQLAlchemy) all lean on them specifically to avoid
materializing an entire dataset in memory at once. In code review, an eager `list(...)` wrapped around what
could be a generator expression is a common efficiency comment, especially in code that processes large or
unbounded input.
