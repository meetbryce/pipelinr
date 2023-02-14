import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Square3Stack3DIcon as PipelineIcon,
  PlusIcon
} from "@heroicons/react/24/outline";


import { requireUserId } from "~/session.server";
import { useUser /*mydebug*/ } from "~/utils";
import { getPipelineListItems } from "~/models/pipeline.server";
import * as React from "react";

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
  const user = useUser();

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
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 mr-1 md:mr-2 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span
                className="mr-1 text-sm font-medium text-gray-500">FIXME: name of pipeline here</span>
            </div>
          </li>
        </ol>
      </nav>

      <main className="flex flex-col h-full bg-white">
        <div className="w-80 border-r bg-gray-50">
        </div>
        <div className="flex px-6 space-x-1 md:space-x-3">
          {data.pipelineListItems.length !== 0 && (
            // todo: hide when on the index page
            <div className="dropdown relative">
              <button
                className="dropdown-toggle px-4 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight
                  rounded shadow-sm hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg active:text-white
                  transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select pipeline
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              </button>
              <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg
                  shadow-lg mt-1 hidden m-0 bg-clip-padding border-none ">
                {data.pipelineListItems.map((pipeline) => (
                  <li key={pipeline.id}>
                    <NavLink
                      className="
                      flex
                      dropdown-item
                      text-sm
                      py-2
                      px-4
                      font-normal
                      block
                      w-full
                      whitespace-nowrap
                      bg-transparent
                      text-gray-700
                      hover:bg-gray-100
                      "
                      to={pipeline.id}
                    >
                      <PipelineIcon className="w-4 h-4 mt-0.5 mr-2" />
                      {pipeline.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    className="
                    flex
                    dropdown-item
                    text-sm
                    py-2
                    px-4
                    font-normal
                    block
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-700
                    hover:bg-gray-100
                  "
                    to="new"
                  >
                    <PlusIcon className="w-4 h-4 mt-0.5 mr-2" />
                    New pipeline
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {data.pipelineListItems.length === 0 && (
            <Link
              to="new"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PipelineIcon className="mx-auto h-10 w-10 text-gray-400" />
              <span className="mt-2 font-medium text-gray-900">Create a new Pipeline</span>
            </Link>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
