import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*", "/api/v1/admin/:path*"],
};
