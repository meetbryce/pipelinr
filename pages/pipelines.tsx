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
      <ul role="list" className="my-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {pipelines.map((pipeline) => (
          <li key={pipeline.id}>
            <Link href={`pipelines/${pipeline.id}`} className="col-span-1 flex rounded-md border border-gray-200 shadow-sm transition duration-150
            ease-in-out hover:shadow-md hover:border-gray-300">
              <div className="flex-shrink-0 flex bg-white items-center justify-center w-16 rounded-l-md">
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
      <p className="text-center mt-10">
        Select a pipeline above, or{" "}
        <Link href="pipelines/new" className="text-blue-500 underline hover:text-blue-800">
          create a new pipeline.
        </Link>
      </p>
    </PipelinesLayout>
  );
}