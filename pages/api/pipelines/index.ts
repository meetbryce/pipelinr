// POST /api/pipelines
// Required fields in body: name
// Optional fields in body: TBD
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // todo: add support for "duplicate" by allowing creation with full set of Pipeline attributes
  // todo: Pipeline typings (leverage prisma) https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/prisma-validator
  const { name } = req.body;

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
    // session = { user: { email: "default@askunify.io" } }; // use for debugging without auth (and switch session to let)
    return res.status(401).send({ message: "Unauthorized" });
  }


  // check request body
  if (!name) {
    return res.status(400).json({ message: "A name is required when creating a pipeline." });
  }

  const { email } = session.user;

  // create the User if they don't exist yet
  await prisma.user.upsert({ where: { email }, update: { email }, create: { email } });

  // Actually create the record
  const result = await prisma.pipeline.create({
    data: { name, user: { connect: { email } } }
  });
  return res.json(result);
}