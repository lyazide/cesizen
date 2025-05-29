import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import { CustomUser } from "@/types/auth";

// Define the authentication options separately
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
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
            name: user.nom ? `${user.prenom} ${user.nom}` : null,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as CustomUser;
        token.sub = typedUser.id.toString();
        token.email = typedUser.email;
        token.isActif = typedUser.isActif ?? false;
        token.isAdministrateur = typedUser.isAdministrateur ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: parseInt(token.sub as string, 10),
        email: token.email,
        isActif: token.isActif ?? false,
        isAdministrateur: token.isAdministrateur ?? false,
        name: session?.user?.name ?? undefined,
      } as Session["user"];
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
