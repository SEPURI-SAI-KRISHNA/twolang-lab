## Interview angle

Interviewers use `itertools` familiarity as a quick "how much Python have you actually written" signal —
candidates who hand-roll a manual running-total loop instead of reaching for `accumulate`, or who don't know
`groupby` needs sorted input, are showing a gap that's easy to spot and easy to teach. The `groupby` sorting
trap specifically makes a great live-coding gotcha question since the bug is silent, not a crash.

## Industry practice

`itertools` functions are preferred over hand-rolled loops specifically because they're lazy (memory-
efficient on large data) and because reviewers immediately recognize the intent (`pairwise`, `accumulate`)
versus having to read a custom loop to figure out what it's doing. The `groupby`-without-sorting bug is
common enough in real code that "did you sort first?" is a standard code-review question the moment `groupby`
appears in a diff.
