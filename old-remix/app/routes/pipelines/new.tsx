import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createPipeline } from "~/models/pipeline.server";
import { requireUserId } from "~/session.server";
import { Square3Stack3DIcon as PipelineIcon } from "@heroicons/react/24/outline";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { name: "name is required" } },
      { status: 400 }
    );
  }

  const pipeline = await createPipeline({ name, userId });

  return redirect(`/pipelines/${pipeline.id}`);
}

export default function NewPipelinePage() {
  const actionData = useActionData<typeof action>();
  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  const inputColorClasses = actionData?.errors?.name ?
    "border-red-300 focus:border-red-500 focus:ring-red-500 focus-visible:outline-red-500 placeholder-red-400" :
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

  return (
    <Form
      method="post"
      className="mx-auto max-w-xl mt-10"
    >
      <div>
        <div className="text-center">
          <PipelineIcon className="mx-auto h-10 w-10 text-gray-400" />
          <h2 className="mt-1 text-lg font-medium text-gray-900">Create new pipeline</h2>
          <p className="mt-1 text-sm text-gray-500">
            Pipelines allow you to merge, filter, and aggregate data for easy reuse in the future.
          </p>
        </div>
        <div className="mt-6 flex">
          <label htmlFor="name" className="sr-only">
            Pipeline name
          </label>
          <input
            ref={nameRef}
            name="name"
            className={"block w-full px-3 rounded border shadow-sm sm:text-sm " + inputColorClasses}
            placeholder="Enter a name for your pipeline"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={
              actionData?.errors?.name ? "name-error" : undefined
            }
          />
          <button
            type="submit"
            className="ml-4 flex-shrink-0 rounded border border-transparent bg-blue-600 px-4 py-2
            text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Pipeline
          </button>
        </div>
      </div>

      <div>
        {actionData?.errors?.name && (
          <div className="mt-2 text-sm text-red-600" id="name-error">
            {actionData.errors.name[0].toUpperCase() + actionData.errors.name.slice(1) /* quickly uppercase first letter */}
          </div>
        )}
      </div>
    </Form>
  );
}