import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";
//import { RequestInternal } from "next-auth/core/types";
//import { Awaitable } from "next-auth/lib/utils";

/*added for debug*/
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string;
      email?: string;
      image?: string;
      isActif: boolean;
      isAdministrateur: boolean;
    };
  }

  interface JWT {
    sub: string;
    email?: string;
    isActif: boolean;
    isAdministrateur: boolean;
  }
}
/*end added for debug*/
// Définir les types pour l'utilisateur (correspondant à ce que NextAuth attend)
interface CustomUser extends Omit<User, "id"> {
  nom: string;
  prenom: string;
  isActif: boolean;
  isAdministrateur: boolean;
  id: number;
  name?: string | null; // Ajouter la propriété name avec le type approprié
  email?: string | null; // Ajouter email si ce n'est pas déjà dans User
  image?: string | null; // Ajouter image si ce n'est pas déjà dans User
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials /*, req*/): Promise<CustomUser | null> {
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

          //console.log("Utilisateur authentifié :", user);

          // Retourner un objet conforme à l'interface CustomUser
          return {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            isActif: user.isActif,
            isAdministrateur: user.isAdministrateur,
            name: user.nom ? `${user.prenom} ${user.nom}` : null, // Exemple de construction du nom
            // image: user.imageURL, // Si vous avez une image
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

      //console.log("JWT Token généré :", token);

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: parseInt(token.sub as string, 10),
        email: token.email,
        isActif: token.isActif ?? false,
        isAdministrateur: token.isAdministrateur ?? false,
        name: session?.user?.name ?? undefined, // Conserver le nom si possible
        // image: session?.user?.image ?? null, // Conserver l'image si possible
      } as Session["user"]; // Cast ici aussi

      //console.log("Session mise à jour :", session);

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

/*export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);*/
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
