import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/studio/auth";

export const runtime = "nodejs";

// Issues short-lived tokens so the browser can upload image files straight to
// Vercel Blob. This avoids the serverless request-body size limit and supports
// large photos. Only a logged-in Studio session can obtain a token.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAuthenticated())) {
          throw new Error("Not authorized.");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "image/gif",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 30 * 1024 * 1024, // 30 MB per photo
        };
      },
      // Fires as a server-to-server callback in production. We register photo
      // metadata from the authenticated client instead, so this is a no-op.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 },
    );
  }
}
