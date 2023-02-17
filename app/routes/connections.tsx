import Navigation from "~/components/Navigation";
import * as React from "react";
import { useUser } from "~/utils";

export default function ConnectionsPage() {
  const user = useUser();

  return (
    <div className="flex h-screen flex-col">
      <Navigation user={user} />
      <main className="flex flex-col h-full bg-white">
        <h1>Existing connections go here</h1>
        <hr />
        <h1>Available connections go here</h1>
      </main>
    </div>
  );
}