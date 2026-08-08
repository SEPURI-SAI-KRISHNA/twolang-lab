import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

const components: Components = {
  h1: (props) => (
    <h1
      className="font-serif mt-0 mb-5 text-[2.375rem] leading-[1.15] font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-serif mt-10 mb-3.5 text-[1.625rem] leading-tight font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-serif mt-8 mb-3 text-[1.3rem] leading-tight font-semibold text-foreground" {...props} />
  ),
  p: (props) => <p className="mb-5 text-[19px] leading-[1.8] text-foreground/85" {...props} />,
  ul: (props) => (
    <ul className="mb-5 list-disc space-y-2.5 pl-6 text-[19px] leading-[1.8] text-foreground/85" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-5 list-decimal space-y-2.5 pl-6 text-[19px] leading-[1.8] text-foreground/85" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  code: (props) => {
    const { className, children, ...rest } = props;
    const isBlock = /language-/.test(className ?? "");
    if (isBlock) {
      return (
        <code className={`${className ?? ""} font-mono text-[16px]`} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-accent-soft px-[0.4em] py-[0.15em] font-mono text-[0.85em] font-medium text-accent-hover"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: (props) => (
    <pre className="mb-5 overflow-x-auto rounded-lg border border-border bg-surface p-4 leading-relaxed sm:p-5" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-5 rounded-r-md border-l-4 border-accent/40 bg-accent-soft py-2 pl-4 text-[19px] text-foreground/75 italic"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium text-accent underline decoration-accent/40 decoration-2 underline-offset-2 hover:text-accent-hover"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mb-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-[16px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-border bg-surface px-3 py-2 text-left font-semibold text-foreground" {...props} />
  ),
  td: (props) => <td className="border-b border-border px-3 py-2 text-foreground/85" {...props} />,
  hr: (props) => <hr className="my-8 border-border" {...props} />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
