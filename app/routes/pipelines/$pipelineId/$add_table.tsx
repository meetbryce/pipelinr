import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useParams } from "@remix-run/react";
import * as React from "react";

import { requireUserId } from "~/session.server";
import { addTableToPipeline } from "~/models/pipeline.server";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const table = formData.get("table");
  const pipelineId = formData.get("pipelineId");

  if (typeof table !== "string" || table.length === 0) {
    return json(
      { errors: { name: "table is required" } },
      { status: 400 }
    );
  }
  if (typeof pipelineId !== "string" || pipelineId.length === 0) {
    return json(
      { errors: { name: "pipelineId is required" } },
      { status: 400 }
    );
  }

  const pipeline = await addTableToPipeline({ id: pipelineId, table, userId });

  return redirect(`/pipelines/${pipelineId}`);
}

export default function AddTableToPipelinePage() {
  const actionData = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const params = useParams();
  const table = params.add_table;
  const pipelineId = params.pipelineId;

  React.useEffect(() => {
    document.getElementById('open_button')?.click();
  });

  return (
    <div>
        <button type="button" id="open_button" className="hidden transition duration-150
            ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add table
        </button>

        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog relative w-auto pointer-events-none">
            <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div
                  className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Add a dataset</h5>
                  <button type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body relative p-4">
                  Add {table} to the pipeline?
              </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <Form method="post">
                      <input
                        value={table}
                        name="table"
                        type="hidden"
                      />
                      <input value={pipelineId} name="pipelineId" type="hidden" />
                      <button type="button" className="px-6
                        py-2.5
                        bg-purple-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-purple-700 hover:shadow-lg
                        focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-purple-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out" data-bs-dismiss="modal">Cancel
                      </button>
                      <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                        ml-1">Yes
                      </button>
                    </Form>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}
