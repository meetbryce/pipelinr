import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, Link, Outlet, useRevalidator } from "@remix-run/react";
import invariant from "tiny-invariant";
import * as React from "react";

import { ClientPipeline } from "~/utils";
import { deletePipeline, getPipeline, getPipeTables, queryData } from "~/models/pipeline.server";
import { requireUserId } from "~/session.server";

// AG GRID
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { ColumnEvent, GridColumnsChangedEvent } from "ag-grid-community";

type Schema = {
  schema: string,
  tables: string[]
}

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.pipelineId, "pipelineId not found");

  const pipeline = await getPipeline({ userId, id: params.pipelineId });
  if (!pipeline) {
    throw new Response("Not Found", { status: 404 });
  }

  const api_res = await fetch("http://127.0.0.1:5000/v1/schemas?deep=1");
  const schemas: Schema[] = await api_res.json();
  return json({ pipeline, schemas });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.pipelineId, "pipelineId not found");

  await deletePipeline({ userId, id: params.pipelineId });

  return redirect("/pipelines");
}

export default function PipelineDetailsPage() {
  let revalidator = useRevalidator();
  const data = useLoaderData<typeof loader>();
  let [rowData, setRowData] = React.useState<object[]>([]);
  const defaultColDef = {
    sortable: true,
    resizable: true
  };
  const pipeline = new ClientPipeline(
    data.pipeline.id,
    data.pipeline.name,
    data.pipeline.tables,
    [],
    undefined, 0);

  let [columnDefs, setColumnDefs] = React.useState([
    { field: "id" },
    { field: "node_id" },
    { field: "name" }
  ]);

  const reloadData = () => {
    let url = pipeline.getServerUrl();
    if (!url) return;
    console.log(pipeline.query);

    fetch(url).then(response => response.json()).then(processResponse);

    function processResponse(res: { data: object[], errors?: object }) {
      let zerocomp = () => 0;
      if (res.data.length > 0) {
        let cols: { field: string, comparator: any }[] = [];
        Object.keys(res.data[0]).map((col) => {
          cols.push({ field: col, comparator: zerocomp });
        });
        setColumnDefs(cols);
        setRowData(res.data);
      }
    }
  };

  const handleColSort = (event: ColumnEvent) => {
    console.log(event);
    if (!event.column) return;
    let dir = event.column.getSort();
    let desc: number = 0;
    let sort_col = event.column.getColId();
    let reload = false;
    if (dir == null && pipeline.sort_col != null) {
      pipeline.sort_col = "";
      console.log("removing sort from ", sort_col);
      return false;
    }
    if (dir == "desc") {
      desc = 1;
    }
    if (pipeline.sort_col != sort_col) {
      pipeline.sort_col = sort_col;
      reload = true;
    }
    if (pipeline.sort_desc != desc) {
      pipeline.sort_desc = desc;
      reload = true;
    }
    if (reload) {
      console.log("new sort ", sort_col, " desc:", desc);
      setTimeout(reloadData, 0);
    }
    return false;
  };

  const onGridReady = (params: GridColumnsChangedEvent) => {
    let cols = params.columnApi.getColumns();
    if (!cols) return;
    cols.map(col => {
      col.addEventListener("sortChanged", handleColSort);
    });
  };

  React.useEffect(() => {
    reloadData();
  }, [pipeline.getServerUrl()]);

  return (
    <div className="flex flex-row h-full">
      <div className="pr-4">
        <h2 className="font-medium">Datasets</h2>
        <hr className="mt-1 mb-2" />
        {data.schemas.length === 0 ? (
          <p className="p-2">No schemas defined yet</p>
        ) : (
          <table className="table-auto">
            <tbody>
            {data.schemas.map((schema: Schema) => (
              schema.tables.map((table) => {
                const qual = schema.schema + "." + table;
                return (

                  <tr key={qual} className="p-2 even:bg-slate-50">
                    <td className={"pl-2 py-2"}>{schema.schema}</td>
                    <td className={"px-2 py-2"}><Link to={qual} className="text-blue-500">{table}</Link></td>
                  </tr>
                );
              })
            ))}
            </tbody>
          </table>
        )}

      </div>
      <div className="overflow-auto w-full">
        <div className="pb-3 -ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg font-medium leading-6 text-gray-900">{data.pipeline.name}</h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">Tables: {data.pipeline.tables}</p>
        </div>
        <div className="ag-theme-alpine" style={{ height: "calc(100vh - 330px)", width: "auto" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridColumnsChanged={onGridReady}
          >
          </AgGridReact>
        </div>
        <Form method="post" className="my-4 text-right">
          <button
            type="submit"
            className="rounded bg-red-600 text-sm py-2 px-4 text-white hover:bg-red-700 focus:bg-red-400"
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

/*

Unfortunately this code does not work

  // Create an AG data source to fetch data directly from CH
  const createDatasource = function(pipeline: ClientPipeline) {
    return {
        // called by the grid when more rows are required
        getRows: params => {
            // get data for request from server
            fetch(pipeline.getServerUrl())
              .then(response => response.json())
              .then(res => {
                console.log(res);
                if (res.data.length > 0) {
                  let cols: {field: string}[] = [];
                  Object.keys(res.data[0]).map((col) => {
                    cols.push({field: col});
                  });
                  setColumnDefs(cols);     
                }
                params.successCallback({
                  rowData: res.data
                })
              }).catch(err => {
                console.log(err);
                params.failCalback(err)
              });
        }
    };
  }
*/