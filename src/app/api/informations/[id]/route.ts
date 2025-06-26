import prisma from "@/utils/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID invalide" }), {
      status: 400,
    });
  }

  try {
    const info = await prisma.information.findUnique({
      where: { id },
    });

    if (!info) {
      return new Response(JSON.stringify({ error: "Non trouvé" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(info), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erreur serveur", err }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID invalide" }), {
      status: 400,
    });
  }

  try {
    await prisma.information.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erreur suppression", err }), {
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID invalide" }), {
      status: 400,
    });
  }

  try {
    const data = await req.json();

    const updated = await prisma.information.update({
      where: { id },
      data: {
        titre: data.titre,
        contenu: data.contenu,
        dateModification: new Date(), // mise à jour automatique de la date
      },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Échec de la mise à jour", err }),
      { status: 500 }
    );
  }
}
