import Image from "next/image";
import { clsx } from "@/lib/clsx";
import type { Partner } from "@/types/content";

/**
 * Display size for a logo: one shared height, nudged only slightly by shape
 * (very wide wordmarks a little shorter, compact marks a little taller) so
 * the row reads as one even line. Logos keep their real colours and
 * proportions; nothing is cropped.
 */
function logoBox(p: Partner, scale = 1) {
  const ratio =
    p.logo_width && p.logo_height ? p.logo_width / p.logo_height : 3;
  let h = 48 * Math.pow(ratio / 2.5, -0.2);
  h = Math.min(Math.max(h, 40), 56) * scale;
  let w = h * ratio;
  if (w > 220 * scale) {
    w = 220 * scale;
    h = w / ratio;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

function Logo({ partner, scale }: { partner: Partner; scale?: number }) {
  const { w, h } = logoBox(partner, scale);
  return (
    <span
      className={clsx(
        "inline-flex max-w-full shrink-0 items-center justify-center",
        partner.logo_on_dark &&
          "rounded-2xl bg-[color:var(--color-purple-900)] px-4 py-3",
      )}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={w}
        height={h}
        // max-width lets a wide logo shrink inside a narrow card; contain
        // keeps it uncropped if it does.
        style={{ width: w, height: h, maxWidth: "100%" }}
        className="object-contain"
      />
    </span>
  );
}

/**
 * Partner logos on a white band, drifting slowly sideways. Pauses on
 * hover and on keyboard focus, and stands still (wrapped and centred)
 * for visitors who prefer reduced motion. With only a few logos it is a
 * static, centred row. Logos never link out.
 */
export function LogoMarquee({
  partners,
  label = "Partners and organizations",
  className,
}: {
  partners: Partner[];
  label?: string;
  className?: string;
}) {
  if (partners.length === 0) return null;
  const moving = partners.length >= 4;
  // Roughly 4.5s per logo keeps the drift slow and readable.
  const duration = `${Math.max(24, partners.length * 4.5)}s`;

  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={moving ? 0 : undefined}
      className={clsx(
        "logo-marquee relative overflow-hidden border-y border-line bg-white py-8 sm:py-10",
        moving && "logo-marquee--moving",
        className,
      )}
    >
      <ul
        className="logo-marquee__track flex w-max items-center"
        style={{ animationDuration: duration }}
      >
        {partners.map((p) => (
          <li key={p.id} className="px-6 sm:px-9">
            <Logo partner={p} />
          </li>
        ))}
        {moving
          ? partners.map((p) => (
              <li
                key={`${p.id}-copy`}
                aria-hidden="true"
                className="logo-marquee__copy px-6 sm:px-9"
              >
                <Logo partner={p} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

/** Static grid of every partner logo (Partners page). No links. */
export function LogoGrid({
  partners,
  className,
}: {
  partners: Partner[];
  className?: string;
}) {
  if (partners.length === 0) return null;
  return (
    // Wraps centred, so a short last row sits in the middle, not the left.
    <ul
      className={clsx(
        "flex flex-wrap justify-center gap-4 sm:gap-6",
        className,
      )}
    >
      {partners.map((p) => (
        <li
          key={p.id}
          className="flex min-h-36 w-[calc(50%-0.5rem)] items-center justify-center rounded-3xl border border-line bg-white p-6 sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
        >
          <Logo partner={p} scale={1.3} />
        </li>
      ))}
    </ul>
  );
}
