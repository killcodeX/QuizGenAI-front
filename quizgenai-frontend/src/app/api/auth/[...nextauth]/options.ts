import { DefaultSession, NextAuthOptions, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id?: string;
      backendToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    backendToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Send to your backend immediately after successful Google sign-in
        const res = await fetch("http://localhost:8000/auth/google-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            googleId: user.id || account?.providerAccountId,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Attach error info to the error URL
          throw new Error(data.message || "Authentication failed");
        }

        // Store the backend token in the user object to access it later
        user.backendToken = data.token;
        return true;
      } catch (error: any) {
        // Return a special error string that we'll parse in our custom error page
        return `/login?error=${encodeURIComponent(
          error.message || "Authentication failed"
        )}`;
      }
    },
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          id: user.id,
          backendToken: user.backendToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.backendToken = token.backendToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect called with URL:", url);

      // Handle error redirects
      if (url.startsWith(`${baseUrl}/login?error=`)) {
        return url;
      }

      // If the URL is already pointing to /quiz, let it proceed
      if (url.includes("/quiz")) {
        return url;
      }

      // For login, register, or base URL, redirect to quiz
      if (
        url === baseUrl ||
        url === `${baseUrl}/login` ||
        url === `${baseUrl}/register`
      ) {
        return `${baseUrl}/quiz`;
      }

      // Default cases
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error", // Keep this for system errors
  },
};
