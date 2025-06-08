import prisma from "@/utils/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import SoumissionData from "../../../types/soumettreDiagnotics";

export async function GET() {
  try {
    const soumettreDiagnostics: SoumissionData[] =
      await prisma.soumet.findMany();

    if (!soumettreDiagnostics || soumettreDiagnostics.length === 0) {
      return NextResponse.json(
        { error: "No soumettreDiagnostics found." },
        { status: 404 }
      );
    }

    return NextResponse.json<{ data: SoumissionData[] }>(
      { data: soumettreDiagnostics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching soumettreDiagnostics:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the soumettreDiagnostics." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Retrieve full JSON body
    const soumissions: SoumissionData[] = body.soumissions;
    console.log("Soumissions reçues :", soumissions);
    if (!soumissions || !Array.isArray(soumissions)) {
      return NextResponse.json(
        { error: "Données de soumission invalides" },
        { status: 400 }
      );
    }

    const results: Prisma.BatchPayload = await prisma.soumet.createMany({
      data: soumissions,
    });

    return NextResponse.json<{ message: string; results: Prisma.BatchPayload }>(
      {
        message: "Soumissions enregistrées avec succès.",
        results,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const soumission: SoumissionData = await req.json(); // Ensure proper typing

    const updatedSoumission: SoumissionData = await prisma.soumet.update({
      where: { id: soumission.id },
      data: soumission,
    });

    return NextResponse.json<{ data: SoumissionData }>(
      { data: updatedSoumission },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating soumettreDiagnostics:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the soumettreDiagnostics." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json(); // Retrieve full request body
    const id: number = body.id; // Ensure correct extraction

    const deletedSoumission: SoumissionData = await prisma.soumet.delete({
      where: { id },
    });

    return NextResponse.json<{ data: SoumissionData }>(
      { data: deletedSoumission },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting soumettreDiagnostics:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the soumettreDiagnostics." },
      { status: 500 }
    );
  }
}
