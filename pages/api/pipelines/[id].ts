// POST /api/pipelines/[id]
// Required fields in body: any
// Optional fields in body: TBD
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import invariant from "tiny-invariant";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // todo: Pipeline typings (leverage prisma)
  const { id } = req.query;

  // Check request body
  // todo: safety check the req.body https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/prisma-validator

  // Check request method
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["POST", "PATCH"]);
    return res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }

  // Check request auth
  const session = await getSession({ req });
  if (!session || !session?.user?.email) {
    // session = { user: { email: "default@askunify.io" } }; // use for debugging without auth (and switch session to let)
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Retrieve the authenticated user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { pipelines: true },
  });

  // Check if the user owns the Pipeline (& that it exists)
  if (!user?.pipelines?.find(pipeline => pipeline.id === id)) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  // Update the object
  try {
    invariant(id && typeof id === "string");
    const pipeline = await prisma.pipeline.update({ where: { id }, data: req.body });
    res.status(200).json(pipeline);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }

  return res.json({ message: `${id}, yeah, we should have patched that shit for you. but hey...`, stuff: req.body });
}
