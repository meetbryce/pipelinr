import PipelinesLayout from "@/components/layout/PipelinesLayout";
import { Pipeline, PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { type GetServerSideProps } from "next";
import invariant from "tiny-invariant";
import Link from "next/link";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const whereCurrentUser = { email: { equals: session?.user?.email } };
  const pipelines = await prisma.pipeline.findMany({ where: { user: whereCurrentUser } });

  invariant(typeof context?.params?.id === "string");
  const { params: { id } } = context;
  const self = await prisma.pipeline.findFirstOrThrow({ where: { id, user: whereCurrentUser } });

  // fixme: catch the rejection more elegantly

  return {
    props: {
      self: JSON.parse(JSON.stringify(self)),
      pipelines: JSON.parse(JSON.stringify(pipelines))
    }
  };
};

export default function PipelineDetail({ self, pipelines }: { self: Pipeline, pipelines: Pipeline[] }) {
  const data = { schemas: [] };
  
  return (
    <PipelinesLayout pipelines={pipelines}>
      <div className="flex flex-row h-full">
        <div className="pr-4">
          <h2 className="font-medium">Datasets</h2>
          <hr className="mt-1 mb-2" />
          {data.schemas.length === 0 ? (
            <p className="p-2">No schemas defined yet</p>
          ) : (
            <table className="table-auto">
              <tbody>
              {data.schemas.map((schema: any) => ( // fixme: Schema type
                schema.tables.map((table: any) => { //fixme: typings
                  const qual = schema.schema + "." + table;
                  return (

                    <tr key={qual} className="p-2 even:bg-slate-50">
                      <td className={"pl-2 py-2"}>{schema.schema}</td>
                      <td className={"px-2 py-2"}><Link href={qual} className="text-blue-500">{table}</Link></td>
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
            <h3 className="ml-2 mt-2 text-lg font-medium leading-6 text-gray-900">{self.name}</h3>
            <p className="ml-2 mt-1 truncate text-sm text-gray-500">Tables: {self.tables}</p>
          </div>
          <div className="w-auto h-[calc(100vh-260px)]">
            <p>SMART TABLE</p>
            <pre>{JSON.stringify(self, null, 2)}</pre>
          </div>
          <form method="post" className="my-4 text-right">
            <button
              type="submit"
              className="rounded bg-red-600 text-sm py-2 px-4 text-white hover:bg-red-700 focus:bg-red-400"
            >
              Delete
            </button>
          </form>
        </div>
        <div>
          <h2 className="font-medium">Operations</h2>
          <hr className="mt-1 mb-2" />
          <div>OUTLET</div>
        </div>
      </div>
    </PipelinesLayout>
  );
}