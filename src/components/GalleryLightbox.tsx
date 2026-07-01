"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { type GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/utils";

type GalleryLightboxProps = {
  open: boolean;
  title: string;
  images: readonly GalleryImage[];
  initialIndex?: number;
  onClose: () => void;
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

// Deterministic reference code derived from a photo's src, so the same photo
// always shows the same code (it "refers to" that photo rather than being
// random on every tap).
function photoCode(src: string) {
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) {
    hash = (hash * 31 + src.charCodeAt(i)) >>> 0;
  }
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[hash % alphabet.length];
    hash = Math.floor(hash / alphabet.length) + (i + 1) * 7;
  }
  return `MK-${code.slice(0, 3)}-${code.slice(3)}`;
}

function PreviewImage({
  image,
  side,
}: {
  image: GalleryImage;
  side: "left" | "right";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-[9%] hidden h-[76%] w-[34vw] max-w-[520px] overflow-hidden opacity-35 lg:block",
        side === "left" ? "left-[-11vw]" : "right-[-11vw]"
      )}
    >
      <Image
        src={image.src}
        alt=""
        fill
        loading="lazy"
        quality={60}
        sizes="34vw"
        className="object-cover"
      />
    </div>
  );
}

export function GalleryLightbox({
  open,
  title,
  images,
  initialIndex = 0,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    images.length > 0 ? wrapIndex(initialIndex, images.length) : 0
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (images.length < 2) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) => wrapIndex(index - 1, images.length));
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((index) => wrapIndex(index + 1, images.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);

      if (window.location.hash.startsWith("#lightbox-gallery")) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    };
  }, [images.length, onClose, open]);

  useEffect(() => {
    if (!open || images.length === 0) {
      return;
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#lightbox-gallery=slide-${currentIndex}`
    );
  }, [currentIndex, images.length, open]);

  const slides = useMemo(() => {
    if (images.length === 0) {
      return null;
    }

    return {
      current: images[wrapIndex(currentIndex, images.length)],
      previous: images[wrapIndex(currentIndex - 1, images.length)],
      next: images[wrapIndex(currentIndex + 1, images.length)],
    };
  }, [currentIndex, images]);

  if (!open || !slides) {
    return null;
  }

  const showNavigation = images.length > 1;

  return (
    <>
      <div className="animate-fade-in fixed inset-0 z-[1042] bg-cream/[0.98] lg:bg-cream/90" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} gallery`}
        className="fixed inset-0 z-[1043] overflow-y-auto overflow-x-hidden"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="fixed right-[clamp(28px,5.7vw,110px)] top-[27px] z-[1046] flex h-11 w-11 items-center justify-center text-navy transition-colors hover:text-gold"
        >
          <X className="h-9 w-9 stroke-[1.8]" aria-hidden="true" />
        </button>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setCurrentIndex((index) => wrapIndex(index - 1, images.length))}
              className="fixed left-[clamp(22px,3.6vw,68px)] top-1/2 z-[1045] flex h-[76px] w-[76px] -translate-y-1/2 items-center justify-center text-navy transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-[72px] w-[72px] stroke-[1.4]" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setCurrentIndex((index) => wrapIndex(index + 1, images.length))}
              className="fixed right-[clamp(22px,3.6vw,68px)] top-1/2 z-[1045] flex h-[76px] w-[76px] -translate-y-1/2 items-center justify-center text-navy transition-colors hover:text-gold"
            >
              <ArrowRight className="h-[72px] w-[72px] stroke-[1.4]" aria-hidden="true" />
            </button>
          </>
        )}

        <div className="relative min-h-screen px-[30px] pb-[50px] pt-[104px] sm:px-[8vw] lg:px-[14vw] lg:py-[50px]">
          <div className="relative mx-auto flex min-h-[calc(100vh-154px)] max-w-[1340px] items-start justify-center lg:min-h-[calc(100vh-100px)] lg:items-center">
            {showNavigation && <PreviewImage image={slides.previous} side="left" />}
            {showNavigation && <PreviewImage image={slides.next} side="right" />}

            <figure className="animate-soft-pop relative z-[2] flex w-full max-w-[1144px] flex-col items-center">
              <Image
                src={slides.current.src}
                alt={`${title} gallery photo ${currentIndex + 1}`}
                width={slides.current.width}
                height={slides.current.height}
                loading="eager"
                quality={80}
                sizes="(min-width: 1024px) 1144px, 90vw"
                className="h-auto w-auto max-h-[calc(100vh-142px)] max-w-full object-contain"
              />
              <figcaption className="mt-4 font-heading text-[13px] font-medium uppercase tracking-[0.28em] text-navy/60">
                {photoCode(slides.current.src)}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
