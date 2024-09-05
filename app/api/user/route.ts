import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
  }
};

// export const POST = async (req: NextApiRequest) => {

//   try {
//     const user = await prisma.user.create({
//       data: JSON.parse(req.body),
//     });

//     return new NextResponse(JSON.stringify(user), { status: 201 });
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newUser = await prisma.user.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json({
    success: 1,
    message: "create success",
    user: newUser,
  });
}
