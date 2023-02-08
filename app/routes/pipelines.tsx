import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser, mydebug } from "~/utils";
import { getPipelineListItems } from "~/models/pipeline.server";
if (typeof document != "undefined") {
  import('tw-elements');
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const pipelineListItems = await getPipelineListItems({ userId });
  const api_res = await fetch("http://127.0.0.1:5000/v1/schemas?deep=1");

  const schemas = await api_res.json()
  return json({ pipelineListItems, schemas });
}

export default function PipelinesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Pipelines</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex flex-col h-full bg-white">
        <div className="w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Pipeline
          </Link>

          <hr />
        </div>
        <div className="flex">
          <div>
            <div className="dropdown relative">
              <a
                className="dropdown-toggle px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase
                  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg active:text-white
                  transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                href="#"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pick pipeline ↓
              </a>
              <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg
                  shadow-lg mt-1 hidden m-0 bg-clip-padding border-none ">
                {data.pipelineListItems.map((pipeline) => (
                  <li key={pipeline.id}>
                    <NavLink
                      className="
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
                      📝 {pipeline.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
