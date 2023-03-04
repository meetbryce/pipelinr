import PipelinesLayout from "@/components/layout/PipelinesLayout";
import { Pipeline } from "@prisma/client";
import { getSession } from "next-auth/react";
import { type GetServerSideProps } from "next";
import invariant from "tiny-invariant";
import { Schema, type UnifyDbConfig, unifyServer } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import { ClientPipeline } from "@/lib/clientPipeline";
import SmartTable from "@/components/shared/SmartTable";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import PipelineTabs from "@/components/pipelines/PipelineTabs";
import DatasetSidebar from "@/components/pipelines/DatasetSidebar";

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const whereCurrentUser = { email: { equals: session?.user?.email } };
  const pipelines = await prisma.pipeline.findMany({ where: { user: whereCurrentUser } });

  invariant(typeof context?.params?.id === "string");
  const {
    params: { id },
  } = context;
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
      unifyDbConfig: JSON.parse(JSON.stringify(unifyDbConfig)),
    },
  };
};

export default function PipelineDetail(props: {
  pipelines: Pipeline[];
  schemas: Schema[];
  self: Pipeline;
  unifyDbConfig: UnifyDbConfig;
}) {
  const router = useRouter();
  const { unifyDbConfig, pipelines, schemas, self } = props;
  const [pipeline, setPipeline] = useState<ClientPipeline>(); // treat `pipeline` as immutable, all changes should be made through re-instantiation
  const [activeTableIndex, setActiveTableIndex] = useState<number>(0);
  const [queryResponse, setQueryResponse] = useState<any>(); //todo: typings

  const instantiateClientPipeline = async (self: Pipeline, unifyDbConfig: UnifyDbConfig, activeTableIndex: number) => {
    const pipeline = new ClientPipeline({
      id: self.id,
      name: self.name,
      tables: self.tables,
      operations: [], // todo: use Operations from db
      activeTableIndex,
      db_config: unifyDbConfig,
      sort_col: undefined,
      sort_desc: 0,
    });
    setPipeline(pipeline);
  };

  useEffect(() => {
    instantiateClientPipeline(self, unifyDbConfig, activeTableIndex).then(() =>
      console.log("ClientPipeline instantiated"),
    );
  }, [self, unifyDbConfig, activeTableIndex]);

  const reloadData = async (pipeline: ClientPipeline) => {
    if (!pipeline.serverUrl) return;

    // get the pipeline's table[activeTableIndex] data from Unify
    const { data: result } = await axios.get(pipeline.serverUrl, { headers: pipeline.dbAuthHeaders });
    setQueryResponse(result);
  };

  useEffect(() => {
    if (!pipeline) return;
    reloadData(pipeline).then(() => console.log("Pipeline reloaded"));
  }, [pipeline]);

  if (!pipeline) return;

  return (
    <PipelinesLayout pipelines={pipelines}>
      <div className="flex h-full flex-row">
        <DatasetSidebar pipeline={pipeline} schemas={schemas} />
        <div className="w-full overflow-auto">
          <div className="-ml-2 -mt-2 flex flex-col items-baseline pb-2">
            <h3 className="mt-2 mb-1 ml-2  text-xl font-medium leading-6 text-gray-900">{self.name}</h3>
            {pipeline && pipeline.getTableList() && (
              <PipelineTabs
                pipeline={pipeline}
                activeTableIndex={activeTableIndex}
                setActiveTableIndex={setActiveTableIndex}
              />
            )}
          </div>
          <div className="h-[calc(100vh-320px)] w-auto">
            {!pipeline.tables && (
              // Empty state for pipelines without any tables added
              <div className="flex">
                <div className="relative block w-full rounded-lg border-2 border-gray-200 px-12 py-16 text-center">
                  <InformationCircleIcon className="mx-auto mb-1 h-10 w-10 text-gray-400" />
                  <span className="font-medium text-gray-400">Add a dataset to your pipeline to get started</span>
                </div>
              </div>
            )}
            {pipeline.tables && (
              <SmartTable entity={pipeline} responseData={queryResponse} reloadData={() => reloadData(pipeline)} />
            )}
          </div>
          <form method="post" className="my-4 text-right">
            <button
              type="submit"
              className="rounded bg-red-600 py-2 px-4 text-sm text-white hover:bg-red-700 focus:bg-red-400"
            >
              Delete
            </button>
            {/* todo: ability to delete a pipeline */}
          </form>
        </div>
        <div className="pl-2">
          <h2 className="font-medium">Operations</h2>
          <hr className="mt-1 mb-2" />
          <div>TODO</div>
        </div>
      </div>
    </PipelinesLayout>
  );
}
