# Mastery Index — Python & Java

Every topic here becomes one notebook cell (or small cluster of cells) with real, executed code and real captured output — not descriptions of what "would" happen. Each item is tagged with a tier:

- **T1** — high-leverage: shows up in idiomatic/LLM-written code and in real GitHub codebases; not knowing it causes actual bugs or confusion reading code.
- **T2** — solid intermediate depth: less common in everyday code, but exactly the kind of thing that separates "knows the syntax" from "knows the language."
- **T3** — internals / rare: CPython or JVM implementation detail, edge-case semantics, or something you'll use maybe once a year but that explains *why* something in T1/T2 behaves the way it does.

Checkboxes track progress. Notebooks live in `python/NN_topic.ipynb` and `java/NN_topic.ipynb`, numbered to match this index. We build in batches of ~8-10, ranked T1 → T2 → T3 within each category, and I'll check in with you after each batch.

Status key: `[ ]` not started · `[~]` in progress · `[x]` done (notebook exists with real output)

---

## PYTHON

### A. Object model, identity & memory
- [x] T1 `is` vs `==`, small-int cache (-5..256), string interning rules and when they silently stop applying → `python/01_identity_smallint_string_interning.ipynb`
- [x] T1 mutable default argument gotcha (`def f(x=[])`) and why it happens (defaults bound once at def-time) → `python/02_mutable_default_argument.ipynb`
- [x] T1 shallow vs deep copy (`copy.copy` / `copy.deepcopy`), `__copy__`/`__deepcopy__` → `python/03_shallow_vs_deep_copy.ipynb`
- [ ] T2 `__slots__`: memory savings, what you lose (no `__dict__`, no multiple inheritance of slotted classes without care)
- [ ] T2 reference counting + generational cyclic GC (`gc` module, generations, thresholds)
- [ ] T2 weak references (`weakref`) and why caches/observers use them
- [ ] T3 `sys.getsizeof` and real object overhead (header bytes, why an empty list isn't 0 bytes)
- [ ] T3 `id()` reuse after garbage collection — the classic "why do two different objects have the same id" trap

### B. Iteration & generators
- [x] T1 dict/set size cannot change during iteration → `RuntimeError` (version tag mechanism), but *values* can change → `python/04_dict_set_mutation_during_iteration.ipynb`
- [x] T1 iterator protocol (`__iter__`/`__next__`) vs iterable, and why `for` calls `iter()` once → `python/05_iterator_protocol.ipynb`
- [x] T1 generators: `yield`, laziness, one-shot exhaustion, generator expressions vs list comps (memory) → `python/06_generators_basics.ipynb`
- [ ] T2 `yield from`, delegation, and generator `send()` / `throw()` / `close()`
- [ ] T2 `itertools` deep-dive: `islice`, `tee`, `groupby` (needs sorted input!), `chain`, `accumulate`, `pairwise`
- [ ] T2 PEP 479: `StopIteration` raised inside a generator becomes `RuntimeError`, not silent stop
- [ ] T3 async generators / `__aiter__`/`__anext__` vs regular generators

### C. Functions & closures
- [x] T1 late-binding closures — the classic loop-variable-capture bug in list-of-lambdas → `python/07_late_binding_closures.ipynb`
- [x] T1 positional-only (`/`) and keyword-only (`*`) parameters (PEP 570) → `python/08_positional_keyword_only_params.ipynb`
- [x] T1 `*args`/`**kwargs` unpacking edge cases, argument-order rules → `python/09_args_kwargs_unpacking.ipynb`
- [x] T1 `functools.wraps`, decorators that lose metadata without it, decorators-with-arguments (double nesting) → `python/10_functools_wraps_decorators.ipynb`
- [ ] T2 `functools.lru_cache`/`cache`, `singledispatch`, `partial`, `reduce`
- [ ] T2 `nonlocal` vs `global`, function objects carrying their own `__dict__`/attributes
- [ ] T3 decorator stacking order vs application order (bottom-up apply, top-down execute)

### D. Classes & OOP internals
- [x] T1 `@property`, `@staticmethod`, `@classmethod` — and the descriptor protocol underneath all three → `python/11_property_staticmethod_classmethod_descriptors.ipynb`
- [x] T1 `__eq__`/`__hash__` contract — why overriding one without the other breaks sets/dicts → `python/12_eq_hash_contract.ipynb`
- [ ] T1 `__repr__` vs `__str__`, and why every class should define `__repr__`
- [ ] T1 context managers: `__enter__`/`__exit__`, `contextlib.contextmanager`, `ExitStack`
- [ ] T1 dataclasses: `field(default_factory=...)`, `__post_init__`, `frozen=True`, generated `__eq__`/`__order__`
- [ ] T2 MRO / C3 linearization, cooperative `super()` in multiple inheritance (diamond problem)
- [ ] T2 `__getattr__` vs `__getattribute__` vs `__setattr__`, attribute lookup order
- [ ] T2 abstract base classes (`abc.ABC`, `@abstractmethod`), `__subclasshook__` / virtual subclassing
- [ ] T3 metaclasses: `type()` as a class factory, custom `__new__` on a metaclass, `__init_subclass__` as the lightweight alternative
- [ ] T3 `__class_getitem__` (what makes `list[int]` work at runtime)

### E. Typing & modern syntax
- [ ] T1 walrus operator `:=` and where it actually improves code
- [ ] T1 `match`/`case` structural pattern matching (PEP 634), including guard clauses and class patterns
- [ ] T1 f-string `=` debug specifier and the format-spec mini-language
- [ ] T2 `Protocol` (structural typing, PEP 544) vs ABC (nominal typing)
- [ ] T2 `TypedDict`, `Literal`, `overload`, `NewType`
- [ ] T2 generics: legacy `TypeVar`/`Generic` vs PEP 695 syntax (`class Foo[T]:`, Python 3.12+)
- [ ] T3 float precision (`0.1 + 0.2 != 0.3`) and when to reach for `Decimal`/`Fraction`
- [ ] T3 dict insertion-order guarantee (language spec since 3.7, not an implementation accident)

### F. Concurrency & parallelism
- [ ] T1 what the GIL actually protects (bytecode-level atomicity) and what it doesn't (compound operations like `x += 1`)
- [ ] T1 threading vs multiprocessing vs asyncio — when each one actually helps given the GIL
- [ ] T2 asyncio: event loop, `Task` vs coroutine object, `gather` vs `wait`, cancellation
- [ ] T2 `concurrent.futures` (ThreadPoolExecutor/ProcessPoolExecutor)
- [ ] T3 PEP 703 free-threaded CPython (3.13+, GIL-optional build) — what changes

### G. Error handling
- [ ] T1 exception chaining: `raise X from Y`, `__cause__` vs implicit `__context__`
- [ ] T1 `try`/`except`/`else`/`finally` — what `else` is actually for, `finally` overriding a `return`
- [ ] T2 exception groups & `except*` (PEP 654, Python 3.11)
- [ ] T2 custom exception hierarchies, catching by base class deliberately

### H. Imports & packaging
- [ ] T1 `sys.modules` as the import cache, why circular imports fail the way they do
- [ ] T2 `__all__`, namespace packages, relative vs absolute imports
- [ ] T3 `importlib` machinery — finders, loaders, and what `import` desugars to

### I. CPython internals
- [ ] T2 `dis` module — reading bytecode for a function, why some "equivalent" code is faster
- [ ] T3 frame objects, `sys._getframe`, how tracebacks are actually built
- [ ] T3 peephole/constant-folding optimizations, why `is` "works" on small literals but you shouldn't rely on it

### J. Stdlib gems
- [ ] T1 `collections`: `Counter`, `defaultdict`, `deque` (O(1) both ends vs list's O(n) `insert(0,...)`), `ChainMap`
- [ ] T1 `enum`: `auto()`, `Flag` (bitwise combos), `StrEnum`/`IntEnum`
- [ ] T2 `functools.cached_property` vs `property` vs plain attribute
- [ ] T2 `bisect` and `heapq` for the algorithms people hand-roll unnecessarily
- [ ] T2 `pathlib` vs `os.path`
- [ ] T3 `contextvars` (what actually backs async-safe "thread-local"-like state)
- [ ] T3 `array` module vs `list` (packed C types, memory)

---

## JAVA

### A. Object model, identity & memory
- [x] T1 `==` vs `.equals()`, the `String` pool and `.intern()` → `java/01_equals_vs_eq_string_pool.ipynb`
- [x] T1 `Integer` autoboxing cache (-128..127) — the `==` gotcha with boxed types → `java/02_integer_autobox_cache.ipynb`
- [x] T1 `hashCode`/`equals` contract, `Objects.hash`/`Objects.equals`, what breaks in a `HashMap` if you violate it → `java/03_hashcode_equals_contract.ipynb`
- [x] T1 records (Java 16+): compact constructors, auto-generated `equals`/`hashCode`/`toString`, canonical constructor validation → `java/04_records_basics.ipynb`
- [ ] T2 `final` vs true immutability, "effectively final" for lambda capture
- [ ] T2 defensive copying, why `clone()` is mostly a mistake, copy constructors as the idiom
- [ ] T3 object header overhead (JOL-style), why a `Boolean` isn't 1 bit

### B. Generics
- [x] T1 type erasure — why you can't do `new T[]` or `instanceof List<String>` → `java/05_type_erasure.ipynb`
- [x] T1 bounded wildcards, PECS ("producer extends, consumer super") → `java/06_bounded_wildcards_pecs.ipynb`
- [ ] T2 unchecked warnings, heap pollution with varargs + generics
- [ ] T3 generic method type inference edge cases (target typing)

### C. Collections framework
- [x] T1 `List.of()`/`Map.of()` immutability → `UnsupportedOperationException` on mutation attempts → `java/07_immutable_collections.ipynb`
- [x] T1 fail-fast iterators → `ConcurrentModificationException` vs fail-safe (`CopyOnWriteArrayList`) → `java/08_fail_fast_iterators_cme.ipynb`
- [x] T1 `Comparable` vs `Comparator`, `Comparator.comparing(...).thenComparing(...)` chains → `java/09_comparable_vs_comparator.ipynb`
- [ ] T2 `HashMap` vs `LinkedHashMap` (access-order mode!) vs `TreeMap` ordering guarantees
- [ ] T2 `Collectors`: `groupingBy`, `partitioningBy`, `teeing`, `toUnmodifiableList`
- [ ] T3 `EnumMap`/`EnumSet` — why they're meaningfully faster than generic collections for enum keys

### D. Streams & functional interfaces
- [x] T1 stream laziness — nothing runs until a terminal operation, short-circuiting with `findFirst`/`anyMatch` → `java/10_stream_laziness.ipynb`
- [x] T1 `Optional` — `orElse` (always evaluated) vs `orElseGet` (lazy), and why `Optional` fields are an anti-pattern → `java/11_optional_orelse_vs_orelseget.ipynb`
- [ ] T1 method references, all four kinds (static, bound instance, unbound instance, constructor)
- [ ] T2 functional interface composition: `Function.andThen`/`compose`, `Predicate.and`/`or`/`negate`
- [ ] T2 parallel streams: common `ForkJoinPool`, when it helps vs silently hurts, ordering pitfalls
- [ ] T3 stateful lambdas in streams (mutating external state) and why it silently breaks under parallel

### E. Concurrency
- [ ] T1 `synchronized` (intrinsic locks), `volatile` — visibility vs atomicity (why `volatile int` doesn't fix `count++`)
- [ ] T1 virtual threads (Project Loom, Java 21) vs platform threads — what actually changes
- [ ] T2 `CompletableFuture` chaining (`thenApply`/`thenCompose`/`thenCombine`), sync vs async variants
- [ ] T2 `ThreadLocal` and the classic thread-pool memory leak
- [ ] T2 atomic classes (`AtomicInteger`, CAS) vs synchronized for simple counters
- [ ] T3 Java Memory Model happens-before relationships (what actually guarantees visibility across threads)

### F. Exceptions
- [ ] T1 checked vs unchecked exceptions — the actual compiler-enforced difference
- [ ] T1 try-with-resources, `AutoCloseable`, suppressed exceptions
- [ ] T2 `finally` silently swallowing a `return`/exception from `try` (the gotcha, deliberately shown)
- [ ] T3 exception chaining via `initCause`/constructor, preserving root cause across layers

### G. Modern language features (8 → 21)
- [ ] T1 `var` local type inference — where it helps vs hurts readability
- [ ] T1 switch expressions + pattern matching for switch, `sealed` classes/interfaces (Java 17/21) working together
- [ ] T1 text blocks (`"""`), record patterns / deconstruction (Java 21)
- [ ] T2 `instanceof` pattern matching (no more manual cast)
- [ ] T2 helpful NullPointerException messages (Java 14+) — reading them to pinpoint the null in a chain

### H. JVM internals
- [ ] T2 bytecode basics via `javap -c` — seeing what a for-loop / autobox / lambda actually compiles to
- [ ] T2 class loading & classloader hierarchy (bootstrap/platform/app)
- [ ] T3 JIT tiers, escape analysis / scalar replacement (stack-allocating objects that don't escape)
- [ ] T3 lambda desugaring via `invokedynamic` (why lambdas aren't just anonymous classes under the hood)
- [ ] T3 GC generational hypothesis, young/old gen, brief G1 vs ZGC contrast

### I. Modules & misc stdlib
- [ ] T2 JPMS basics (`module-info.java`, classpath vs modulepath) — enough to read a modular project
- [ ] T1 `java.time` (`Instant`, `LocalDate`, `Duration`, `Period`) vs legacy `Date`/`Calendar`
- [ ] T2 static/instance initializer blocks — actual execution order with inheritance
- [ ] T2 nested vs inner vs local vs anonymous classes — which ones capture an enclosing instance
- [ ] T3 `String` concatenation compiler rewriting (`StringBuilder` insertion, `invokedynamic` on newer javac)

---

## Progress log

_This is a snapshot of an actively-growing index. 23 of the full set of topics are released so far; more land incrementally. Full batch-by-batch history isn't published yet to avoid spoiling what's coming._