import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Protects dashboard and API routes, but explicitly ignores authentication and static assets
  matcher: [
    "/dashboard/:path*",
    "/api/((?!auth|register).*)", // Protects all API routes except auth and register
  ],
};
