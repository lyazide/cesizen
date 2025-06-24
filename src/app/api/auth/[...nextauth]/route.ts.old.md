import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import type { CustomUser } from "@/types/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await prisma.utilisateur.findFirst({
          where: { email: credentials.username },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.motDePasse))
        ) {
          if (!user.isActif) {
            throw new Error(
              "Votre compte est inactif. Veuillez contacter l'administrateur."
            );
          }

          return {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            isActif: user.isActif,
            isAdministrateur: user.isAdministrateur,
          } as CustomUser;
        }

        return null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
