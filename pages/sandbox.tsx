import { useSession } from "next-auth/react";
import Layout from "@/components/layout";
import AuthenticationRequired from "@/components/shared/AuthenticationRequired";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import JoinModal from "@/components/pipelines/JoinModal";

export default function SandboxPage() {
  const { status } = useSession();
  const [confirm, setConfirm] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(true);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <AuthenticationRequired />;

  return (
    <Layout>
      <div className="grid w-full grid-cols-1 gap-8 px-6">
        <div>
          <button className={"text-blue-500 hover:underline"} onClick={() => setConfirm(true)}>
            Click here
          </button>{" "}
          to trigger the confirmation dialog
        </div>

        <div>
          <p>
            Let us practice:{" "}
            <button className="group inline-flex rounded bg-slate-600 py-2 px-3 text-sm text-blue-100 transition duration-150 ease-in-out hover:bg-blue-500 active:bg-blue-600">
              <ChevronDoubleLeftIcon className="my-0.5 h-4 w-4" />
              <span className="ml-2 mr-1 hidden text-sm uppercase group-hover:inline-block">Merge</span>
            </button>
          </p>
        </div>

        <div className="hidden">
          {/* Let's create a reusable WithTooltip component (how is this not already a thing in TailwindUI) */}
          <div className="group relative inline-flex">
            <button className="rounded bg-slate-600 p-2 text-sm text-blue-100 transition duration-150 ease-in-out hover:bg-blue-500 active:bg-blue-600">
              Button
            </button>
            <span
              className="absolute left-1/2 m-4 mx-auto w-full -translate-x-1/2 translate-y-full rounded bg-gray-700 py-1 px-2
    text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100"
            >
              This is the tooltip text and it sucks rn
            </span>
          </div>
        </div>

        {confirm && (
          <ConfirmationDialog
            onConfirm={() => {
              console.log("Confirmed");
            }}
            setState={setConfirm}
            title={"Deactivate account"}
            message={"Are you sure you want to do that?"}
          />
        )}

        {showJoinModal && <JoinModal setState={setShowJoinModal} />}
      </div>
    </Layout>
  );
}
