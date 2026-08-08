"use client";

import { useState } from "react";

export function RevealOutput({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <div className="animate-[fadeIn_0.15s_ease-out]">{children}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="mb-4 flex w-full items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-surface px-4 py-3.5 text-left text-[14.5px] font-medium text-foreground/70 transition-colors hover:border-accent/50 hover:text-foreground"
    >
      <span className="flex items-center gap-2">
        <span aria-hidden>🔮</span> What do you think this prints? Predict it, then reveal.
      </span>
      <span className="shrink-0 text-accent">Reveal →</span>
    </button>
  );
}
