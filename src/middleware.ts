import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  if (!token) return NextResponse.redirect(new URL("/signin", url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/channel/:path*", "/studio/:path*"],
};
