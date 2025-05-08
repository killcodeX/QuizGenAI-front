// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken"; // You'll need to install jsonwebtoken

// export function middleware(req: NextRequest) {
//   console.log("Middleware triggered for path:", req.nextUrl.pathname);

//   // Check for either your custom token or the NextAuth session token
//   const token = req.cookies.get("token")?.value;
//   const nextAuthSession = req.cookies.get("next-auth.session-token")?.value;
//   const secureNextAuthSession = req.cookies.get(
//     "__Secure-next-auth.session-token"
//   )?.value;

//   console.log("NextAuth cookies:", {
//     regular: !!nextAuthSession,
//     secure: !!secureNextAuthSession,
//     token: !!token,
//   });

//   // If trying to access protected route
//   if (req.nextUrl.pathname.startsWith("/quiz")) {
//     // No auth - redirect to login
//     if (!token && !nextAuthSession && !secureNextAuthSession) {
//       console.log("No valid session found, redirecting to login");
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     // If there's a token, verify it
//     if (token) {
//       try {
//         verify(token, process.env.JWT_SECRET || "your-fallback-secret");
//       } catch (error) {
//         console.error("Invalid token:", error);
//         // Only redirect if there's no NextAuth session either
//         if (!nextAuthSession) {
//           return NextResponse.redirect(new URL("/login", req.url));
//         }
//       }
//     }
//   }

//   return NextResponse.next();
// }

// // Apply middleware only to protected routes
// export const config = {
//   matcher: ["/quiz/:path*", "/stats/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/quiz", "/stats"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = req.cookies.get("token")?.value;
    const nextAuthSession =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!token && !nextAuthSession) {
      console.log("Unauthorized access to", req.nextUrl.pathname);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token) {
      try {
        verify(token, process.env.JWT_SECRET!);
      } catch (error) {
        console.error("Invalid token for", req.nextUrl.pathname, ":", error);
        return NextResponse.redirect(
          new URL("/login?error=Invalid%20Token", req.url)
        );
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/quiz/:path*", "/stats/:path*"],
};
