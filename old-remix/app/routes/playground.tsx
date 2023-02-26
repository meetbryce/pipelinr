import Navigation from "~/components/Navigation";
import * as React from "react";
import { useRef } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import { Form, useActionData, useSubmit } from "@remix-run/react";

import { useUser } from "~/utils";
import { PlayIcon } from "@heroicons/react/24/outline";
import type { editor } from "monaco-editor";
import { type ActionArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { runPlaygroundQuery } from "~/models/playground.server";
import SmartTable from "~/components/SmartTable";


export async function action({ request }: ActionArgs) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const query = formData.get("query") as string;

  // todo: validation & safety checks with invariant() etc
  // todo: error handling (incl. passing it back to the user)

  const result = await runPlaygroundQuery(query);

  const comparator = () => 0;

  let rowData, columnDefs;

  // parse so we return rowData & columnDefs instead
  if (result.data.length > 0) {
    let cols: { field: string, comparator: any }[] = [];
    Object.keys(result.data[0]).map((col) => {
      cols.push({ field: col, comparator });
    });
    columnDefs = cols;
    rowData = result.data;
  }

  return { result, rowData, columnDefs };
}


export default function PlaygroundPage() {
  const user = useUser();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const editorOptions = {
    fontSize: 15,
    fontLigatures: true,
    minimap: { enabled: false }
  };
  let submit = useSubmit();
  const actionData = useActionData<typeof action>();

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let query = editorRef?.current?.getValue();
    if (!query) return;

    let $form = event.currentTarget; // grab the form element
    let formData = new FormData($form); // get the formData from that form
    formData.set("query", query); // add the query to formData

    submit(formData, { method: "post" });
  }

  return (
    <div className="flex h-screen flex-col">
      <Navigation user={user} />
      <main className="flex flex-col h-full bg-white p-6">
        <div className="-mx-5">
          <Editor
            height="50vh"
            defaultLanguage="sql"
            defaultValue="-- Write your Unify SQL query here
select id, number, title, base_repo_name from tenant_default.github____org_pulls limit 1"
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <Form onSubmit={handleSubmit} method="post">
              <input type="hidden" name="query" />
              <button
                type="submit"
                className="group inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-green-50 hover:text-green-800 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition duration-50 ease-in-out"
              >
                <PlayIcon className="-ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-green-800"
                          aria-hidden="true" />
                <span>Run Query</span>
              </button>
            </Form>
          </div>
        </div>
        <div className="mt-4 h-full">
          {actionData && <SmartTable
            entity={{}}
            reloadData={() => console.log("reloading...")}
            columnDefs={actionData.columnDefs}
            rowData={actionData.rowData}
          />}
        </div>
      </main>
    </div>
  );
}