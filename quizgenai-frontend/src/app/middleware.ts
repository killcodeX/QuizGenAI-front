import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Read JWT from cookies

  // If token is missing, redirect to login
  if (!token && req.nextUrl.pathname.startsWith("/quiz")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/quiz/:path*", "/stats/:path*"],
};
