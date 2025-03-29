import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch all diagnostics
    const diagnostics = await prisma.diagnostic.findMany();

    console.log(diagnostics);
    if (!diagnostics || diagnostics.length === 0) {
      return NextResponse.json(
        { error: "No diagnostics found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: diagnostics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching diagnostics:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the diagnostics." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { evenement, points } = await req.json();
  try {
    const newdiagnostic = await prisma.diagnostic.create({
      data: {
        evenement,
        points,
      },
    });
    return NextResponse.json({ data: newdiagnostic }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { evenement, points, id } = await req.json();
  try {
    const newdiagnostic = await prisma.diagnostic.update({
      where: { id: id },
      data: {
        evenement,
        points,
      },
    });
    return NextResponse.json({ data: newdiagnostic }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const deleteddiagnostic = await prisma.diagnostic.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: deleteddiagnostic }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
