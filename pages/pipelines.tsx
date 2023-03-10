import React from "react";
import Link from "next/link";
import { Square3Stack3DIcon as PipelineIcon } from "@heroicons/react/24/outline";
import PipelinesLayout from "@/components/layout/PipelinesLayout";
import { type Pipeline } from "@prisma/client";
import { getSession, GetSessionParams } from "next-auth/react";
import prisma from "@/lib/prisma";

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  const pipelines = await prisma.pipeline.findMany({ where: { user: { email: { equals: session?.user?.email } } } });
  return { props: { pipelines: JSON.parse(JSON.stringify(pipelines)) } };
}

export default function PipelinesPage({ pipelines }: { pipelines: Pipeline[] }) {
  return (
    <PipelinesLayout pipelines={pipelines}>
      {pipelines.length === 0 && (
        <div className="flex space-x-1 px-6 md:space-x-3">
          <Link
            href="/pipelines/new"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PipelineIcon className="mx-auto h-10 w-10 text-gray-400" />
            <span className="mt-2 font-medium text-gray-900">Create a new Pipeline</span>
          </Link>
        </div>
      )}
      {!!pipelines.length && (
        <ul role="list" className="my-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {pipelines.map(pipeline => (
            <li key={pipeline.id}>
              <Link
                href={`pipelines/${pipeline.id}`}
                className="col-span-1 flex rounded-md border border-gray-200 shadow-sm transition duration-150
            ease-in-out hover:border-gray-300 hover:shadow-md"
              >
                <div className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-white">
                  <PipelineIcon className="mx-auto h-7 w-7 text-gray-300" />
                </div>
                <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-white">
                  <div className="flex-1 truncate px-4 py-3 pl-0 text-sm">
                    <p className="font-medium text-gray-900">{pipeline.name}</p>
                    <p className="text-gray-500">Tables: {pipeline.tables || "none"}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10 text-center">
        Select a pipeline above, or{" "}
        <Link href="pipelines/new" className="text-blue-500 underline hover:text-blue-800">
          create a new pipeline.
        </Link>
      </p>
    </PipelinesLayout>
  );
}
