"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import { useToast } from "../hooks/useToast";

function CodeBlock({ className, children }) {
  const toast = useToast();
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  if (!match) {
    return <code className={className}>{children}</code>;
  }

  return (
    <div className="relative group">
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(codeString);
            toast({ message: "Snippet copied", type: "success" });
          } catch {
            toast({ message: "Couldn't copy snippet", type: "error" });
          }
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-md bg-white/5 text-ink/50 opacity-0 group-hover:opacity-100 hover:text-ink hover:bg-white/10 transition-all"
        title="Copy snippet"
      >
        <Copy size={13} />
      </button>
      <SyntaxHighlighter
        language={match[1]}
        style={vscDarkPlus}
        customStyle={{
          background: "#0b1220",
          borderRadius: "10px",
          border: "1px solid rgba(148,163,184,0.15)",
          fontSize: "0.82rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
