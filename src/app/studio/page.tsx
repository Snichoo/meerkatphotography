import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/studio/auth";
import { isBlobConfigured, readGalleries } from "@/lib/studio/galleries-store";
import { serviceMeta } from "@/lib/studio/service-meta";
import { StudioApp } from "./StudioApp";
import { StudioLogin } from "./StudioLogin";

export const metadata: Metadata = {
  title: "Studio",
  // Keep the hidden admin out of search engines.
  robots: { index: false, follow: false, nocache: true },
};

// Always render fresh — this page reads the session cookie and live photo data.
export const dynamic = "force-dynamic";

export default async function StudioPage() {
  if (!(await isAuthenticated())) {
    return <StudioLogin />;
  }

  const galleries = await readGalleries();

  return (
    <StudioApp
      services={serviceMeta}
      initialGalleries={galleries}
      storageReady={isBlobConfigured()}
    />
  );
}
