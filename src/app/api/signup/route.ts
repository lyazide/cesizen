import { NextRequest, NextResponse } from "next/server";
//import { PrismaClient } from "@prisma/client";
import prisma from "../../../utils/db"; // Adjust the import path as necessary
import bcrypt from "bcrypt";

//const prisma = new PrismaClient();

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
        : new Response(JSON.stringify({ error: "Utilisateur non trouvé." }), {
            status: 404,
          });
    } else {
      const utilisateurs = await prisma.utilisateur.findMany();
      return new Response(JSON.stringify(utilisateurs), { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching utilisateurs:", error);
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la récupération des utilisateurs : ",
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
    console.error("Error fetching utilisateurs:", error);
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
      return new NextResponse("ID de l'utilisateur manquant.", { status: 400 });
    }

    const body = await req.json();
    const { motDePasse, ...otherData } = body; // Destructure motDePasse from the body

    // Declare dataToUpdate as const from the start
    // We conditionally add motDePasse into a new object if it exists
    const dataToUpdate = motDePasse
      ? {
          ...otherData,
          motDePasse: await bcrypt.hash(motDePasse, await bcrypt.genSalt(10)),
        }
      : otherData; // If no motDePasse, just use otherData

    const updatedUtilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(userId) },
      data: dataToUpdate,
      // IMPORTANT: Select what you want to return, exclude the password for security
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        isActif: true,
        isAdministrateur: true,
        // Do NOT include motDePasse here
      },
    });

    return new NextResponse(JSON.stringify(updatedUtilisateur), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    // Handle unique constraint error for email
    //    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
    //      return new NextResponse(
    //        JSON.stringify({ message: "L'adresse e-mail existe déjà." }),
    //        { status: 409 } // Conflict
    //      );
    //    }

    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour de l'utilisateur.",
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client is disconnected
  }
}

// Handle DELETE requests: Delete a user by ID
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  try {
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "ID de l'utilisateur manquant." }),
        { status: 400 }
      );
    }

    await prisma.utilisateur.delete({
      where: { id: parseInt(userId) },
    });

    return new Response(
      JSON.stringify({ error: "Utilisateur supprimé avec succès." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching utilisateurs:", error);
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la suppression de l'utilisateur.",
      }),
      { status: 500 }
    );
  }
}
