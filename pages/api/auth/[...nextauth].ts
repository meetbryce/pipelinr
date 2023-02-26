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
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "yourname@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) { // todo: fix typings
        const res = await fetch("https://mocki.io/v1/aff0eb4c-8fa4-471a-a615-83aae911e1ce", { // fixme: fake auth endpoint
          method: "GET", // fixme: change back to POST
          // body: JSON.stringify(credentials), fixme: uncomment
          headers: { "Content-Type": "application/json" }
        });
        const user = await res.json();

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
