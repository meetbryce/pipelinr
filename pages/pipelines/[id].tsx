import PipelinesLayout from "@/components/layout/PipelinesLayout";
import { Pipeline } from "@prisma/client";
import { getSession } from "next-auth/react";
import { type GetServerSideProps } from "next";
import invariant from "tiny-invariant";
import Link from "next/link";
import { Schema, type UnifyDbConfig, unifyServer } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import { ClientPipeline } from "@/lib/clientPipeline";
import SmartTable from "@/components/shared/SmartTable";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const whereCurrentUser = { email: { equals: session?.user?.email } };
  const pipelines = await prisma.pipeline.findMany({ where: { user: whereCurrentUser } });

  invariant(typeof context?.params?.id === "string");
  const { params: { id } } = context;
  const self = await prisma.pipeline.findFirstOrThrow({ where: { id, user: whereCurrentUser } });
  // fixme: catch the rejection more elegantly ↑

  // get the Schemas from Unify
  const { data: schemas } = await axios.get(`${unifyServer()}/v1/schemas?deep=1`);

  // this should probably be abstracted to some kind of 'service' (&/or some caching)
  const { data: unifyDbConfig } = await axios.get<UnifyDbConfig>(unifyServer() + "/v1/dbconf");

  return {
    props: {
      pipelines: JSON.parse(JSON.stringify(pipelines)),
      schemas: JSON.parse(JSON.stringify(schemas)),
      self: JSON.parse(JSON.stringify(self)),
      unifyDbConfig: JSON.parse(JSON.stringify(unifyDbConfig))
    }
  };
};


export default function PipelineDetail(props: { pipelines: Pipeline[], schemas: Schema[], self: Pipeline, unifyDbConfig: UnifyDbConfig }) {
  const { unifyDbConfig, pipelines, schemas, self } = props;
  const [pipeline, setPipeline] = useState<ClientPipeline>();
  const [queryResponse, setQueryResponse] = useState<any>(); //todo: typings

  const instantiateClientPipeline = async (self: Pipeline, unifyDbConfig: UnifyDbConfig) => {
    const pipeline = new ClientPipeline(
      {
        id: self.id,
        name: self.name,
        tables: self.tables,
        operations: [], // todo: use Operations from db
        db_config: unifyDbConfig,
        sort_col: undefined,
        sort_desc: 0
      });

    setPipeline(pipeline);
  };

  useEffect(() => {
    instantiateClientPipeline(self, unifyDbConfig).then(() => console.log("ClientPipeline instantiated"));
  }, [self, unifyDbConfig]);

  const reloadData = async (pipeline: ClientPipeline) => {
    const url = pipeline.serverUrl;
    if (!url) return;

    const { data: result } = await axios.get(url, { headers: pipeline.dbAuthHeaders });
    setQueryResponse(result);
  };

  useEffect(() => {
    if (!pipeline) return;
    reloadData(pipeline).then(() => console.log("Pipeline reloaded"));
  }, [pipeline]);

  return (
    <PipelinesLayout pipelines={pipelines}>
      <div className="flex flex-row h-full">
        <div className="pr-4">
          <h2 className="font-medium">Datasets</h2>
          <hr className="mt-1 mb-2" />
          {schemas.length === 0 ? (
            <p className="p-2">No schemas defined yet</p>
          ) : (
            // todo: quick search typeahead
            <table className="table-auto">
              <tbody>
              <tr className="p-2">
                <td className={"py-2"}>Pipeline</td>
                <td className={"px-2 py-2"}><Link href={"#todo"} className="text-blue-500">TODO</Link></td>
              </tr>
              {schemas.map((schema: Schema) => (
                schema.tables.map(table => {
                  const qualifier = schema.schema + "." + table;
                  return (
                    <tr key={qualifier} className="p-2">
                      {/* todo: Sentence case \/  */}
                      <td className={"py-2"}>{schema.schema}</td>
                      <td className={"px-2 py-2"}><Link href={qualifier} className="text-blue-500">{table}</Link></td>
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
          <div className="w-auto h-[calc(100vh-280px)]">
            <SmartTable entity={pipeline} responseData={queryResponse} reloadData={reloadData} />
            {/*<pre>{JSON.stringify({ queryResponse, self }, null, 2)}</pre>*/}
          </div>
          <form method="post" className="my-4 text-right">
            <button
              type="submit"
              className="rounded bg-red-600 text-sm py-2 px-4 text-white hover:bg-red-700 focus:bg-red-400"
            >
              Delete
            </button>
            {/* todo: ability to delete a pipeline */}
          </form>
        </div>
        <div>
          <h2 className="font-medium">Operations</h2>
          <hr className="mt-1 mb-2" />
          <div>TODO</div>
        </div>
      </div>
    </PipelinesLayout>
  );
}