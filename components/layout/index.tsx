import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
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
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const footerText = <small>AskUnify <span style={{
    "display": "inline-block",
    "transform": "scaleX(-1)",
    "filter": "FlipH"
  }}>&copy;</span><span>&nbsp;2023</span></small>;

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
      <Navigation />
      <main
        className="flex w-full h-screen flex-col items-center py-6 bg-gradient-to-br from-indigo-50 via-white">
        {children}
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          {footerText}
        </p>
      </div>
    </>
  );
}
