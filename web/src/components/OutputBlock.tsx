import type { OutputBlock as OutputBlockT } from "@/lib/types";

export function OutputBlocks({ outputs }: { outputs: OutputBlockT[] }) {
  if (!outputs || outputs.length === 0) return null;
  return (
    <div className="mb-4 space-y-2">
      {outputs.map((out, i) => {
        if (out.kind === "stream") {
          return <OutputBox key={i} label="Output" text={out.text} tone="neutral" />;
        }
        if (out.kind === "error") {
          return (
            <OutputBox
              key={i}
              label="Error"
              text={out.traceback.join("\n") || `${out.ename}: ${out.evalue}`}
              tone="error"
            />
          );
        }
        if (out.kind === "result") {
          return <OutputBox key={i} label="Result" text={out.text} tone="neutral" />;
        }
        return null;
      })}
    </div>
  );
}

function OutputBox({ label, text, tone }: { label: string; text: string; tone: "neutral" | "error" }) {
  const border = tone === "error" ? "border-red-200 dark:border-red-900/50" : "border-border";
  const bg = tone === "error" ? "bg-red-50 dark:bg-red-950/20" : "bg-surface";
  const labelColor = tone === "error" ? "text-red-700 dark:text-red-400" : "text-muted";
  const textColor = tone === "error" ? "text-red-900 dark:text-red-300" : "text-foreground";
  const barColor = tone === "error" ? "bg-red-500" : "bg-accent";

  return (
    <div className={`overflow-hidden rounded-lg border ${border} ${bg} shadow-[0_1px_2px_rgba(0,0,0,0.03)]`}>
      <div className="flex">
        <div className={`w-1 shrink-0 ${barColor}`} />
        <div className="min-w-0 flex-1 px-4 py-3.5 sm:px-5">
          <span className={`mb-2 block text-[11px] font-semibold tracking-wider uppercase ${labelColor}`}>
            {label}
          </span>
          <pre className={`overflow-x-auto font-mono text-[15.5px] leading-[1.6] whitespace-pre-wrap ${textColor}`}>
            {text}
          </pre>
        </div>
      </div>
    </div>
  );
}
