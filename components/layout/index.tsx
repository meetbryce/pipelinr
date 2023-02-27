import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Meta from "./meta";
import Navigation from "@/components/shared/Navigation";

export default function Layout({
                                 meta,
                                 children
                               }: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();

  return (
    <>
      <Meta {...meta} />
      <Navigation />
      <main
        className="flex w-full h-[calc(100vh-68px)] flex-col items-center py-6 bg-gradient-to-br from-indigo-50 via-white">
        {children}

        {/*<div className="w-full border-t border-gray-200 py-5 text-center">
          <p className="text-gray-500 text-sm">
            AskUnify <span style={{
            "display": "inline-block",
            "transform": "scaleX(-1)",
            "filter": "FlipH"
          }}>&copy;</span><span>&nbsp;2023</span>
          </p>
        </div>*/}
      </main>
    </>
  );
}
