"use client";

import { useState } from "react";
import type { Manifest } from "@/lib/types";
import { Sidebar } from "./Sidebar";

export function AppShell({ manifest, children }: { manifest: Manifest; children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <span className="font-serif text-lg font-semibold tracking-tight text-foreground">Mastery</span>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-foreground/85"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </header>

      <aside
        className={`w-full shrink-0 border-border lg:block lg:w-72 lg:border-r xl:w-80 ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <Sidebar manifest={manifest} onNavigate={() => setMobileOpen(false)} />
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
