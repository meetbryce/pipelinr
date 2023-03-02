import { useSession } from "next-auth/react";
import Layout from "@/components/layout";
import AuthenticationRequired from "@/components/shared/AuthenticationRequired";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import { type FormEvent, useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import SmartTable from "@/components/shared/SmartTable";
import axios from "axios";

export default function PlaygroundPage() {
  const { status } = useSession();
  const [responseData, setResponseData] = useState<any>();
  const [queryError, setQueryError] = useState<any>();
  const editorRef = useRef<any>(null);
  const editorOptions = {
    fontSize: 15,
    fontLigatures: true,
    minimap: { enabled: false },
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <AuthenticationRequired />;

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rawQuery = editorRef?.current?.getValue();
    if (!rawQuery) return console.info("no query");

    const q = `${rawQuery} FORMAT JSON`; // e.g. query = "select * from tenant_default.github____orgs limit 1"
    // todo: get base URL from dbConfig
    try {
      const { data: result } = await axios.get(`http://127.0.0.1:8123/?query=${encodeURIComponent(q)}`); // todo: shouldn't this require the auth headers?
      setQueryError(null);
      setResponseData(result);
    } catch (e) {
      setResponseData(null);
      if (axios.isAxiosError(e) && e.response) {
        setQueryError(e.response.data);
      } else {
        setQueryError("An unexpected error occurred, please review your query & try again.");
      }
    }
  }

  return (
    <Layout>
      <div className="h-full w-full px-6">
        <div className="-mx-5">
          <Editor
            height="50vh"
            defaultLanguage="sql"
            defaultValue="select id, number, title, base_repo_name from tenant_default.github____org_pulls limit 1"
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <form onSubmit={handleSubmit} method="post">
              <button
                type="submit"
                className="duration-50 group inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm transition ease-in-out hover:border-green-700 hover:bg-green-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
              >
                <PlayIcon
                  className="-ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-green-800"
                  aria-hidden="true"
                />
                <span>Run Query</span>
              </button>
            </form>
          </div>
        </div>
        <div className="mt-4 h-full">
          {queryError && (
            <div className="py-4 text-sm">
              <code className={"text-red-700"}>{queryError}</code>
            </div>
          )}
          {responseData && (
            <SmartTable entity={{}} reloadData={() => console.log("reloading...")} responseData={responseData} />
          )}
        </div>
      </div>
    </Layout>
  );
}
