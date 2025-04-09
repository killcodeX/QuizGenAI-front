import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken"; // You'll need to install jsonwebtoken

export function middleware(req: NextRequest) {
  console.log("Middleware triggered for path:", req.nextUrl.pathname);

  // Check for either your custom token or the NextAuth session token
  const token = req.cookies.get("token")?.value;
  const nextAuthSession = req.cookies.get("next-auth.session-token")?.value;

  console.log("Token present:", !!token);
  console.log("NextAuth session present:", !!nextAuthSession);

  // If trying to access protected route
  if (req.nextUrl.pathname.startsWith("/quiz")) {
    // No auth - redirect to login
    if (!token && !nextAuthSession) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If there's a token, verify it
    if (token) {
      try {
        verify(token, process.env.JWT_SECRET || "your-fallback-secret");
      } catch (error) {
        console.error("Invalid token:", error);
        // Only redirect if there's no NextAuth session either
        if (!nextAuthSession) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    }
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/quiz/:path*", "/stats/:path*"],
};
