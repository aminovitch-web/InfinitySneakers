import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  CUSTOMER_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): Response | void => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isSwaggerRoute = pathname === "/api-doc";
  // Handle Swagger route based on environment and authentication status
  if (isSwaggerRoute) {
    if (process.env.NODE_ENV === "development" && isLoggedIn) {
      return; // Allow access to Swagger route in development
    }
    if (process.env.NODE_ENV !== "development") {
      return Response.redirect(new URL("/login", nextUrl)); // Redirect if not logged in
    }
  }

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith("/api/");

  // Handle API routes
  if (isApiRoute) {
    return;
  }

  // Handle API authentication routes
  if (isApiAuthRoute) {
    return;
  }

  // Handle authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(CUSTOMER_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Handle shop and category routes
  if (pathname.startsWith("/shop") || pathname.startsWith("/category")) {
    return;
  }

  // Redirect if not logged in and not a public route
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
