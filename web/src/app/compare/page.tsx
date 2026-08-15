import Link from "next/link";
import type { Metadata } from "next";
import { getComparePairs, getTopic } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { CodeBlock } from "@/components/CodeBlock";
import { OutputBlocks } from "@/components/OutputBlock";
import type { Cell, Language, TopicRef } from "@/lib/types";

export const metadata: Metadata = {
  title: "Python ↔ Java, side by side",
  description:
    "Curated pairs where Python and Java solve the same underlying problem in genuinely comparable ways, shown with real executed code and real output from both.",
  alternates: { canonical: "/compare" },
};

function firstMarkdown(cells: Cell[]): string | null {
  const md = cells.find((c) => c.type === "markdown");
  if (!md || md.type !== "markdown") return null;
  // Drop the leading "# Title" line -- the title is already shown separately.
  return md.source.replace(/^#[^\n]*\n?/, "").trim();
}

function firstCodeWithOutput(cells: Cell[]): Extract<Cell, { type: "code" }> | null {
  for (const cell of cells) {
    if (cell.type === "code" && cell.outputs.length > 0) return cell;
  }
  return null;
}

function Side({ topicRef, language }: { topicRef: TopicRef; language: Language }) {
  const topic = getTopic(language, topicRef.slug);
  const intro = firstMarkdown(topic.cells);
  const code = firstCodeWithOutput(topic.cells);

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${
            language === "python"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300"
              : "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300"
          }`}
        >
          {language === "python" ? "Python" : "Java"}
        </span>
      </div>
      <h3 className="font-serif mb-2 text-[1.2rem] leading-snug font-semibold text-foreground">{topic.title}</h3>
      {intro && (
        <div className="mb-3 text-[15px] leading-[1.7] text-foreground/75 [&_p]:mb-3 [&_p:last-child]:mb-0">
          <Markdown>{intro.split("\n\n").slice(0, 1).join("\n\n")}</Markdown>
        </div>
      )}
      {code && (
        <div className="mb-3">
          <CodeBlock code={code.source} language={language} />
          <OutputBlocks outputs={code.outputs} />
        </div>
      )}
      <Link href={`/${language}/${topicRef.slug}`} className="text-[14px] font-medium text-accent hover:underline">
        Read the full topic →
      </Link>
    </div>
  );
}

export default function ComparePage() {
  const pairs = getComparePairs();

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
      <p className="mb-3 text-[13px] font-bold tracking-[0.15em] text-accent uppercase">Side by side</p>
      <h1 className="font-serif mb-4 text-[2.25rem] leading-[1.15] font-semibold tracking-tight text-foreground">
        Python ↔ Java
      </h1>
      <p className="mb-12 max-w-2xl text-[17px] leading-relaxed text-foreground/70">
        Curated pairs where the two languages solve the same underlying problem in genuinely comparable ways
        — not a forced mapping between unrelated features. More pairs get added as new topics land.
      </p>

      {pairs.length === 0 ? (
        <p className="text-foreground/60">No compare pairs yet.</p>
      ) : (
        <div className="space-y-14">
          {pairs.map((pair, i) => (
            <div key={i} className="border-t border-border pt-10 first:border-t-0 first:pt-0">
              <h2 className="font-serif mb-6 text-[1.35rem] font-semibold text-foreground">
                {pair.label ?? `${pair.a.title} vs ${pair.b.title}`}
              </h2>
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                <Side topicRef={pair.a} language={pair.a.language} />
                <div className="hidden w-px shrink-0 bg-border lg:block" />
                <Side topicRef={pair.b} language={pair.b.language} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
