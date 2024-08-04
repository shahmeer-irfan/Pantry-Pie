import { NextResponse, NextRequest } from "next/server";

// Middleware to check authentication status
export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token");

  // Check if the user is authenticated
  if (token) {
    return NextResponse.next();
  } else {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

// Define the paths to apply the middleware
export const config = {
  matcher: ["/main/:path*"], // Adjust the matcher to your protected paths
};
