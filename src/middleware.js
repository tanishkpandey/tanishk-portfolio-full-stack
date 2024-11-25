import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("userToken"); 

  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/admin-panel")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/admin-panel", req.url));
  }

  return NextResponse.next(); 
}
