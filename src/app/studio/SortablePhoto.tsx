"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLeftToLine, ArrowRightToLine, GripVertical, Trash2 } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

type SortablePhotoProps = {
  photo: GalleryImage;
  index: number;
  total: number;
  onDelete: (src: string) => void;
  onCaptionCommit: (src: string, caption: string) => void;
  onMoveToFront: (src: string) => void;
  onMoveToBack: (src: string) => void;
};

export function SortablePhoto({
  photo,
  index,
  total,
  onDelete,
  onCaptionCommit,
  onMoveToFront,
  onMoveToBack,
}: SortablePhotoProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: photo.src,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 40 : undefined,
  };

  return (
    <figure
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm ${
        isDragging ? "opacity-80 ring-2 ring-gold" : ""
      }`}
    >
      <div className="relative aspect-square bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <span className="absolute left-2 top-2 rounded-md bg-navy/70 px-1.5 py-0.5 text-[11px] font-medium text-cream">
          {index + 1}
        </span>

        {/* Drag handle */}
        <button
          type="button"
          aria-label="Drag to reorder"
          className="absolute right-2 top-2 flex h-8 w-8 cursor-grab touch-none items-center justify-center rounded-md bg-white/85 text-navy shadow-sm transition hover:bg-white active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Hover actions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-navy/70 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
          <div className="pointer-events-auto flex gap-1">
            <button
              type="button"
              aria-label="Move to start"
              disabled={index === 0}
              onClick={() => onMoveToFront(photo.src)}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-navy shadow-sm transition hover:bg-white disabled:opacity-40"
            >
              <ArrowLeftToLine className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Move to end"
              disabled={index === total - 1}
              onClick={() => onMoveToBack(photo.src)}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-navy shadow-sm transition hover:bg-white disabled:opacity-40"
            >
              <ArrowRightToLine className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            aria-label="Delete photo"
            onClick={() => onDelete(photo.src)}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white shadow-sm transition hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <input
        // Uncontrolled + keyed by caption: re-seeds after a saved edit, but never
        // fights the user's typing (which doesn't change the key).
        key={photo.caption}
        defaultValue={photo.caption}
        onBlur={(event) => {
          const value = event.target.value;
          if (value !== photo.caption) onCaptionCommit(photo.src, value);
        }}
        placeholder="Caption"
        aria-label="Photo caption"
        className="border-t border-navy/10 bg-white px-3 py-2 text-xs text-navy outline-none focus:bg-gold/5"
      />
    </figure>
  );
}
