"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { type GalleryImage } from "@/lib/gallery";

type ServiceGalleryGridProps = {
  title: string;
  images: readonly GalleryImage[];
};

const GAP = 12;
const ROW_UNIT = 8;
// Aspect ratio (w/h) at or above which an image becomes a wide, 2-column feature.
const WIDE_ASPECT = 1.3;

function columnsForWidth(width: number) {
  if (width >= 1280) return 4;
  if (width >= 768) return 3;
  return 2;
}

export function ServiceGalleryGrid({ title, images }: ServiceGalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const cols = columnsForWidth(containerWidth || 1280);
  const colWidth =
    containerWidth > 0 ? (containerWidth - GAP * (cols - 1)) / cols : 0;

  return (
    <>
      <div
        ref={containerRef}
        className="grid transition-opacity duration-300"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridAutoRows: `${ROW_UNIT}px`,
          gridAutoFlow: "dense",
          gap: `${GAP}px`,
          opacity: colWidth > 0 ? 1 : 0,
        }}
      >
        {images.map((image, index) => {
          const aspect = image.width / image.height;
          const span = Math.min(aspect >= WIDE_ASPECT ? 2 : 1, cols);
          const renderWidth = colWidth * span + GAP * (span - 1);
          const renderHeight = renderWidth / aspect;
          const rowSpan = Math.max(
            1,
            Math.round((renderHeight + GAP) / (ROW_UNIT + GAP)),
          );

          return (
            <figure
              key={image.src}
              className="relative m-0 overflow-hidden rounded-[6px] bg-muted"
              style={{
                gridColumn: `span ${span}`,
                gridRow: colWidth > 0 ? `span ${rowSpan}` : undefined,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group block h-full w-full text-left"
                aria-label={`Open ${title} photo ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={`${title} gallery photo ${index + 1}`}
                  fill
                  sizes={
                    span === 2
                      ? "(min-width: 1280px) 48vw, (min-width: 768px) 64vw, 96vw"
                      : "(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw"
                  }
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  priority={index < 6}
                />
              </button>
            </figure>
          );
        })}
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          key={`${title}-${activeIndex}`}
          open
          title={title}
          images={images}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
