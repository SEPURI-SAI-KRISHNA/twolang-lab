"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mastery.reviewed.v1";
const listeners = new Set<() => void>();

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function parseSet(raw: string): Set<string> {
  try {
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function key(lang: string, slug: string) {
  return `${lang}/${slug}`;
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reviewed = parseSet(raw);

  function isReviewed(lang: string, slug: string) {
    return reviewed.has(key(lang, slug));
  }

  function toggle(lang: string, slug: string) {
    const current = parseSet(getSnapshot());
    const k = key(lang, slug);
    if (current.has(k)) current.delete(k);
    else current.add(k);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current]));
    } catch {
      // ignore (private browsing / storage disabled)
    }
    notify();
  }

  return { reviewed, isReviewed, toggle };
}
