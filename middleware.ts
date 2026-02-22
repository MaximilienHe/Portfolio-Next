import { NextRequest, NextResponse } from "next/server";
import { CANONICAL_HOST, CANONICAL_PROTOCOL } from "./src/lib/seo";

function isLocalHost(hostname: string): boolean {
  return hostname.includes("localhost") || hostname.startsWith("127.");
}

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost ?? request.headers.get("host") ?? nextUrl.host)
    .split(",")[0]
    .trim()
    .toLowerCase();

  const protoHeader = request.headers.get("x-forwarded-proto");
  const protocol = (protoHeader ?? nextUrl.protocol.replace(":", "")).toLowerCase();

  if (isLocalHost(host)) {
    return NextResponse.next();
  }

  const isManagedHost = host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;
  if (!isManagedHost) {
    return NextResponse.next();
  }

  const needsHostRedirect = host !== CANONICAL_HOST;
  const needsProtocolRedirect = protocol !== CANONICAL_PROTOCOL;

  if (!needsHostRedirect && !needsProtocolRedirect) {
    return NextResponse.next();
  }

  nextUrl.protocol = `${CANONICAL_PROTOCOL}:`;
  nextUrl.host = CANONICAL_HOST;

  return NextResponse.redirect(nextUrl, 301);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
