import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * Cover image for "Unapologetic". Uses the real front-cover asset and
 * preserves its 6.25:9.25 trim aspect ratio.
 */
export function BookCover({
  className,
  size = "lg",
  priority = false,
}: {
  className?: string;
  size?: "md" | "lg" | "xl";
  priority?: boolean;
}) {
  const dims = {
    md: "w-48 sm:w-56",
    lg: "w-64 sm:w-72",
    xl: "w-72 sm:w-96",
  }[size];

  const sizes = {
    md: "(min-width: 640px) 224px, 192px",
    lg: "(min-width: 640px) 288px, 256px",
    xl: "(min-width: 640px) 384px, 288px",
  }[size];

  return (
    <div
      className={clsx(
        "relative aspect-[6.25/9.25] shrink-0 drop-shadow-[0_30px_60px_rgba(43,15,68,0.35)]",
        dims,
        className,
      )}
    >
      <Image
        src="/book/unapologetic-front-cover.jpg"
        alt="Unapologetic: Boldly Lead the Life and Career You Deserve — front cover"
        fill
        sizes={sizes}
        priority={priority}
        className="rounded-sm object-cover"
      />
    </div>
  );
}
