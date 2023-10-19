import React from "react";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const data = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!data) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  if (parseInt(params.id) > 10) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 404 });
  } else {
    return NextResponse.json(data);
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const userId = parseInt(params.id);
  const data = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!data) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(deletedUser);
}
