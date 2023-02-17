import { Form, Link, NavLink } from "@remix-run/react";
import * as React from "react";
import type { User } from "@prisma/client";
import { classNames } from "~/utils";

export default function Navigation({ user }: { user: User }) {
  const navigationItems = [
    { name: "Pipelines", href: "/pipelines" },
    { name: "Playground", href: "/playground" },
    { name: "Connections", href: "/connections" }
  ];

  return (
    <header className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white">
      <div className="flex">
        <h1 className="text-xl font-bold">
          <Link to=".">Unify</Link>
        </h1>
      </div>
      <ul className="flex md:space-x-3">
        {navigationItems.map(item =>
          <li className="h-full" key={item.href}>
            <NavLink to={item.href}
                     className={({ isActive }) => classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium")}>{item.name}</NavLink>
          </li>
        )}
      </ul>
      <div className="flex space-x-6">
        <button className="text-sm" disabled>{user.email}</button>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 text-sm hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </div>
    </header>
  );
}