import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/signin", url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-channel", "/dashboard/:path*"],
};
