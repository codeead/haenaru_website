import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Defense-in-depth for /admin: Cloudflare Access is the primary gate (allowlisted
 * emails), this just verifies Access has injected its JWT before the request
 * reaches the app. The app never validates the JWT signature itself — Access
 * already did that at the edge.
 */
export function middleware(request: NextRequest) {
  if (!request.headers.has("Cf-Access-Jwt-Assertion")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
