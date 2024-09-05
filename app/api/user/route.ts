import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(JSON.stringify({ message: "Error fetching users api/user" }), { status: 500 });
  }
};


export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    return  NextResponse.json({message:"erreur lors de l'ajout d'un user api/user"},{status:500})
  }
}
