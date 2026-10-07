import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Small Markdown renderer for blog posts. Supports ## and ### headings,
 * paragraphs, bullet and numbered lists, simple tables, **bold**, *italic*
 * and [links](/path). Everything is rendered as React elements, never as raw HTML.
 */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = "text-ember underline decoration-ember/40 underline-offset-2 hover:decoration-ember";
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={cls}>{label}</Link>
      ) : (
        <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">{label}</a>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

const cells = (line: string) => line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n");
  const out: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith("### ")) {
      out.push(<h3 key={i} className="mt-8 font-display text-[21px] text-stone-900">{inline(line.slice(4))}</h3>);
      i++;
    } else if (line.startsWith("## ")) {
      out.push(<h2 key={i} className="mt-12 font-display text-[28px] leading-tight text-stone-900">{inline(line.slice(3))}</h2>);
      i++;
    } else if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2));
      out.push(
        <ul key={i} className="mt-4 list-disc space-y-2 pl-6 marker:text-ember">
          {items.map((t, k) => <li key={k}>{inline(t)}</li>)}
        </ul>
      );
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""));
      out.push(
        <ol key={i} className="mt-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-ember">
          {items.map((t, k) => <li key={k}>{inline(t)}</li>)}
        </ol>
      );
    } else if (line.startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(lines[i++]);
      const [head, , ...body] = rows;
      out.push(
        <div key={i} className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
            <thead>
              <tr>{cells(head).map((c, k) => <th key={k} className="border-b-2 border-stone-300 px-3 py-2.5 font-semibold text-stone-900">{inline(c)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, k) => (
                <tr key={k} className="border-b border-stone-200 align-top">
                  {cells(r).map((c, j) => <td key={j} className={`px-3 py-2.5 ${j === 0 ? "font-medium text-stone-900" : ""}`}>{inline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(#{2,3} |[-*] |\d+\. |\|)/.test(lines[i])) para.push(lines[i++]);
      out.push(<p key={i} className="mt-4">{inline(para.join(" "))}</p>);
    }
  }

  return <div className="text-[17px] leading-[1.75] text-stone-700">{out}</div>;
}
