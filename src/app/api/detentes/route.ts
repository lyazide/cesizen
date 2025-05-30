import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Detente from "../../../types/detentes";

export async function GET() {
  try {
    // Fetch all detentes
    const detentes: Detente[] = await prisma.detente.findMany();

    //console.log(detentes);
    if (!detentes || detentes.length === 0) {
      return NextResponse.json(
        { error: "No detentes found." },
        { status: 404 }
      );
    }

    return NextResponse.json<{ data: Detente[] }>(
      { data: detentes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching detentes:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the detentes." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const {
    nom,
    description,
    duree,
    imagePath,
  }: { nom: string; description: string; duree: number; imagePath: string } =
    await req.json();
  try {
    const newDetente: Detente = await prisma.detente.create({
      data: {
        nom,
        description,
        duree,
        imagePath, // Assuming imagePath is optional and can be null
      },
    });
    return NextResponse.json<{ data: Detente }>(
      { data: newDetente },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const {
    nom,
    description,
    duree,
    imagePath,
    id,
  }: {
    nom: string;
    description: string;
    duree: number;
    imagePath: string;
    id: number;
  } = await req.json();
  try {
    const newDetente: Detente = await prisma.detente.update({
      where: { id: id },
      data: {
        nom,
        description,
        duree,
        imagePath,
      },
    });
    return NextResponse.json<{ data: Detente }>(
      { data: newDetente },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: number } = await req.json();
  try {
    const deletedDetente: Detente = await prisma.detente.delete({
      where: { id: id },
    });
    return NextResponse.json<{ data: Detente }>(
      { data: deletedDetente },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
