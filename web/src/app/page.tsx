import Link from "next/link";
import { getManifest, getTotals } from "@/lib/content";
import { InlineMd } from "@/components/InlineMd";

export default function Home() {
  const manifest = getManifest();
  const { done } = getTotals();

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-10 sm:py-14 lg:px-14 xl:max-w-6xl">
      <p className="mb-3 text-[13px] font-bold tracking-[0.15em] text-accent uppercase">
        Python &amp; Java, in depth
      </p>
      <h1 className="font-serif mb-5 text-[2.75rem] leading-[1.12] font-semibold tracking-tight text-foreground">
        Every feature. Real code.
        <br />
        Real output.
      </h1>
      <p className="mb-9 max-w-2xl text-lg leading-relaxed text-foreground/70">
        Each topic here was actually executed — Python 3.12 and OpenJDK 21 — and the recorded output is
        exactly what came back, not a description of what &ldquo;should&rdquo; happen. Every topic also
        carries an interview angle and an industry-practice note, and Python topics get a live, editable
        playground powered by Pyodide, running real CPython in your browser.
      </p>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="rounded-xl border border-border bg-surface px-5 py-4">
          <div className="text-[1.75rem] leading-none font-semibold text-foreground">{done}</div>
          <div className="mt-1 text-[13px] text-muted">topics written</div>
        </div>
        {done > 0 && (
          <Link
            href={firstTopicHref(manifest)}
            className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            Start reading →
          </Link>
        )}
      </div>

      <div className="mb-14 flex flex-wrap gap-3">
        <Link
          href="/map"
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-[14px] font-medium text-foreground/80 hover:border-accent/40 hover:bg-accent-soft"
        >
          <span aria-hidden>◈</span> Explore the concept map
        </Link>
        <Link
          href="/compare"
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-[14px] font-medium text-foreground/80 hover:border-accent/40 hover:bg-accent-soft"
        >
          <span aria-hidden>⇄</span> Python vs Java, side by side
        </Link>
      </div>

      {(["python", "java"] as const).map((lang) => (
        <div key={lang} className="mb-12">
          <h2 className="font-serif mb-4 text-2xl font-semibold tracking-tight text-foreground">
            {lang === "python" ? "Python" : "Java"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {manifest[lang].map((category) => {
              const catDone = category.items.filter((i) => i.status === "done");
              if (catDone.length === 0) return null;
              return (
                <div key={category.letter} className="rounded-xl border border-border p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-foreground/90">
                      {category.letter}. {category.name}
                    </h3>
                    <span className="rounded-full bg-surface px-2 py-0.5 text-[12px] font-medium text-muted">
                      {catDone.length} {catDone.length === 1 ? "topic" : "topics"}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {catDone.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/${lang}/${item.slug}`} className="text-[14.5px] text-accent hover:underline">
                          <InlineMd text={item.title ?? item.slug ?? ""} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function firstTopicHref(manifest: ReturnType<typeof getManifest>) {
  for (const lang of ["python", "java"] as const) {
    for (const category of manifest[lang]) {
      for (const item of category.items) {
        if (item.status === "done" && item.slug) return `/${lang}/${item.slug}`;
      }
    }
  }
  return "/";
}
