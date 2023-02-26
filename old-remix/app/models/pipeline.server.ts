import type { User, Pipeline } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Pipeline } from "@prisma/client";

export function getPipeline({
  id,
  userId,
}: Pick<Pipeline, "id"> & {
  userId: User["id"];
}) {
  return prisma.pipeline.findFirst({
    select: { id: true, name: true, tables: true, operations: true },
    where: { id, userId },
  });
}

export function getPipelineListItems({ userId }: { userId: User["id"] }) {
  return prisma.pipeline.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createPipeline({
  name,
  userId,
}: Pick<Pipeline, "name"> & {
  userId: User["id"];
}) {
  return prisma.pipeline.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function addTableToPipeline({
  id,
  table,
  userId,
}: Pick<Pipeline, "id"> & {
  table: string;
  userId: User["id"];
}) {
  let pipeline = await prisma.pipeline.findFirst({
    where: { id, userId },
  });
  let tablist: string[] = [];
  if (pipeline) {
    if (pipeline.tables && pipeline.tables.length > 0) {
      tablist = pipeline.tables.split(",");
    }
    if (tablist.indexOf(table) == -1) {
      tablist.push(table);
      pipeline.tables = tablist.join(",");
      return prisma.pipeline.update({
        where: { id },
        data: { tables: pipeline.tables },
      });
    }
  }
}

export function deletePipeline({
  id,
  userId,
}: Pick<Pipeline, "id"> & { userId: User["id"] }) {
  return prisma.pipeline.deleteMany({
    where: { id, userId },
  });
}

export function getPipeTables(tables: string) {
  if (tables && tables.length > 0) {
    return tables.split(",");
  } else {
    return [];
  }
}

export async function queryData({
  id,
  userId,
}: Pick<Pipeline, "id"> & { userId: User["id"] }) {
  let pipeline = await prisma.pipeline.findFirst({
    select: { id: true, name: true, tables: true, operations: true },
    where: { id, userId },
  });
  if (pipeline) {
    let tablist = getPipeTables(pipeline.tables);
    if (tablist.length > 0) {
      const query = "select * from " + tablist[0] + " limit 1000";
      let res = await fetch("http://127.0.0.1:5000/v1/query?q=" + query);
      return res.json();
    }
  }
}
