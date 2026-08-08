import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import { CopyButton } from "./CopyButton";

hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);

export function CodeBlock({ code, language }: { code: string; language: "python" | "java" }) {
  const { value } = hljs.highlight(code, { language });
  return (
    <div className="mb-1 overflow-hidden rounded-lg border border-border shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between border-b border-border bg-surface py-1.5 pr-1.5 pl-4">
        <span className="text-[11px] font-semibold tracking-wider text-muted uppercase">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto bg-background p-4 text-[16px] leading-[1.65] sm:p-5">
        <code
          className={`hljs language-${language} font-mono`}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </pre>
    </div>
  );
}
