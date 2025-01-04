import { NextRequest, NextResponse } from 'next/server';

// Public routes that should not be protected
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  // Get the current path
  const path = req.nextUrl.pathname;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(path);

  // Access the token from cookies
  const token = req.cookies.get('token')?.value;

  // Log details for debugging
  console.log('Current Path:', path);
  console.log('Is Public Route:', isPublicRoute);
  console.log('Token in cookies:', token);

  // Redirect to /login if the route is not public and the user is not authenticated
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to /system/fnb if the user is authenticated and on a public route
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/system/fnb', req.nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Exclude static files and other resources from middleware processing
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
