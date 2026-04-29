import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isAuthenticated(request: NextRequest) {
  const accessToken = request.cookies.get("sb-access-token");
  const refreshToken = request.cookies.get("sb-refresh-token");

  return !!(accessToken || refreshToken);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = isAuthenticated(request);

  // route groups
  const isAuthPage = pathname.startsWith("/");
  const isProtectedPage = pathname.startsWith("/dashboard");

  // 1. user belum login → akses protected
  if (!isLoggedIn && isProtectedPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. user sudah login → akses login page
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
