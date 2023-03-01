import { useSession } from "next-auth/react";
import Layout from "@/components/layout";
import AuthenticationRequired from "@/components/shared/AuthenticationRequired";

export default function ConnectionsPage() {
  const { status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <AuthenticationRequired />;


  return (
    <Layout>
      <div className="w-full px-6"><p>COMING SOON: Manage connections to data sources here.</p></div>
    </Layout>
  );
}