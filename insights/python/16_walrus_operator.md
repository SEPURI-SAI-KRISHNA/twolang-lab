## Interview angle

Less a trick question than a "read recent code" fluency check — candidates unfamiliar with `:=` sometimes
misread it as a typo for `=` or `==` the first time they see it. A good follow-up is the comprehension-scoping
question: does the walrus target leak out of a list comprehension? (Yes, deliberately — unlike the
comprehension's own loop variable.) That's a specific, testable detail that separates "seen it before" from
"understands it."

## Industry practice

The walrus shows up most often in exactly two idioms: `while (chunk := f.read(size)):`-style read loops, and
filtering a comprehension on a value you also want to keep, without computing it twice. Style guides are
mixed on encouraging it broadly — used well it removes real duplication, used poorly it makes a line harder
to read at a glance — so most teams' guidance is "fine for the read-loop and filter-and-keep idioms,
otherwise prefer a separate assignment."
