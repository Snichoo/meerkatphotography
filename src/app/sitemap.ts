import type { MetadataRoute } from "next";
import { locations } from "@/lib/locations";
import { absoluteUrl } from "@/lib/seo";
import { servicesPageItems } from "@/lib/services-page";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/locations"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about-me"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact-us"), lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesPageItems.map((service) => ({
    url: absoluteUrl(service.href),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(service.image)],
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: absoluteUrl(`/locations/${location.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes];
}
