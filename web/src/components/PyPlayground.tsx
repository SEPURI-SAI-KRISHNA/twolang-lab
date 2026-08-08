"use client";

import { useState } from "react";
import { getPyodide } from "@/lib/pyodideLoader";

type Status = "idle" | "loading-runtime" | "running" | "error";

export function PyPlayground({ initialCode }: { initialCode: string }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function run() {
    setOutput(null);
    setStatus("loading-runtime");
    try {
      const pyodide = await getPyodide();
      setStatus("running");
      const buf: string[] = [];
      pyodide.setStdout({ batched: (s) => buf.push(s) });
      pyodide.setStderr({ batched: (s) => buf.push(s) });
      try {
        await pyodide.runPythonAsync(code);
      } catch (err) {
        buf.push(String(err));
      }
      setOutput(buf.length ? buf.join("\n") : "(no output)");
      setStatus("idle");
    } catch (err) {
      setOutput(`Failed to load the Python runtime: ${String(err)}`);
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-full border border-accent/30 bg-accent-soft px-4 py-2.5 text-[14px] font-semibold text-accent-hover transition-colors hover:bg-accent/15"
      >
        <span className="text-[11px]">▶</span> Edit &amp; run live
        <span className="hidden font-normal text-accent/80 sm:inline">— real Python, in your browser</span>
      </button>
    );
  }

  const busy = status === "loading-runtime" || status === "running";

  return (
    <div className="mt-3 rounded-lg border border-accent/25 bg-accent-soft/60 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11.5px] font-bold tracking-wider text-accent-hover uppercase">
          Live playground
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[12.5px] font-medium text-muted hover:text-foreground"
        >
          Close
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={Math.max(3, code.split("\n").length + 1)}
        className="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-[16px] leading-[1.6] text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="rounded-full bg-accent px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading-runtime" ? "Loading Python runtime…" : status === "running" ? "Running…" : "Run"}
        </button>
        <button
          type="button"
          onClick={() => {
            setCode(initialCode);
            setOutput(null);
          }}
          className="rounded-full border border-border px-4 py-2 text-[13.5px] font-medium text-muted hover:bg-surface"
        >
          Reset to original
        </button>
        {status === "loading-runtime" && (
          <span className="text-[12.5px] text-muted">first run downloads the CPython WASM runtime (~10MB)</span>
        )}
      </div>
      {output !== null && (
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background p-3 font-mono text-[16px] leading-[1.6] whitespace-pre-wrap text-foreground">
          {output}
        </pre>
      )}
    </div>
  );
}
