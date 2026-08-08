import type { Metadata } from "next";
import { getGraph } from "@/lib/content";
import type { Language, Tier } from "@/lib/types";

export const metadata: Metadata = {
  title: "Concept map",
  description:
    "How every topic connects — curated relationships between Python and Java concepts, plus which pairs are genuine cross-language equivalents.",
};

const TIER_FILL: Record<Tier, string> = { T1: "#059669", T2: "#d97706", T3: "#7c3aed" };

const NODE_R = 7;
const COL_X: Record<Language, number> = { python: 300, java: 900 };
const ROW_H = 108;
const NODE_GAP = 150;
const TOP = 110;

interface Pos {
  id: string;
  x: number;
  y: number;
  title: string;
  tier: Tier;
  language: Language;
  slug: string;
}

interface CategoryLabelPos {
  x: number;
  y: number;
  text: string;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export default function MapPage() {
  const graph = getGraph();

  function categoriesFor(lang: Language) {
    const seen = new Map<string, { letter: string; name: string }>();
    for (const n of graph.nodes.filter((n) => n.language === lang)) {
      if (!seen.has(n.categoryLetter)) seen.set(n.categoryLetter, { letter: n.categoryLetter, name: n.category });
    }
    return [...seen.values()];
  }

  const positions: Pos[] = [];
  const categoryLabels: CategoryLabelPos[] = [];

  function layoutLang(lang: Language) {
    let y = TOP;
    for (const cat of categoriesFor(lang)) {
      const nodes = graph.nodes.filter((n) => n.language === lang && n.categoryLetter === cat.letter);
      categoryLabels.push({ x: COL_X[lang], y: y - 34, text: `${cat.letter}. ${cat.name}` });
      const totalWidth = (nodes.length - 1) * NODE_GAP;
      const startX = COL_X[lang] - totalWidth / 2;
      nodes.forEach((n, i) => {
        positions.push({
          id: n.id,
          x: startX + i * NODE_GAP,
          y,
          title: n.title,
          tier: n.tier,
          language: n.language,
          slug: n.slug,
        });
      });
      y += ROW_H;
    }
    return y;
  }

  const yAfterPython = layoutLang("python");
  const yAfterJava = layoutLang("java");
  const height = Math.max(yAfterPython, yAfterJava) + 30;
  const posById = new Map(positions.map((p) => [p.id, p]));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
      <p className="mb-3 text-[13px] font-bold tracking-[0.15em] text-accent uppercase">Concept map</p>
      <h1 className="font-serif mb-4 text-[2.25rem] leading-[1.15] font-semibold tracking-tight text-foreground">
        How these ideas connect
      </h1>
      <p className="mb-8 max-w-2xl text-[17px] leading-relaxed text-foreground/70">
        Curated relationships between topics — solid lines connect ideas within a language that build on each
        other, dashed teal lines cross to the genuinely equivalent concept in the other language. Hover a dot
        for its title, click to open the topic.
      </p>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface p-4 sm:p-6">
        <svg viewBox={`0 0 1200 ${height}`} className="h-auto w-full min-w-[900px]">
          <text x={COL_X.python} y={40} textAnchor="middle" fontSize="24" fontWeight="600" className="fill-foreground">
            Python
          </text>
          <text x={COL_X.java} y={40} textAnchor="middle" fontSize="24" fontWeight="600" className="fill-foreground">
            Java
          </text>

          {categoryLabels.map((c, i) => (
            <text key={i} x={c.x} y={c.y} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-muted uppercase">
              {c.text}
            </text>
          ))}

          {graph.edges.map((e, i) => {
            const a = posById.get(e.a);
            const b = posById.get(e.b);
            if (!a || !b) return null;
            const isCompare = e.kind === "compare";
            const midX = (a.x + b.x) / 2;
            return (
              <path
                key={i}
                d={`M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`}
                style={{ stroke: isCompare ? "var(--accent)" : "var(--border)" }}
                strokeWidth={isCompare ? 2 : 1.5}
                strokeDasharray={isCompare ? "5 4" : undefined}
                fill="none"
                opacity={isCompare ? 0.9 : 0.8}
              />
            );
          })}

          {positions.map((p) => (
            <a key={p.id} href={`/${p.language}/${p.slug}`}>
              <title>{p.title}</title>
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill={TIER_FILL[p.tier]}
                style={{ stroke: "var(--background)" }}
                strokeWidth={2}
              />
              <text x={p.x} y={p.y + 22} textAnchor="middle" fontSize="11" className="fill-foreground">
                {truncate(p.title, 20)}
              </text>
            </a>
          ))}
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: TIER_FILL.T1 }} /> T1 topic
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: TIER_FILL.T2 }} /> T2 topic
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: TIER_FILL.T3 }} /> T3 topic
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-5 bg-border" /> builds on
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-accent" /> Python ↔ Java equivalent
        </span>
      </div>
    </div>
  );
}
