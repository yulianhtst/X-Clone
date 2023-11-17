import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const token = req.cookies.get("loggedUser")?.value || "";

  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/explore", req.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/explore",
    "/notifications",
    "/messages",
    "/lists",
    "/bookmarks",
    "/communities",
    "/premium",
    "/profile",
    "/more",
    "/about",
  ],
};
