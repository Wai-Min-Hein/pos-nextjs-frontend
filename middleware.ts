import { NextRequest, NextResponse } from "next/server";

// Public routes that should not be protected
const publicRoutes = ["/login", "/register"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;


  // Check if the route is public
  const isPublicRoute = publicRoutes.includes(path);

  let token = req.cookies.get("accessToken")?.value;


  //   Redirect based on authentication
  // if (!isPublicRoute && !token) {
  //   return NextResponse.redirect(new URL("/login", req.nextUrl));
  // }
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/system/fnb", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image).*)", // Exclude api and static resources
    "/login",
    "/register",
  ],
};
