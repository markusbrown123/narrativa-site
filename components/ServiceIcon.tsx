import type { Service } from "@/types/content";

const paths: Record<Service["icon"], React.ReactNode> = {
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  pen: (
    <>
      <path d="M14 4l6 6-10 10H4v-6L14 4z" />
      <path d="M13 5l6 6" />
    </>
  ),
  stage: (
    <>
      <path d="M3 8h18M5 8v10M19 8v10M3 18h18" />
      <path d="M9 14h6" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6l2-2h4l2 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: Service["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
