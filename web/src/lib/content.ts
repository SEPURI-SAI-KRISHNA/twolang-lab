import fs from "node:fs";
import path from "node:path";
import manifestJson from "@/data/manifest.json";
import graphJson from "@/data/graph.json";
import comparePairsJson from "@/data/compare-pairs.json";
import type { Manifest, Topic, Language, Graph, ComparePair } from "./types";

const manifest = manifestJson as Manifest;
const graph = graphJson as Graph;
const comparePairs = comparePairsJson as ComparePair[];
const DATA_DIR = path.join(process.cwd(), "src", "data");

export function getGraph(): Graph {
  return graph;
}

export function getComparePairs(): ComparePair[] {
  return comparePairs;
}

export function getManifest(): Manifest {
  return manifest;
}

export function getAllTopicParams(): { lang: Language; slug: string }[] {
  const params: { lang: Language; slug: string }[] = [];
  for (const lang of ["python", "java"] as const) {
    for (const category of manifest[lang]) {
      for (const item of category.items) {
        if (item.status === "done" && item.slug) {
          params.push({ lang, slug: item.slug });
        }
      }
    }
  }
  return params;
}

export function getTopic(lang: Language, slug: string): Topic {
  const file = path.join(DATA_DIR, "topics", lang, `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")) as Topic;
}

export function getTotals() {
  let done = 0;
  let total = 0;
  for (const lang of ["python", "java"] as const) {
    for (const category of manifest[lang]) {
      for (const item of category.items) {
        total++;
        if (item.status === "done") done++;
      }
    }
  }
  return { done, total };
}

export function getItemMeta(lang: Language, slug: string) {
  for (const category of manifest[lang]) {
    for (const item of category.items) {
      if (item.slug === slug) {
        return { tier: item.tier, categoryName: category.name, categoryLetter: category.letter };
      }
    }
  }
  return null;
}

export function findAdjacent(lang: Language, slug: string) {
  const flat: { lang: Language; slug: string; title: string; categoryName: string }[] = [];
  for (const l of ["python", "java"] as const) {
    for (const category of manifest[l]) {
      for (const item of category.items) {
        if (item.status === "done" && item.slug) {
          flat.push({ lang: l, slug: item.slug, title: item.title ?? item.slug, categoryName: category.name });
        }
      }
    }
  }
  const idx = flat.findIndex((f) => f.lang === lang && f.slug === slug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
