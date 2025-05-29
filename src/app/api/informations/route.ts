import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(/*request: NextRequest*/) {
  try {
    // Fetch all informations
    const informations = await prisma.information.findMany(/*{
      include: {
        informations: true,
      },
    }*/);

    if (!informations || informations.length === 0) {
      return NextResponse.json(
        { error: "No informations found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: informations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching informations:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the informations." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { id, titre, contenu, dateCreation, dateModification } =
    await req.json();
  try {
    const newInformation = await prisma.information.create({
      data: {
        id,
        titre,
        contenu,
        dateCreation,
        dateModification,
      },
    });
    return NextResponse.json({ data: newInformation }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { id, titre, contenu, dateCreation, dateModification } =
    await req.json();
  try {
    const newInformation = await prisma.information.update({
      where: { id: id },
      data: {
        id,
        titre,
        contenu,
        dateCreation,
        dateModification,
      },
    });
    return NextResponse.json({ data: newInformation }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedInformation = await prisma.information.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: deletedInformation }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
