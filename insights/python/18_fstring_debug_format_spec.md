## Interview angle

A minor but telling fluency signal — candidates who reach for `f"{x=}"` instead of `print("x:", x)` or
manually typing `print(f"x: {x}")` are usually keeping up with newer Python idioms generally, which is a
cheap, low-stakes way to get a read on how current someone's day-to-day Python is.

## Industry practice

`f"{x=}"` is now the default idiom for throwaway debug prints in interactive development and notebooks
specifically because it's faster to type and impossible to get out of sync with the variable name (unlike a
manually-written `f"x: {x}"`, which silently goes stale if you rename `x` and forget the label). It's
considered fine for scratch/debug code but is typically stripped or replaced with proper `logging` calls
before code ships, since debug prints in general aren't meant to survive code review.
