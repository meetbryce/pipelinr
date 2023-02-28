import { signIn, useSession } from "next-auth/react";
import NavLink from "@/components/shared/NavLink";
import { classNames } from "@/lib/utils";
import Layout from "@/components/layout";
import AuthenticationRequired from "@/components/shared/AuthenticationRequired";

export default function SandboxPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <AuthenticationRequired />;

  const btnClasses = "rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black";

  return (
    <Layout>
      <div className="w-full px-6">
        <ul className={"flex md:space-x-3"}>
          <li><NavLink href={"/"} exact={true} className="text-blue-500 hover:underline">Home</NavLink></li>
          <li><NavLink href={"/sandbox"} className="text-blue-500 hover:underline">Sandbox</NavLink></li>
          <li><NavLink href={"/pipelines"} className="text-blue-500 hover:underline">Pipelines</NavLink></li>
          <li><NavLink href={"/pipelines"}
                       className={(isActive: boolean) => isActive ? "ACTIVE" : "inactive"}>Pipelines</NavLink></li>
          <li><NavLink href={"/pipelines"}
                       className={(isActive: boolean) => classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium")}>Pipelines</NavLink>
          </li>
          <li><NavLink href={"/sandbox"}
                       className={(isActive: boolean) => classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium")}>Sandbox</NavLink>
          </li>
        </ul>
        <p className="my-4">
          <button className={btnClasses} onClick={() => signIn()}>Sign in</button>
        </p>
      </div>
    </Layout>
  );
}