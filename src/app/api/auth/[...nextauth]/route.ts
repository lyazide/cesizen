import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";

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

          console.log("Utilisateur authentifié :", user);

          return {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            isActif: user.isActif,
            isAdministrateur: user.isAdministrateur,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.isActif = user.isActif ?? false;
        token.isAdministrateur = user.isAdministrateur ?? false;
      }

      console.log("JWT Token généré :", token);

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub,
        email: token.email,
        isActif: token.isActif ?? false,
        isAdministrateur: token.isAdministrateur ?? false,
      };

      console.log("Session mise à jour :", session);

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
