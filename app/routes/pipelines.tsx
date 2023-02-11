import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser, /*mydebug*/ } from "~/utils";
import { getPipelineListItems } from "~/models/pipeline.server";

if (typeof document != "undefined") {
  import("tw-elements" as any)
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
          <button disabled>{user.email}</button>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </div>
      </header>

      <nav className="flex px-6 py-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <div className="flex items-center">
              <Link to="."
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">Pipelines</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 mr-1 md:mr-2 text-gray-400" fill="currentColor"
                   viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"></path>
              </svg>
              <span
                className="mr-1 text-sm font-medium text-gray-500 dark:text-gray-400">FIXME: name of pipeline here</span>
            </div>
          </li>
        </ol>
      </nav>

      <main className="flex flex-col h-full bg-white">
        <div className="w-80 border-r bg-gray-50">
        </div>
        <div className="flex px-6 space-x-1 md:space-x-3">
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
              <svg fill="none" className="w-5 h-5 ml-2" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
              </svg>
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
                    <svg fill="none" className="w-4 h-4 mt-0.5 mr-2" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                    </svg>
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
                  <svg fill="none" className="w-4 h-4 mt-0.5 mr-2" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  New pipeline
                </NavLink>
              </li>
            </ul>
          </div>
          {data.pipelineListItems.length == 0 && (
            <Link to="new" className="px-4 py-2.5 text-white font-medium rounded bg-blue-600 text-sm hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out">
              + New Pipeline
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
