/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/search",
  "/new-verification",
  "/cart",
  "/contact",
  "/shop",
  "/order-succes",
  "/category"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /setings
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth-error",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The customer redirect path after logged in
 * @type {string}
 */
export const CUSTOMER_LOGIN_REDIRECT = "/";

/**
 * The admin redirect path after logged in
 * @type {string}
 */
export const ADMIN_LOGIN_REDIRECT = "/dashboard";
