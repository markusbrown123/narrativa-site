"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { clsx } from "@/lib/clsx";

export type HeroPhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export function HeroRotator({
  photos,
  sizes,
  className,
  defaultIndex = 0,
}: {
  photos: HeroPhoto[];
  sizes: string;
  className?: string;
  defaultIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    if (photos.length <= 1) return;
    // One-shot randomization after hydration so the server-rendered
    // default doesn't mismatch the client. Intentional setState in an
    // effect — see React's "synchronize on mount" pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(Math.floor(Math.random() * photos.length));
  }, [photos.length]);

  return (
    <div className={clsx("relative overflow-hidden", className)}>
      {photos.map((photo, index) => {
        const isDefault = index === defaultIndex;
        const isActive = index === activeIndex;
        return (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={isDefault}
            loading={isDefault ? undefined : "eager"}
            className={clsx(
              "object-cover transition-opacity duration-700 ease-out",
              isActive ? "opacity-100" : "opacity-0",
            )}
            style={
              photo.objectPosition
                ? { objectPosition: photo.objectPosition }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
