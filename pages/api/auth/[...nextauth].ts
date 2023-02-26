import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "yourname@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) { // todo: fix typings
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either an object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
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
