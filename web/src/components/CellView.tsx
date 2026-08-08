import type { Cell, Language } from "@/lib/types";
import { Markdown } from "./Markdown";
import { CodeBlock } from "./CodeBlock";
import { OutputBlocks } from "./OutputBlock";
import { PyPlayground } from "./PyPlayground";
import { RevealOutput } from "./RevealOutput";

export function CellView({ cell, language }: { cell: Cell; language: Language }) {
  if (cell.type === "markdown") {
    return (
      <div className="mb-2">
        <Markdown>{cell.source}</Markdown>
      </div>
    );
  }

  if (cell.type === "code") {
    const hasOutput = cell.outputs && cell.outputs.length > 0;
    return (
      <div className="mb-6">
        <CodeBlock code={cell.source} language={language} />
        {hasOutput ? (
          <RevealOutput>
            <OutputBlocks outputs={cell.outputs} />
          </RevealOutput>
        ) : null}
        {language === "python" && <PyPlayground initialCode={cell.source} />}
      </div>
    );
  }

  return null;
}
