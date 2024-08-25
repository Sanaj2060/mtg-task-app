// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"], // Adjust this to the pages you want to protect
    matcher: ["/:path*", "/profile/:path*"],
};