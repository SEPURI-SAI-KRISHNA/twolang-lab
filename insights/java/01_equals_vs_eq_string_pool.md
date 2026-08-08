## Interview angle

One of the single most common Java interview questions, precisely because it's easy to get *partially*
right — most candidates know "use `.equals()`, not `==`" without understanding the mechanism, which is
exactly what a good follow-up like "what about `new String(\"x\")`?" is designed to expose. A strong answer
explains the constant pool, not just the rule.

## Industry practice

Static analysis flags this by default in essentially every serious Java codebase's CI (SpotBugs'
`ES_COMPARING_STRINGS_WITH_EQ`, and equivalent built-in IDE inspections in IntelliJ and Eclipse). Any team
without that lint gate has almost certainly shipped this bug at least once — it's rare enough to catch in
manual review because it often *works* in casual testing (small literal strings get pooled) and only breaks
on strings built at runtime.
