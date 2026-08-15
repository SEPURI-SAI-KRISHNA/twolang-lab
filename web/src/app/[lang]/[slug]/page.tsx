import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTopicParams, getTopic, findAdjacent, getItemMeta } from "@/lib/content";
import { CellView } from "@/components/CellView";
import { Markdown } from "@/components/Markdown";
import type { Cell, Language } from "@/lib/types";

export function generateStaticParams() {
  return getAllTopicParams();
}

export const dynamicParams = false;

function firstMarkdownExcerpt(cells: Cell[]): string | null {
  const md = cells.find((c) => c.type === "markdown");
  if (!md || md.type !== "markdown") return null;
  const withoutTitle = md.source.replace(/^#[^\n]*\n?/, "").trim();
  const firstBlock = withoutTitle.split("\n\n")[0];
  const plain = firstBlock
    .split("\n")
    .map((line) => line.replace(/^\s*[-*]\s+|^\s*\d+\.\s+/, "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/[`*_#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return null;
  return plain.length > 200 ? plain.slice(0, 199).trimEnd() + "…" : plain;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "python" && lang !== "java") return {};

  let topic;
  try {
    topic = getTopic(lang as Language, slug);
  } catch {
    return {};
  }

  const langLabel = lang === "python" ? "Python" : "Java";
  const description =
    firstMarkdownExcerpt(topic.cells) ??
    `${topic.title} — ${langLabel}, with real executed code and recorded output.`;

  return {
    title: `${topic.title} (${langLabel})`,
    description,
    alternates: { canonical: `/${lang}/${slug}` },
    openGraph: { title: `${topic.title} (${langLabel})`, description },
    twitter: { title: `${topic.title} (${langLabel})`, description },
  };
}

const TIER_LABEL: Record<string, string> = {
  T1: "T1 · high-leverage",
  T2: "T2 · intermediate depth",
  T3: "T3 · internals / rare",
};

const TIER_COLORS: Record<string, string> = {
  T1: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  T2: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  T3: "bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300",
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (lang !== "python" && lang !== "java") notFound();

  let topic;
  try {
    topic = getTopic(lang as Language, slug);
  } catch {
    notFound();
  }

  const { prev, next } = findAdjacent(lang as Language, slug);
  const meta = getItemMeta(lang as Language, slug);
  const comparePeer = topic.related.find((r) => r.kind === "compare");
  const relatedSame = topic.related.filter((r) => r.kind === "related");

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-10 sm:py-12 lg:px-14 xl:max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-[13px]">
        <Link href="/" className="text-muted hover:text-foreground">
          Mastery
        </Link>
        <span className="text-border">/</span>
        <span className="font-medium text-muted">{lang === "python" ? "Python" : "Java"}</span>
        {meta && (
          <>
            <span className="text-border">/</span>
            <span className="text-muted">
              {meta.categoryLetter}. {meta.categoryName}
            </span>
          </>
        )}
      </div>
      {meta && (
        <div className="mb-7">
          <span
            className={`rounded-full px-3 py-1 text-[12px] font-bold tracking-wide ${
              TIER_COLORS[meta.tier] ?? "bg-surface text-muted"
            }`}
          >
            {TIER_LABEL[meta.tier] ?? meta.tier}
          </span>
        </div>
      )}

      {comparePeer && (
        <Link
          href={`/${comparePeer.language}/${comparePeer.slug}`}
          className="mb-7 flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-[14px] font-medium text-accent-hover hover:border-accent/60"
        >
          <span>
            <span aria-hidden>⇄</span> Compare with {comparePeer.language === "python" ? "Python" : "Java"}:{" "}
            {comparePeer.label ?? comparePeer.title}
          </span>
          <span aria-hidden>→</span>
        </Link>
      )}

      <article>
        {topic.cells.map((cell, i) => (
          <CellView key={i} cell={cell} language={lang as Language} />
        ))}
      </article>

      {(topic.interview || topic.industryPractice) && (
        <div className="mt-10 space-y-4 border-t border-border pt-8">
          {topic.interview && (
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <h2 className="mb-2.5 flex items-center gap-2 text-[13px] font-bold tracking-wider text-accent uppercase">
                <span aria-hidden>🎯</span> Interview angle
              </h2>
              <div className="text-[16.5px] leading-[1.75] text-foreground/80 [&_p]:mb-3 [&_p]:text-[16.5px] [&_p]:leading-[1.75] [&_p:last-child]:mb-0">
                <Markdown>{topic.interview}</Markdown>
              </div>
            </div>
          )}
          {topic.industryPractice && (
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
              <h2 className="mb-2.5 flex items-center gap-2 text-[13px] font-bold tracking-wider text-accent uppercase">
                <span aria-hidden>🏭</span> In the industry
              </h2>
              <div className="text-[16.5px] leading-[1.75] text-foreground/80 [&_p]:mb-3 [&_p]:text-[16.5px] [&_p]:leading-[1.75] [&_p:last-child]:mb-0">
                <Markdown>{topic.industryPractice}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}

      {relatedSame.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-[13px] font-bold tracking-wider text-muted uppercase">See also</h2>
          <ul className="flex flex-wrap gap-2">
            {relatedSame.map((r) => (
              <li key={`${r.language}/${r.slug}`}>
                <Link
                  href={`/${r.language}/${r.slug}`}
                  className="inline-block rounded-full border border-border px-3.5 py-1.5 text-[13.5px] text-foreground/75 hover:border-accent/50 hover:text-accent"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-[14.5px]">
        {prev ? (
          <Link href={`/${prev.lang}/${prev.slug}`} className="min-w-0 truncate font-medium text-accent hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${next.lang}/${next.slug}`}
            className="min-w-0 truncate text-right font-medium text-accent hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
