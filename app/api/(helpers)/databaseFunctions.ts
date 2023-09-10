import { Audience, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertToAudienceTable(data: Audience) {
  try {
    await prisma.audience.create({
      data,
    });
  } catch (err) {
    console.log(err);
  }
}
