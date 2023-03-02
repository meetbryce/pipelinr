import Link from "next/link";
import { signIn } from "next-auth/react";
import Layout from "@/components/layout";
import React from "react";

export default function AuthenticationRequired() {
  return (
    <Layout>
      <div className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-600">Access Denied</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Authentication Required</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, you need to be logged in to access this page.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span aria-hidden="true">&larr;</span>&nbsp;&nbsp;Go back home
            </Link>
            <button
              onClick={() => signIn()}
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
