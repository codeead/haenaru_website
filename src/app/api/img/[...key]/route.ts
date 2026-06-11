import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ key: string[] }>;
};

/**
 * Public read-only proxy for R2 work-photo derivatives (`works/{workId}/{photoId}_full|thumb.jpg`).
 * Originals are never served here — only resized full/thumb images uploaded by the admin pipeline.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { key } = await params;
  const { env } = await getCloudflareContext({ async: true });

  const object = await env.BUCKET.get(key.join("/"));
  if (!object) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(object.body as ReadableStream, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
