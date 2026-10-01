## Interview angle

"Why does a circular import sometimes work and sometimes throw an `AttributeError`/`ImportError`?" is a
strong question because the correct answer requires understanding `sys.modules` as a cache of
partially-built module objects, not just "circular imports are bad." Candidates who can explain *why* the
error message says "partially initialized" — rather than just knowing to avoid the pattern — show they've
actually read the import system, not just hit the error and restructured code until it went away.

## Industry practice

Circular imports are one of the most common structural bugs in growing Python codebases, and the standard
fixes are well-established: move the import inside the function that needs it (deferring it past module
load time), restructure to break the cycle, or extract the shared piece into a third module both sides
import from. `sys.modules` itself is also directly useful for debugging — checking whether a module was
already imported (and from where) is a real technique for tracking down "why is my monkey-patch not taking
effect" bugs, which usually come down to patching a different cached module instance than the one actually
in use.
