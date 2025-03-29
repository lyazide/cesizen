// src/app/api/auth/[...nextauth]/route.ts
import prisma from "@/utils/db";
//import bcrypt from "bcrypt";
//import NextAuth from "next-auth";
//import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.username) {
          return null;
        }

        const user = await prisma.utilisateur.findFirst({
          where: {
            email: credentials?.username,
          },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
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
