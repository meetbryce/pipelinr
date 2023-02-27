import React from "react";
import Link from "next/link";
import { Square3Stack3DIcon as PipelineIcon } from "@heroicons/react/24/outline";
import PipelinesLayout from "@/components/layout/PipelinesLayout";

export default function PipelinesPage() {
  let pipelineListItems: any[] = []; //fixme: fetch & types
  pipelineListItems = [{ id: 1, name: "Example Pipeline" }, { id: 2, name: "FAKE Pipeline" }]; //fixme: fetch & types

  return (
    <PipelinesLayout>
      <ul role="list" className="my-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {pipelineListItems.map((pipeline) => (
          <li key={pipeline.id}>
            <Link href={`pipelines/${pipeline.id}`} className="col-span-1 flex rounded-md border border-gray-200 shadow-sm transition duration-150
            ease-in-out hover:shadow-md hover:border-gray-300">
              <div className="flex-shrink-0 flex bg-white items-center justify-center w-16 rounded-l-md">
                <PipelineIcon className="mx-auto h-7 w-7 text-gray-300" />
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-white">
                <div className="flex-1 truncate px-4 py-3 pl-0 text-sm">
                  <p className="font-medium text-gray-900">{pipeline.name}</p>
                  <p className="text-gray-500">??
                    Tables</p> {/* todo: pull data about the contents/structure of the pipeline */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mt-10">
        Select a pipeline above, or{" "}
        <Link href="pipelines/new" className="text-blue-500 underline hover:text-blue-800">
          create a new pipeline.
        </Link>
      </p>
    </PipelinesLayout>
  );
}