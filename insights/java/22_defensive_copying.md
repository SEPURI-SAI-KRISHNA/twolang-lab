## Interview angle

"Your class has a `getDates()` method returning a `List<Date>` — what's wrong with it?" is a great practical
question, since the bug (handing out a mutable reference to internal state) is realistic and common, and the
fix (return a copy, or an unmodifiable view) is cheap and always worth doing for anything crossing a class
boundary.

## Industry practice

Defensive copying is standard practice for any method returning internal mutable state from a class meant to
protect its invariants — constructors too, when accepting mutable objects as parameters (copy on the way in,
not just on the way out). It's one of the most common findings in security- and correctness-focused code
review for public APIs, since the bug it prevents is invisible until something far away in the codebase
mutates state it was never supposed to touch.
