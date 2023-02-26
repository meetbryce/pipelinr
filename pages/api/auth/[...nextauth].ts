import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider, { CredentialInput, CredentialsConfig } from "next-auth/providers/credentials";


interface C {
  username: string,
  password: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "yourname@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) { // todo: fix typings
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
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
