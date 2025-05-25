import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface JWTPayload {
  id: number;
  role: "ADMIN" | "USER";
  email_verified_at?: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value || null;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/customer/dashboard");

  if (token) {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      //user try access to admin dashboard
      if (isAdminRoute && decoded.role === "USER") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      // invailed token
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // user not logged and try access to dashboard
    if (isDashboardRoute || isAdminRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/customer/dashboard/:path*"],
};
