import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "unify-credentials",
      name: "email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "yourname@gmail.com" }
        // password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: any) { // todo: fix typings, Pick<RequestInternal, "body" | "query" | "headers" | "method">
        /*
        const res = await fetch("https://mocki.io/v1/aff0eb4c-8fa4-471a-a615-83aae911e1ce", { // fixme: fake auth endpoint
          method: "POST", // fixme: change back to POST
          body: JSON.stringify(credentials), fixme: encrypt password?
          headers: { "Content-Type": "application/json" }
        });
        const user = await res.json();
        */
        const res ={ ok: true };
        const user = { id: "0", email: credentials.email };

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ]
};

export default NextAuth(authOptions);
