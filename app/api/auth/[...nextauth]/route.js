import {
  createNewData,
  getDataByMany,
  updateData,
} from "@/servers/serviceOperations";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const users = await getDataByMany("user", {
            email: credentials.email.toLowerCase(),
            provider: "credentials",
          });

          if (!users || users.length === 0) {
            return null;
          }

          const user = users[0];
          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            provider: "credentials",
            role: user.role || "USER",
          };
        } catch (error) {
          console.error("Giriş hatası:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const existingUser = await getDataByMany("user", {
            email: profile.email.toLowerCase(),
          });

          if (existingUser && existingUser.length > 0) {
            await updateData("user", existingUser[0].id, {
              provider: "google",
              providerAccountId: profile.sub,
            });
            user.id = existingUser[0].id;
            user.role = existingUser[0].role;
            user.provider = "google";
            return true;
          }

          const name = profile.name.toLowerCase();
          const email = profile.email.toLowerCase();

          const newUser = await createNewData("user", {
            name: name,
            email: email,
            provider: "google",
            providerAccountId: profile.sub,
            role: "USER",
          });

          if (newUser.error) {
            return false;
          }

          user.id = newUser.id;
          user.role = "USER";
          user.provider = "google";
          return true;
        } catch (error) {
          console.error("Google girişi hatası:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
