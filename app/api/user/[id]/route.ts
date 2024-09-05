import { PrismaClient } from "@prisma/client";
import { ok } from "assert";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { param }: { param: { id: string } }
) => {
  const id = param.id;
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 }); // 400 Bad Request
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );
    }
    return new NextResponse(JSON.stringify(existingUser), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching user api/user/:id" }),
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { param }: { param: { id: string } }
) => {
  const id = param.id;
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 }); // 400 Bad Request
  }
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { message: "Body is required" },
        { status: 400 }
      ); // 400 Bad Request
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );
    }

    const updateUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        ...body,
      },
    });
    return NextResponse.json(
      { message: "mise a jour avec succes", newUser: updateUser },
      { status: 200 }
    );
  } catch (error) {}
};

//route pour la suppression d'un utilisateur
export const DELETE = async (
  req: NextRequest,
  { param }: { param: { id: string } }
) => {
  const id = param.id;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.user
      .delete({ where: { id: parseInt(id) } })
      .then((res) =>
        NextResponse.json({ message: "supprimer avec succes" }, { status: 200 })
      );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Error deleting user api/user/:id" },
      { status: 500 }
    );
  }
};
