import prisma from "@/utils/db";
import bcrypt from "bcrypt";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const { currentPassword, newPassword } = await req.json();

  const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
  if (!utilisateur) {
    return new Response("Utilisateur introuvable", { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, utilisateur.motDePasse);
  if (!valid) {
    return new Response("Mot de passe actuel incorrect", { status: 401 });
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.utilisateur.update({
    where: { id },
    data: { motDePasse: newHashedPassword },
  });

  return new Response("Mot de passe mis à jour", { status: 200 });
}
