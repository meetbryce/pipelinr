// POST /api/pipelines
// Required fields in body: name
// Optional fields in body: TBD
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // todo: add support for "duplicate" by allowing creation with full set of Pipeline attributes
  // todo: Pipeline typings (leverage prisma)
  const { name } = req.body;

  // fixme: handle if the email address doesn't have an associated User yet!

  // Check request method
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });

  }

  // Check request auth
  const session = await getSession({ req });
  if (!session || !session?.user?.email) {
    return res.status(401).send({ message: "Unauthorized" });
    // session = { user: { email: "default@askunify.io" } }; // use for debugging without auth (and switch session to let)
  }

  // check request body
  if (!name) {
    return res.status(400).json({ message: "Missing required field: name" });
  }

  // Actually create the record
  const result = await prisma.pipeline.create({
    data: { name, user: { connect: { email: session.user?.email } } }
  });
  return res.json(result);
}