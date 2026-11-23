"use client";

import { useState } from "react";
import { Button } from "./Button";

/** Copies `text` to the clipboard and confirms with "Copied". */
export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <Button type="button" variant="secondary" onClick={copy}>
        {copied ? copiedLabel : label}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
