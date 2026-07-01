// Small shared helpers for the Studio API routes.
import { servicesPageItems } from "@/lib/services-page";

export const serviceMeta = servicesPageItems.map(({ id, title }) => ({ id, title }));

const titleById = new Map(serviceMeta.map((service) => [service.id, service.title]));

export function isValidServiceId(id: unknown): id is string {
  return typeof id === "string" && titleById.has(id);
}

export function serviceTitle(id: string): string {
  return titleById.get(id) ?? id;
}

/** Turn an uploaded file name into a friendly caption, e.g. "beach_01.webp" -> "Beach 01". */
export function captionFromFileName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  const caption = base
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
  return caption || "Untitled";
}

export function buildAlt(serviceId: string, caption: string): string {
  return `${serviceTitle(serviceId)} gallery photo - ${caption}`;
}
