import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId || userId === "undefined") {
    return NextResponse.json(
      { error: "ID utilisateur requis" },
      { status: 400 }
    );
  }

  try {
    const diagnostics = await prisma.soumet.findMany({
      where: { id_Utilisateur: Number(userId) },
      select: {
        date_: true,
        Diagnostic: {
          select: { points: true },
        },
      },
      orderBy: { date_: "desc" },
    });

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Erreur de récupération des diagnostics" },
      { status: 500 }
    );
  }
}
