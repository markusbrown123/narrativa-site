import { clsx } from "@/lib/clsx";

/**
 * Renders plain text the way Nicole writes it in the Sheet: blank lines
 * separate paragraphs, and a block whose lines all start with "- " is a
 * bulleted list. No markup to learn, nothing to escape.
 */
export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const blocks = text
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className={clsx("space-y-5", className)}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());
        if (lines.every((l) => /^[-•]\s+/.test(l))) {
          return (
            <ul key={i} className="space-y-2.5">
              {lines.map((l) => (
                <li key={l} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-brand"
                  />
                  <span>{l.replace(/^[-•]\s+/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}
