import { NextResponse, type NextRequest } from "next/server";

function isAuthenticated(request: NextRequest) {
  const cookies = request.cookies.getAll();

  return cookies.some((cookie) => cookie.name.includes("auth-token"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = isAuthenticated(request);

  const isPublicPage = pathname === "/";
  const isAuthPage = pathname === "/login";

  const isProtectedPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/documents");

  if (!isLoggedIn && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && (isAuthPage || isPublicPage)) {
    return NextResponse.redirect(new URL("/documents", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/documents/:path*"],
};
