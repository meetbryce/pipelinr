import { ClientPipeline } from "@/lib/clientPipeline";
import { classNames } from "@/lib/utils";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function PipelineTabs(props: {
  pipeline: ClientPipeline;
  activeTableIndex: number;
  setActiveTableIndex: (index: number) => void;
}) {
  const { pipeline, activeTableIndex, setActiveTableIndex } = props;
  const router = useRouter();

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-2" aria-label="Tabs">
        {pipeline.getTableList().map((tab, index) => (
          <div
            key={tab}
            className={classNames(
              activeTableIndex === index
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              "border-b-2",
            )}
          >
            <button
              onClick={() => {
                setActiveTableIndex(index);
              }}
              className="whitespace-nowrap py-2 px-2 text-sm font-medium"
              aria-current={activeTableIndex === index ? "page" : undefined}
            >
              {tab}
            </button>
            <button
              className="transition ease-in-out hover:text-red-700"
              onClick={async () => {
                confirm(`Remove ${tab} & associated operations from your pipeline?`);
                // todo: use <ConfirmationModal/> instead of confirm() ↑
                const tables = pipeline.getTableList();
                tables.splice(index, 1);
                await axios.patch(`/api/pipelines/${pipeline.id}`, { tables: tables.join(",") });
                await router.replace(router.asPath);
              }}
            >
              <XMarkIcon className="-ml-0.5 mr-1.5 inline-block h-4 w-4" />
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
}
