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
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === "production" ? "__Secure-" : ""
      }next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Don't set a custom domain for vercel.app domains
        // The default behavior will work correctly
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Send to your backend immediately after successful Google sign-in
        const res = await fetch(`${process.env.URL}/auth/google-auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            googleId: user.id || account?.providerAccountId,
          }),
        });

        const data = await res.json();

        console.log("this is callback signin data --->", data);

        if (!res.ok) {
          // Attach error info to the error URL
          throw new Error(data.message || "Authentication failed");
        }
        // console.log("this is login auth", data);
        // Store the backend token in the user object to access it later
        user.backendToken = data.token;
        user.id = data.user.id; // Add this line to set the correct ID
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
      console.log("*********************************");
      console.log("Redirect called with URL:", url);
      console.log("*********************************");

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
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};
