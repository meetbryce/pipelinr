import { Link } from "@remix-run/react";

export default function PipelineIndexPage() {
  return (
    <p>
      No pipeline selected. Select a pipeline on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new pipeline.
      </Link>
    </p>
  );
}
