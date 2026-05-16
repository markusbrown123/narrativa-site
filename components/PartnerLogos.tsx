import Image from "next/image";
import type { Partner } from "@/types/content";

export function PartnerLogos({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-y-10 items-center">
      {partners.map((partner) => (
        <li
          key={partner.id}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
              className="object-contain"
            />
          </div>
          <p className="text-xs sm:text-sm text-ink-soft text-center leading-snug">
            {partner.name}
            {partner.relationship ? (
              <span className="block text-xs text-muted mt-0.5">
                {partner.relationship}
              </span>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
