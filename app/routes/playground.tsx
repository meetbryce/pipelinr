import Navigation from "~/components/Navigation";
import * as React from "react";
import { useUser } from "~/utils";

export default function PlaygroundPage() {
  const user = useUser();

  return (
    <div className="flex h-screen flex-col">
      <Navigation user={user} />
      <main className="flex flex-col h-full bg-white">
        <h1>SQL editor goes here</h1>
        <hr />
        <h1>Table of results goes here</h1>
      </main>
    </div>
  );
}