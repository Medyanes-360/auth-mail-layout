import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // Eğer auth sayfalarına erişiliyorsa ve kullanıcı giriş yapmışsa, ana sayfaya yönlendir
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Eğer dashboard'a erişilmeye çalışılıyorsa ve kullanıcı admin değilse, ana sayfaya yönlendir
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    (!token || token.role !== "ADMIN")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Eğer user sayfasına erişilmeye çalışılıyorsa ve kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (request.nextUrl.pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*", "/login", "/register"],
};
