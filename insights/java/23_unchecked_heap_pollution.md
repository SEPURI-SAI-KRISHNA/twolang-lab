## Interview angle

A genuinely advanced question: "why does the compiler only *warn* about this instead of erroring?" Getting a
candidate to explain that certain generic-safety violations aren't statically detectable — the compiler is
being honest about a real limitation of erasure, not being lazy — is a strong signal of deep generics
understanding, well beyond "generics give you type safety."

## Industry practice

`@SafeVarargs` exists specifically so library authors can suppress this warning where they've manually
verified safety, without silencing it project-wide. Raw types show up almost exclusively in legacy code
predating generics (pre-Java-5) or in reflection-heavy frameworks that genuinely can't know the type
parameter at compile time — new code using a raw type deliberately is rare and usually a code-review flag on
sight, since `unchecked`/`rawtypes` warnings are treated as "fix this" in most serious codebases' build
configuration.
