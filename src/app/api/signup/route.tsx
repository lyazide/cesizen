import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Handle GET requests: Retrieve all users or a specific user by ID
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  try {
    if (userId) {
      const utilisateur = await prisma.utilisateur.findUnique({
        where: { id: parseInt(userId) },
      });
      return utilisateur
        ? new Response(JSON.stringify(utilisateur), { status: 200 })
        : new Response("Utilisateur non trouvé.", { status: 404 });
    } else {
      const utilisateurs = await prisma.utilisateur.findMany();
      return new Response(JSON.stringify(utilisateurs), { status: 200 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la récupération des utilisateurs.",
      }),
      { status: 500 }
    );
  }
}

// Handle POST requests: Create a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prenom, email, motDePasse } = body;
    const encryptedPassword = await bcrypt.hash(motDePasse, 10);

    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        motDePasse: encryptedPassword,
        isActif: true,
        isAdministrateur: false,
      },
    });

    return new Response(JSON.stringify(nouvelUtilisateur), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la création de l'utilisateur.",
      }),
      { status: 500 }
    );
  }
}

// Handle PUT requests: Update a user by ID
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  try {
    if (!userId) {
      return new Response("ID de l'utilisateur manquant.", { status: 400 });
    }

    const body = await req.json();
    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(userId) },
      data: body,
    });

    return new Response(JSON.stringify(updatedUtilisateur), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la mise à jour de l'utilisateur.",
      }),
      { status: 500 }
    );
  }
}

// Handle DELETE requests: Delete a user by ID
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  try {
    if (!userId) {
      return new Response("ID de l'utilisateur manquant.", { status: 400 });
    }

    await prisma.utilisateur.delete({
      where: { id: parseInt(userId) },
    });

    return new Response("Utilisateur supprimé avec succès.", { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la suppression de l'utilisateur.",
      }),
      { status: 500 }
    );
  }
}
