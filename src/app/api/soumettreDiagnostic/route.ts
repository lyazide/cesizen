import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { soumissions } = await req.json();
    console.log("Soumissions reçues :", soumissions);

    if (!soumissions || !Array.isArray(soumissions)) {
      return NextResponse.json(
        { error: "Données de soumission invalides" },
        { status: 400 }
      );
    }

    const results = await prisma.soumet.createMany({
      data: soumissions,
    });

    return NextResponse.json({
      message: "Soumissions enregistrées avec succès.",
      results,
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
