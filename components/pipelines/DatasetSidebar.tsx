import { Schema } from "@/lib/utils";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ClientPipeline } from "@/lib/clientPipeline";
import axios from "axios";
import { useRouter } from "next/router";

export default function DatasetSidebar(props: { pipeline: ClientPipeline; schemas: Schema[] }) {
  const { schemas, pipeline } = props;
  const router = useRouter();

  // get the current tables, append `qualifier`, PATCH it up
  const handleDatasetSelection = async (qualifier: string) => {
    if (!pipeline) return;
    const tables = pipeline?.getTableList() || [];
    tables.push(qualifier);
    await axios.patch(`/api/pipelines/${pipeline.id}`, { tables: tables.join(",") });
    // todo: error handling
    await router.replace(router.asPath);
  };

  return (
    <div className="pr-4">
      <h2 className="font-medium">Datasets</h2>
      <hr className="mt-1 mb-2" />
      {schemas.length === 0 ? (
        <p className="p-2">No schemas defined yet</p> // todo: <- provide CTA to create connections &/or pull data
      ) : (
        // todo: quick search typeahead
        <table className="table-auto">
          <tbody>
            <tr className="p-2">
              <td className="py-2 pl-2">Pipeline</td>
              {/* todo: list other pipelines */}
              <td className="p-2">
                <Link href={"#todo"} className="text-blue-500">
                  TODO
                </Link>
              </td>
            </tr>
            {schemas.map(schema =>
              schema.tables.map(table => {
                const qualifier = `${schema.schema}.${table}`;
                const isAdded = pipeline?.getTableList().indexOf(qualifier) >= 0;
                if (isAdded) {
                  return (
                    <tr key={qualifier} className="p-2 text-gray-500">
                      <td className="py-2 pl-2">{schema.schema}</td>
                      <td className="p-2">{table}</td>
                      <td>
                        <CheckCircleIcon className="h6 w-6 py-2 pl-1.5 text-green-600" />
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={qualifier}
                    onClick={() => handleDatasetSelection(qualifier)}
                    className="cursor-pointer p-2 transition ease-in-out hover:bg-blue-100"
                  >
                    {/* todo: Sentence case \/  */}
                    <td className="rounded-l py-2 pl-2">{schema.schema}</td>
                    <td className="p-2 text-blue-500">{table}</td>
                    <td className="rounded-r"></td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
