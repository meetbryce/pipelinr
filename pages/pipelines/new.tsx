import PipelinesLayout from "@/components/layout/PipelinesLayout";
import { Square3Stack3DIcon as PipelineIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


export default function NewPipelinesPage() {
  const [name, setName] = useState("");
  const actionData: { errors?: { name: string } } = { errors: undefined }; //fixme, unmock
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name };
      const { data } = await axios.post("/api/pipelines", body);
      await router.push(`/pipelines/${data.id}`); // route the user to their new pipeline's details page
    } catch (error) {
      console.error(error);
    }
  };

  const inputColorClasses = actionData?.errors?.name ? // fixme: remix -> next
    "border-red-300 focus:border-red-500 focus:ring-red-500 focus-visible:outline-red-500 placeholder-red-400" :
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

  return (
    <PipelinesLayout>
      <div className="mx-auto max-w-xl mt-10">
        <div>
          <div className="text-center">
            <PipelineIcon className="mx-auto h-10 w-10 text-gray-400" />
            <h2 className="mt-1 mb-2 text-2xl font-medium text-gray-900">Create new pipeline</h2>
            <p className="mt-1 text-sm text-gray-500">
              Pipelines allow you to merge, filter, and aggregate data for easy reuse in the future.
            </p>
          </div>
          <form onSubmit={submitData} className="mt-6 flex">
            <label htmlFor="name" className="sr-only">
              Pipeline name
            </label>
            <input
              name={"name"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={"block w-full px-3 rounded border shadow-sm sm:text-sm " + inputColorClasses}
              placeholder="Enter a name for your pipeline"
              aria-invalid={actionData?.errors?.name ? true : undefined} // fixme: remix -> next
              aria-errormessage={
                actionData?.errors?.name ? "name-error" : undefined // fixme: remix -> next
              }
              required
              autoFocus
            />
            <button
              type="submit"
              className="ml-4 flex-shrink-0 rounded border border-transparent bg-blue-600 px-4 py-2
            text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Pipeline
            </button>
          </form>
        </div>

        <div>
          {actionData?.errors?.name && ( // fixme: remix -> next
            <div className="mt-2 text-sm text-red-600" id="name-error">
              {actionData.errors.name[0].toUpperCase() + actionData.errors.name.slice(1) /* quickly uppercase first letter */}
            </div>
          )}
        </div>
      </div>
    </PipelinesLayout>
  );
}