"use client";

type Props = {
  content: string;
};

export function MarkdownContent({ content }: Props) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;

  const flush = (key: string) => {
    if (tableBuffer.length > 0) {
      elements.push(<TableRenderer key={key} rows={tableBuffer} />);
      tableBuffer = [];
      inTable = false;
    }
  };

  lines.forEach((line, i) => {
    const key = String(i);

    if (line.startsWith("|")) {
      inTable = true;
      tableBuffer.push(line);
      return;
    }

    if (inTable) {
      flush(key);
    }

    if (line.trim() === "") {
      return;
    }

    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key} className="border-l-4 border-indigo-400 pl-4 text-gray-600 italic my-2">
          <InlineText text={line.slice(2)} />
        </blockquote>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={key} className="flex gap-2 my-0.5">
          <span className="text-gray-400 mt-0.5 shrink-0">•</span>
          <span className="text-gray-700 leading-relaxed"><InlineText text={line.slice(2)} /></span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        elements.push(
          <div key={key} className="flex gap-2 my-0.5">
            <span className="text-indigo-500 font-semibold shrink-0">{match[1]}.</span>
            <span className="text-gray-700 leading-relaxed"><InlineText text={match[2]} /></span>
          </div>
        );
      }
    } else {
      elements.push(
        <p key={key} className="text-gray-700 leading-relaxed my-1.5">
          <InlineText text={line} />
        </p>
      );
    }
  });

  if (inTable && tableBuffer.length > 0) {
    elements.push(<TableRenderer key="table-end" rows={tableBuffer} />);
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function TableRenderer({ rows }: { rows: string[] }) {
  const filtered = rows.filter((r) => !r.replace(/[\s|:-]/g, "").trim() === false || r.replace(/[\s|:-]/g, "").trim() !== "");
  const nonSeparator = filtered.filter((r) => !/^[\s|:-]+$/.test(r));
  if (nonSeparator.length === 0) return null;

  const parseCells = (row: string) =>
    row.split("|").map((c) => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);

  const [header, ...body] = nonSeparator;
  const headers = parseCells(header);

  return (
    <div className="overflow-x-auto my-3 rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
              {parseCells(row).map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-gray-700 border-b border-gray-100 last:border-b-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
