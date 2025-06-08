import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Utilisateur from "../../../types/utilisateurs";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    // Fetch all utilisateurs
    const utilisateurs: Utilisateur[] = await prisma.utilisateur.findMany();

    //console.log(utilisateurs);
    if (!utilisateurs || utilisateurs.length === 0) {
      return NextResponse.json(
        { error: "No utilisateurs found." },
        { status: 404 }
      );
    }

    return NextResponse.json<{ data: Utilisateur[] }>(
      { data: utilisateurs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching utilisateurs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the utilisateurs." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const {
    email,
    nom,
    motDePasse,
    prenom,
    isActif,
    isAdministrateur,
  }: {
    email: string;
    nom: string;
    motDePasse: string;
    prenom: string;
    isActif: boolean;
    isAdministrateur: boolean;
  } = await req.json();
  await req.json();
  const encryptedPassword = await bcrypt.hash(motDePasse, 10);
  try {
    const newUtilisateur = await prisma.utilisateur.create({
      data: {
        email,
        nom,
        motDePasse: encryptedPassword,
        prenom,
        isActif,
        isAdministrateur,
      },
    });
    return NextResponse.json({ data: newUtilisateur }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const {
    id,
    email,
    nom,
    motDePasse: encryptedPassword,
    prenom,
    isActif,
    isAdministrateur,
  }: {
    id: number;
    email: string;
    nom: string;
    motDePasse: string;
    prenom: string;
    isActif: boolean;
    isAdministrateur: boolean;
  } = await req.json();
  try {
    const newDiagnostic: Utilisateur = await prisma.utilisateur.update({
      where: { id: id },
      data: {
        email,
        nom,
        motDePasse: encryptedPassword,
        prenom,
        isActif,
        isAdministrateur,
      },
    });
    return NextResponse.json<{ data: Utilisateur }>(
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
    const deletedDiagnostic: Utilisateur = await prisma.utilisateur.delete({
      where: { id: id },
    });
    return NextResponse.json<{ data: Utilisateur }>(
      { data: deletedDiagnostic },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
