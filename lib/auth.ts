// src/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, profile, account }) {
      // Chỉ set khi login bằng Google lần đầu / refresh provider data
      if (account?.provider === "google" && profile) {
        token.name = profile.name;
        token.email = profile.email;
        // token.picture = profile.picture;
        token.provider = "google";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string | null | undefined;
        session.user.email = token.email as string | null | undefined;
        session.user.image = token.picture as string | null | undefined;
      }

      return session;
    },
  },

//   trustHost: true,
});