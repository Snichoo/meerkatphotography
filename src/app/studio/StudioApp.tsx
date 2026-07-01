"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { upload } from "@vercel/blob/client";
import {
  Check,
  ImagePlus,
  Loader2,
  LogOut,
  Shuffle,
  TriangleAlert,
  Undo2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import { SortablePhoto } from "./SortablePhoto";

type Service = { id: string; title: string };
type Galleries = Record<string, GalleryImage[]>;
type UploadItem = {
  id: string;
  name: string;
  progress: number;
  status: "uploading" | "error";
  error?: string;
};
type SaveState = "idle" | "saving" | "saved" | "error";

type StudioAppProps = {
  services: Service[];
  initialGalleries: Galleries;
  storageReady: boolean;
};

async function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  try {
    const bitmap = await createImageBitmap(file);
    const dimensions = { width: bitmap.width, height: bitmap.height };
    bitmap.close?.();
    if (dimensions.width > 0 && dimensions.height > 0) return dimensions;
  } catch {
    // Fall through to the <img> fallback below.
  }
  return new Promise((resolve) => {
    const image = document.createElement("img");
    const url = URL.createObjectURL(file);
    image.onload = () => {
      resolve({ width: image.naturalWidth || 1200, height: image.naturalHeight || 1800 });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      resolve({ width: 1200, height: 1800 });
      URL.revokeObjectURL(url);
    };
    image.src = url;
  });
}

export function StudioApp({ services, initialGalleries, storageReady }: StudioAppProps) {
  const router = useRouter();
  const [galleries, setGalleries] = useState<Galleries>(initialGalleries);
  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? "");
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveSeq = useRef(0);

  const photos = galleries[activeId] ?? [];
  const uploadingCount = uploads.filter((item) => item.status === "uploading").length;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 160, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function flashSaved() {
    setSaveState("saved");
    window.setTimeout(() => setSaveState((state) => (state === "saved" ? "idle" : state)), 2000);
  }

  async function persistOrder(serviceId: string, ordered: GalleryImage[]) {
    const seq = (saveSeq.current += 1);
    setSaveState("saving");
    setSaveError(null);
    try {
      const response = await fetch("/api/studio/galleries", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ serviceId, order: ordered.map((photo) => photo.src) }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not save the new order.");
      }
      if (seq === saveSeq.current) flashSaved();
    } catch (error) {
      if (seq === saveSeq.current) {
        setSaveState("error");
        setSaveError(error instanceof Error ? error.message : "Could not save.");
      }
    }
  }

  function applyOrder(next: GalleryImage[]) {
    setGalleries((current) => ({ ...current, [activeId]: next }));
    void persistOrder(activeId, next);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = photos.findIndex((photo) => photo.src === active.id);
    const newIndex = photos.findIndex((photo) => photo.src === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    applyOrder(arrayMove(photos, oldIndex, newIndex));
  }

  function moveToFront(src: string) {
    const index = photos.findIndex((photo) => photo.src === src);
    if (index <= 0) return;
    applyOrder(arrayMove(photos, index, 0));
  }

  function moveToBack(src: string) {
    const index = photos.findIndex((photo) => photo.src === src);
    if (index < 0 || index === photos.length - 1) return;
    applyOrder(arrayMove(photos, index, photos.length - 1));
  }

  function shuffle() {
    if (photos.length < 2) return;
    const next = [...photos];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    applyOrder(next);
  }

  function reverse() {
    if (photos.length < 2) return;
    applyOrder([...photos].reverse());
  }

  async function handleFiles(fileList: FileList | File[]) {
    const serviceId = activeId;
    const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) return;

    if (!storageReady) {
      setSaveState("error");
      setSaveError("Photo storage isn't connected yet. Add a Vercel Blob store to upload photos.");
      return;
    }

    for (const file of files) {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${file.name}`;
      setUploads((items) => [
        ...items,
        { id, name: file.name, progress: 0, status: "uploading" },
      ]);

      try {
        const { width, height } = await readImageDimensions(file);
        const safeName = file.name.replace(/[^a-zA-Z0-9.]+/g, "-").toLowerCase();
        const blob = await upload(`gallery/${serviceId}/${safeName}`, file, {
          access: "public",
          handleUploadUrl: "/api/studio/upload",
          onUploadProgress: (progress) => {
            setUploads((items) =>
              items.map((item) =>
                item.id === id ? { ...item, progress: Math.round(progress.percentage) } : item,
              ),
            );
          },
        });

        const response = await fetch("/api/studio/photos", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ serviceId, src: blob.url, width, height, name: file.name }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error ?? "Could not save the photo.");

        setGalleries((current) => ({ ...current, [serviceId]: data.gallery }));
        setUploads((items) => items.filter((item) => item.id !== id));
      } catch (error) {
        setUploads((items) =>
          items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "error",
                  error: error instanceof Error ? error.message : "Upload failed.",
                }
              : item,
          ),
        );
      }
    }
  }

  async function handleDelete(src: string) {
    if (!window.confirm("Delete this photo? This can't be undone.")) return;
    const serviceId = activeId;
    const previous = galleries[serviceId] ?? [];
    setGalleries((current) => ({
      ...current,
      [serviceId]: previous.filter((photo) => photo.src !== src),
    }));
    try {
      const response = await fetch("/api/studio/photos", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ serviceId, src }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? "Could not delete the photo.");
      setGalleries((current) => ({ ...current, [serviceId]: data.gallery }));
      flashSaved();
    } catch (error) {
      setGalleries((current) => ({ ...current, [serviceId]: previous }));
      setSaveState("error");
      setSaveError(error instanceof Error ? error.message : "Could not delete.");
    }
  }

  async function handleCaptionCommit(src: string, caption: string) {
    const serviceId = activeId;
    setGalleries((current) => ({
      ...current,
      [serviceId]: (current[serviceId] ?? []).map((photo) =>
        photo.src === src ? { ...photo, caption } : photo,
      ),
    }));
    try {
      const response = await fetch("/api/studio/photos", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ serviceId, src, caption }),
      });
      if (response.ok) {
        const data = await response.json();
        setGalleries((current) => ({ ...current, [serviceId]: data.gallery }));
        flashSaved();
      }
    } catch {
      // A caption failing to save is non-critical; leave the local edit in place.
    }
  }

  async function handleLogout() {
    await fetch("/api/studio/session", { method: "DELETE" });
    router.refresh();
  }

  const activeService = services.find((service) => service.id === activeId);

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="font-heading text-[11px] font-medium uppercase tracking-[0.28em] text-navy/50">
              Meerkat Photography
            </p>
            <h1 className="truncate font-heading text-lg font-semibold">Gallery Studio</h1>
          </div>
          <div className="flex items-center gap-3">
            <SaveIndicator state={saveState} error={saveError} />
            <a
              href="/services"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg border border-navy/20 px-3 py-2 text-sm font-medium transition hover:border-gold hover:text-gold sm:inline-block"
            >
              View site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-sm font-medium transition hover:border-gold hover:text-gold"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {/* Gallery tabs */}
        <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3">
          <ul className="flex gap-2">
            {services.map((service) => {
              const count = (galleries[service.id] ?? []).length;
              const active = service.id === activeId;
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                      active
                        ? "border-navy bg-navy text-cream"
                        : "border-navy/20 bg-white/60 hover:border-gold"
                    }`}
                  >
                    {service.title}
                    <span
                      className={`rounded-full px-1.5 text-[11px] ${
                        active ? "bg-cream/20 text-cream" : "bg-navy/10 text-navy/70"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {!storageReady && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Photo storage isn&apos;t connected yet.</p>
              <p className="mt-1">
                You&apos;re seeing the current galleries, but uploads and changes can&apos;t be saved
                until a Vercel Blob store is added to this project. See{" "}
                <code className="rounded bg-amber-100 px-1">STUDIO_SETUP.md</code> for the one-time
                setup.
              </p>
            </div>
          </div>
        )}

        {saveState === "error" && saveError && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold">Couldn&apos;t save your change</p>
              <p className="mt-1 break-words">{saveError}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSaveState("idle");
                setSaveError(null);
              }}
              aria-label="Dismiss"
              className="ml-auto shrink-0 text-red-400 transition hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-semibold">{activeService?.title}</h2>
            <p className="text-sm text-navy/60">
              {photos.length} photo{photos.length === 1 ? "" : "s"} · drag to reorder
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={shuffle}
              disabled={photos.length < 2}
              className="flex items-center gap-1.5 rounded-lg border border-navy/20 bg-white/60 px-3 py-2 text-sm font-medium transition hover:border-gold disabled:opacity-40"
            >
              <Shuffle className="h-4 w-4" /> Shuffle
            </button>
            <button
              type="button"
              onClick={reverse}
              disabled={photos.length < 2}
              className="flex items-center gap-1.5 rounded-lg border border-navy/20 bg-white/60 px-3 py-2 text-sm font-medium transition hover:border-gold disabled:opacity-40"
            >
              <Undo2 className="h-4 w-4" /> Reverse
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-cream transition hover:bg-navy/90"
            >
              <ImagePlus className="h-4 w-4" /> Add photos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files) handleFiles(event.target.files);
                event.target.value = "";
              }}
            />
          </div>
        </div>

        {/* Dropzone */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            if (event.dataTransfer.files) handleFiles(event.dataTransfer.files);
          }}
          className={`mb-6 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
            dragOver ? "border-gold bg-gold/10" : "border-navy/20 bg-white/40 hover:border-gold/60"
          }`}
        >
          <ImagePlus className="h-7 w-7 text-navy/50" />
          <p className="text-sm font-medium">
            Drag photos here, or <span className="text-gold underline">browse</span>
          </p>
          <p className="text-xs text-navy/50">JPG, PNG, WebP or GIF · up to 30 MB each</p>
        </button>

        {/* Upload queue */}
        {uploads.length > 0 && (
          <div className="mb-6 space-y-2">
            {uploadingCount > 0 && (
              <p className="text-sm font-medium text-navy/70">
                <Loader2 className="mr-1.5 inline h-4 w-4 animate-spin" />
                Uploading {uploadingCount} photo{uploadingCount === 1 ? "" : "s"}…
              </p>
            )}
            {uploads.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-navy/10 bg-white/70 px-3 py-2 text-sm"
              >
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                {item.status === "uploading" ? (
                  <div className="flex w-40 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10">
                      <div
                        className="h-full rounded-full bg-gold transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-xs text-navy/50">{item.progress}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-600">{item.error ?? "Failed"}</span>
                    <button
                      type="button"
                      aria-label="Dismiss"
                      onClick={() => setUploads((items) => items.filter((u) => u.id !== item.id))}
                      className="text-navy/40 hover:text-navy"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Photo grid */}
        {photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy/20 py-16 text-center text-navy/50">
            No photos in this gallery yet. Add some above.
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={photos.map((photo) => photo.src)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {photos.map((photo, index) => (
                  <SortablePhoto
                    key={photo.src}
                    photo={photo}
                    index={index}
                    total={photos.length}
                    onDelete={handleDelete}
                    onCaptionCommit={handleCaptionCommit}
                    onMoveToFront={moveToFront}
                    onMoveToBack={moveToBack}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>
    </div>
  );
}

function SaveIndicator({ state, error }: { state: SaveState; error: string | null }) {
  if (state === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-sm text-navy/60">
        <Loader2 className="h-4 w-4 animate-spin" /> Saving…
      </span>
    );
  }
  if (state === "saved") {
    return (
      <span className="flex items-center gap-1.5 text-sm text-green-700">
        <Check className="h-4 w-4" /> Saved
      </span>
    );
  }
  if (state === "error") {
    return (
      <span
        className="flex items-center gap-1.5 text-sm text-red-600"
        title={error ?? undefined}
      >
        <TriangleAlert className="h-4 w-4" /> Not saved
      </span>
    );
  }
  return null;
}
