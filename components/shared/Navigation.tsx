import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { classNames } from "@/lib/utils";
import NavLink from "@/components/shared/NavLink";

export default function Navigation() {
  const { data: session } = useSession();
  const navigationItems = [
    { name: "Pipelines", href: "/pipelines" },
    { name: "Connections", href: "/connections" },
    { name: "SQL Playground", href: "/playground" },
    { name: "SANDBOX", href: "/sandbox" },
  ];

  return (
    <header className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white">
      <div className="flex">
        <h1 className="text-xl font-bold">
          <Link href=".">Unify</Link>
        </h1>
      </div>
      <ul className="flex md:space-x-3">
        <li className="h-full">
          <NavLink
            href={"/"}
            exact={true}
            className={isActive =>
              classNames(
                isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium",
              )
            }
          >
            Home
          </NavLink>
        </li>
        {navigationItems.map(item => (
          <li className="h-full" key={item.href}>
            <NavLink
              href={item.href}
              className={isActive =>
                classNames(
                  isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium",
                )
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {session && (
        <div className="flex space-x-6">
          <button className="text-sm" disabled>
            {session?.user?.email}
          </button>
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-sm text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
      {!session && (
        <div className="flex space-x-6">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-sm text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            onClick={() => signIn()}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
}
