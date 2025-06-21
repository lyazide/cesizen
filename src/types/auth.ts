import { User } from "next-auth";

export interface CustomUser extends Omit<User, "id"> {
  nom: string;
  prenom: string;
  isActif: boolean;
  isAdministrateur: boolean;
  id: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// Extend NextAuth session type
declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
  interface JWT {
    sub: string;
    email?: string;
    name?: string;
    image?: string;
    nom: string;
    prenom: string;
    isActif: boolean;
    isAdministrateur: boolean;
  }
}
