import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!adminEmail) return false;
      return (user.email ?? "").toLowerCase().trim() === adminEmail;
    },
    async session({ session }) {
      return session;
    },
  },
});
