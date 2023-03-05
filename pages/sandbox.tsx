import { useSession } from "next-auth/react";
import Layout from "@/components/layout";
import AuthenticationRequired from "@/components/shared/AuthenticationRequired";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useState } from "react";

export default function SandboxPage() {
  const { status } = useSession();
  const [confirm, setConfirm] = useState(false);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <AuthenticationRequired />;

  return (
    <Layout>
      <div className="w-full px-6">
        <p>
          <button className={"text-blue-500 hover:underline"} onClick={() => setConfirm(true)}>
            Click here
          </button>{" "}
          to trigger the confirmation dialog
        </p>
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
      </div>
    </Layout>
  );
}
