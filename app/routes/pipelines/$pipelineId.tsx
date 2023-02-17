import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useCatch, useLoaderData, useRevalidator } from "@remix-run/react";
import invariant from "tiny-invariant";
import * as React from "react";

import { ClientPipeline, unifyServer } from "~/utils";
import { deletePipeline, getPipeline } from "~/models/pipeline.server";
import { requireUserId } from "~/session.server";
import SmartTable from "~/components/SmartTable";
import { ColumnEvent } from "ag-grid-community";

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

  let unifyConfigRes = await fetch(unifyServer() + "/v1/dbconf");
  let unifyDbConfig = await unifyConfigRes.json();
  console.log(unifyDbConfig);

  let schemas: Schema[] = [];
  try {
    const api_res = await fetch(unifyServer() + "/v1/schemas?deep=1");
    if (api_res.ok) {
      schemas = await api_res.json();
    } else {
      throw Error("Unify fetch failed");
    }
  } catch (error) {
    console.log(error);
    schemas = [{"schema": error, "tables": []}];
  }
  return json({ pipeline, schemas, unifyDbConfig });
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
  const pipeline = new ClientPipeline(
    data.pipeline.id,
    data.pipeline.name,
    data.pipeline.tables,
    [],
    undefined, 0, data.unifyDbConfig);

  let [columnDefs, setColumnDefs] = React.useState([
    { field: "id" },
    { field: "node_id" },
    { field: "name" }
  ]);

  const reloadData = () => {
    let url = pipeline.getServerUrl();
    if (!url) return;

    fetch(url, {
      method: 'GET',
      headers: pipeline.getDbAuthHeaders()
    }).then(response => response.json()).then(processResponse);

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
        <div className="w-auto h-[calc(100vh-260px)]">
          <SmartTable
            columnDefs={columnDefs}
            handleColSort={handleColSort}
            rowData={rowData}
          />
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