import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  Square3Stack3DIcon as PipelineIcon
} from "@heroicons/react/24/outline";


import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getPipelineListItems } from "~/models/pipeline.server";
import * as React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

if (typeof document != "undefined") {
  import("tw-elements" as any);
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const pipelineListItems = await getPipelineListItems({ userId });
  const api_res = await fetch("http://127.0.0.1:5000/v1/schemas?deep=1");

  const schemas = await api_res.json();
  return json({ pipelineListItems, schemas });
}

export default function PipelinesPage() {
  const data = useLoaderData<typeof loader>();
  const { pipelineListItems } = data;
  const user = useUser();

  const inactiveClasses = "flex text-gray-700 hover:bg-gray-100";
  const activeClasses = "flex bg-gray-200 text-gray-900";

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white">
        <h1 className="text-xl font-bold">
          <Link to=".">Pipelines</Link>
        </h1>
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

      <nav className="flex px-6 py-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li>
            <div className="flex items-center">
              <Link to="."
                    className="text-sm font-medium text-gray-500 hover:text-blue-600">Pipelines</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 mr-1 md:mr-2 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Select pipeline {/* fixme: show the name of the current pipeline if viewing a pipeline */}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {pipelineListItems.map((pipeline) => (
                        <NavLink
                          to={`/pipelines/${pipeline.id}`}
                          className={({ isActive }) => isActive ? activeClasses : inactiveClasses}
                        >
                          <Menu.Item as="div" className="flex w-full px-4 py-2 text-sm">
                            <PipelineIcon className="w-4 h-4 mt-0.5 mr-2" />
                            {pipeline.name}
                          </Menu.Item>
                        </NavLink>
                      ))}
                      <NavLink
                        to="/pipelines/new" end
                        className={({ isActive }) => isActive ? activeClasses : inactiveClasses}
                      >
                        <Menu.Item as="div" className="flex w-full px-4 py-2 text-sm">
                          <PlusIcon className="w-4 h-4 mt-0.5 mr-2" />
                          New pipeline
                        </Menu.Item>
                      </NavLink>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        </ol>
      </nav>

      <main className="flex flex-col h-full bg-white">
        {pipelineListItems.length === 0 && (
          <div className="flex px-6 space-x-1 md:space-x-3">
            <Link
              to="new"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PipelineIcon className="mx-auto h-10 w-10 text-gray-400" />
              <span className="mt-2 font-medium text-gray-900">Create a new Pipeline</span>
            </Link>
          </div>
        )}

        <div className="flex-1 px-6 py-4">
          <Outlet context={{ pipelineListItems }} />
        </div>
      </main>
    </div>
  );
}
