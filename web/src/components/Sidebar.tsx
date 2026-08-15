"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Manifest, Language, SearchEntry } from "@/lib/types";
import searchIndex from "@/data/search-index.json";
import { useProgress } from "@/lib/useProgress";

const TIER_COLORS: Record<string, string> = {
  T1: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  T2: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  T3: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300",
};

function TierBadge({ tier }: { tier: string }) {
  return (
    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold ${TIER_COLORS[tier] ?? ""}`}>
      {tier}
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-150 ${open ? "rotate-90" : ""}`}
    >
      <path d="M7 5l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sidebar({ manifest, onNavigate }: { manifest: Manifest; onNavigate?: () => void }) {
  const pathname = usePathname();
  const { isReviewed, toggle } = useProgress();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const activeLang = pathname?.split("/")[1] as Language | undefined;
  const activeSlug = pathname?.split("/")[2];

  const defaultOpenKey = useMemo(() => {
    if (!activeLang || !activeSlug) return null;
    for (const category of manifest[activeLang] ?? []) {
      if (category.items.some((it) => it.slug === activeSlug)) {
        return `${activeLang}-${category.letter}`;
      }
    }
    return null;
  }, [manifest, activeLang, activeSlug]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return (searchIndex as SearchEntry[]).filter(
      (e) => e.title.toLowerCase().includes(q) || e.text.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border p-5">
        <Link
          href="/"
          onClick={onNavigate}
          className="font-serif block text-[1.4rem] font-semibold tracking-tight text-foreground"
        >
          Mastery
        </Link>
        <p className="mt-0.5 text-[13px] text-muted">Python &amp; Java, in depth</p>
        <div className="relative mt-4">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full rounded-lg border border-border bg-surface py-2.5 pr-3 pl-8 text-[14.5px] text-foreground outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <nav className="mt-4 flex gap-4 text-[13.5px] font-medium">
          <Link href="/map" onClick={onNavigate} className="text-muted hover:text-accent">
            Concept map
          </Link>
          <Link href="/compare" onClick={onNavigate} className="text-muted hover:text-accent">
            Python ↔ Java
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {searchResults ? (
          <SearchResults results={searchResults} onNavigate={onNavigate} />
        ) : (
          (["python", "java"] as const).map((lang) => (
            <LanguageSection
              key={lang}
              lang={lang}
              categories={manifest[lang]}
              expanded={expanded}
              setExpanded={setExpanded}
              defaultOpenKey={defaultOpenKey}
              activeSlug={activeLang === lang ? activeSlug : undefined}
              isReviewed={isReviewed}
              toggle={toggle}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SearchResults({ results, onNavigate }: { results: SearchEntry[]; onNavigate?: () => void }) {
  if (results.length === 0) {
    return <p className="p-3 text-[14px] text-muted">No matches.</p>;
  }
  return (
    <ul className="space-y-1">
      {results.map((r) => (
        <li key={`${r.language}-${r.slug}`}>
          <Link
            href={`/${r.language}/${r.slug}`}
            onClick={onNavigate}
            className="flex items-start gap-2 rounded-lg px-3 py-2 hover:bg-surface"
          >
            <TierBadge tier={r.tier} />
            <span className="min-w-0">
              <span className="block truncate text-[14.5px] text-foreground">{r.title}</span>
              <span className="text-[12px] text-muted">
                {r.language} · {r.category}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LanguageSection({
  lang,
  categories,
  expanded,
  setExpanded,
  defaultOpenKey,
  activeSlug,
  isReviewed,
  toggle,
  onNavigate,
}: {
  lang: Language;
  categories: Manifest["python"];
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  defaultOpenKey: string | null;
  activeSlug?: string;
  isReviewed: (lang: string, slug: string) => boolean;
  toggle: (lang: string, slug: string) => void;
  onNavigate?: () => void;
}) {
  const done = categories.reduce((n, c) => n + c.items.filter((i) => i.status === "done").length, 0);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between px-2 py-1.5">
        <h2 className="text-[13px] font-bold tracking-widest text-muted uppercase">
          {lang === "python" ? "Python" : "Java"}
        </h2>
        <span className="text-[12px] font-medium text-muted">{done}</span>
      </div>
      {categories.map((category) => {
        const writtenItems = category.items.filter((i) => i.status === "done" && i.slug);
        if (writtenItems.length === 0) return null;
        const key = `${lang}-${category.letter}`;
        const isOpen = expanded[key] !== undefined ? expanded[key] : key === defaultOpenKey;
        return (
          <div key={key} className="mb-0.5">
            <button
              type="button"
              onClick={() => setExpanded((prev) => ({ ...prev, [key]: !isOpen }))}
              className="flex w-full items-center gap-1.5 rounded-lg px-2 py-2 text-left text-[14px] font-medium text-foreground/85 hover:bg-surface"
            >
              <Chevron open={isOpen} />
              <span className="min-w-0 flex-1 truncate">
                {category.letter}. {category.name}
              </span>
              <span className="shrink-0 text-[12px] text-muted">{writtenItems.length}</span>
            </button>
            {isOpen && (
              <ul className="mt-0.5 mb-2 ml-4 space-y-0.5 border-l-2 border-border pl-3">
                {writtenItems.map((item, idx) => {
                  const active = item.slug === activeSlug;
                  const reviewedFlag = isReviewed(lang, item.slug!);
                  return (
                    <li key={idx} className="group flex items-start gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggle(lang, item.slug!);
                        }}
                        title={reviewedFlag ? "Mark as not reviewed" : "Mark as reviewed"}
                        className={`mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          reviewedFlag
                            ? "border-accent bg-accent"
                            : "border-border bg-background group-hover:border-accent/60"
                        }`}
                      >
                        {reviewedFlag && (
                          <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5">
                            <path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <Link
                        href={`/${lang}/${item.slug}`}
                        onClick={onNavigate}
                        className={`flex min-w-0 flex-1 items-start gap-2 rounded-lg px-2 py-2 text-[14.5px] leading-snug ${
                          active
                            ? "bg-accent-soft font-semibold text-accent-hover"
                            : "text-foreground/85 hover:bg-surface"
                        }`}
                      >
                        <TierBadge tier={item.tier} />
                        <span className="min-w-0">{item.title ?? item.slug}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
