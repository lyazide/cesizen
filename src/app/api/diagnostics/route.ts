import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Diagnostic from "../../../types/diagnostics";

export async function GET() {
  try {
    // Fetch all diagnostics
    const diagnostics: Diagnostic[] = await prisma.diagnostic.findMany();

    //console.log(diagnostics);
    if (!diagnostics || diagnostics.length === 0) {
      return NextResponse.json(
        { error: "No diagnostics found." },
        { status: 404 }
      );
    }

    return NextResponse.json<{ data: Diagnostic[] }>(
      { data: diagnostics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching diagnostics:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the diagnostics." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { evenement, points }: { evenement: string; points: number } =
    await req.json();
  try {
    const newDiagnostic: Diagnostic = await prisma.diagnostic.create({
      data: {
        evenement,
        points,
      },
    });
    return NextResponse.json<{ data: Diagnostic }>(
      { data: newDiagnostic },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const {
    evenement,
    points,
    id,
  }: { evenement: string; points: number; id: number } = await req.json();
  try {
    const newDiagnostic: Diagnostic = await prisma.diagnostic.update({
      where: { id: id },
      data: {
        evenement,
        points,
      },
    });
    return NextResponse.json<{ data: Diagnostic }>(
      { data: newDiagnostic },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: number } = await req.json();
  try {
    const deletedDiagnostic: Diagnostic = await prisma.diagnostic.delete({
      where: { id: id },
    });
    return NextResponse.json<{ data: Diagnostic }>(
      { data: deletedDiagnostic },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
