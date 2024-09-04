import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";

const prisma = new PrismaClient();

export const GET = async (res: NextApiResponse) => {
  const users = await prisma.user.findMany();
  return   JSON.stringify(users)
};


