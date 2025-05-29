// src/app/api/auth/[...nextauth]/route.ts
import prisma from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/*export*/ const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        motDePasse: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.motDePasse || !credentials?.email) {
          return null;
        }

        const user = await prisma.utilisateur.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.motDePasse, user.motDePasse))
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
