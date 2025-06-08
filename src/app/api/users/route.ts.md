// src/app/api/users/route.ts

import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, nom, motDePasse, prenom, isActif, isAdministrateur } =
    await req.json();
  const encryptedPassword = await bcrypt.hash(motDePasse, 10);

  try {
    const newUser = await prisma.utilisateur.create({
      data: {
        email,
        nom,
        motDePasse: encryptedPassword,
        prenom,
        isActif,
        isAdministrateur,
      },
    });
    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
