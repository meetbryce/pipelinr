import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, Link, Outlet } from "@remix-run/react";
import invariant from "tiny-invariant";
import * as React from "react";

import { deletePipeline, getPipeline, getPipeTables, queryData } from "~/models/pipeline.server";
import { requireUserId } from "~/session.server";
import { AgGridReact } from 'ag-grid-react';

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.pipelineId, "pipelineId not found");

  const pipeline = await getPipeline({ userId, id: params.pipelineId });
  if (!pipeline) {
    throw new Response("Not Found", { status: 404 });
  }

  const api_res = await fetch("http://127.0.0.1:5000/v1/schemas?deep=1");
  const schemas = await api_res.json();
  let tables = getPipeTables(pipeline.tables);
  let querydata = [];
  if (tables.length > 0) {
    debugger;
    querydata = await queryData({ userId, id: params.pipelineId });
  }

  return json({ pipeline, schemas, querydata });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.pipelineId, "pipelineId not found");

  await deletePipeline({ userId, id: params.pipelineId });

  return redirect("/pipelines");
}

export default function PipelineDetailsPage() {
  const data = useLoaderData<typeof loader>();
  let [rowData] = React.useState([]);
  const defaultColDef = {
    sortable: true,
    resizable: true
  };

  let [columnDefs] = React.useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ]);

  if (data.querydata.length > 0) {
    let cols: {field: string}[] = [];
    Object.keys(data.querydata[0]).map((col) => {
      cols.push({field: col});
    });
    [columnDefs] = React.useState(cols);

    [rowData] = React.useState(data.querydata);
  }

  return (
    <div className="flex flex-row h-full">
      <div>
      <h2>Datasets</h2>
          {data.schemas.length === 0 ? (
            <p className="p-4">No schemas defined yet</p>
          ) : (
            <table className="table-auto">
              <tbody>
                {data.schemas.map((schema: object) => (
                    schema.tables.map((table) => {
                     const qual = schema.schema + '.' + table;
                     return (
                        
                        <tr key={qual} className="even:bg-slate-50">
                          <td>{schema.schema}</td>
                          <td><Link to={qual} className="text-blue-500">{table}</Link></td>
                        </tr>
                      )
                    })
                ))}
              </tbody>
            </table>
          )}

      </div>
      <div className="border-solid border-2 overflow-auto h-screen">
        <p className="bg-slate-50"><span className="text-2xl font-bold">{data.pipeline.name}</span><span>&nbsp;&nbsp;&nbsp;tables: {data.pipeline.tables}</span></p>
        <div className="ag-theme-alpine" style={{height: 500, width: 1200}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}>
            </AgGridReact>
        </div>      
          <hr className="my-4" />
          <Form method="post">
            <button
              type="submit"
              className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Delete
            </button>
          </Form>
        </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Pipeline not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
