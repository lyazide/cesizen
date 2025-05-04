import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 🔹 Définition des accès par rôle
const roleAccessMap: Record<string, string[]> = {
  admin: [
    "/",
    "/dashboard",
    "/api/dashboard",
    "/diagnostics",
    "/api/diagnostics",
    "/signin",
    "/signup",
    "/api/signup",

    "/informations",
    "/api/informations",
    "/informations/[id]", // Gestion dynamique des pages
    "/detentes",
    "/api/detentes",
    "/detentes/[id]", // Gestion dynamique des pages
    "/emotions",
    "/api/emotions",
    "/respirations",
    "/api/respirations",
  ],
  user: [
    "/",
    "/dashboard",
    "/api/dashboard",
    "/diagnostics",
    "/api/diagnostics",

    "/signin",
    "/signup",
    "/api/signup",
    "/informations",
    "/api/informations",
    "/informations/[id]", // Ajout de pages dynamiques
    "/detentes",
    "/api/detentes",
    "/detentes/[id]", // Ajout de pages dynamiques
    "/emotions",
    "/api/emotions",
    "/respirations",
    "/api/respirations",
  ],
  guest: [
    "/",
    "/diagnostics",
    "/api/diagnostics",
    "/signin",
    "/signup",
    "/api/signup",
    "/informations",
    "/api/informations",
    "/informations/[id]", // Autorisation pour les invités
    "/detentes",
    "/api/detentes",
    "/detentes/[id]", // Autorisation pour les invités
  ],
};

// 🔹 Page d'accueil par rôle
const defaultPages: Record<string, string> = {
  admin: "/dashboard",
  user: "/dashboard",
  guest: "/signin",
};

// 🔍 Vérifie si une URL correspond aux droits d'accès d'un rôle
function doesRoleHaveAccessToURL(role: string, url: string): boolean {
  const accessibleRoutes = roleAccessMap[role] || [];

  return accessibleRoutes.some((route) => {
    if (route.includes("[id]")) {
      const dynamicRoutePattern = route
        .replace("[id]", "[^/]+")
        .replace("/", "\\/");
      const regex = new RegExp(`^${dynamicRoutePattern}$`);
      return regex.test(url);
    }

    return route === url;
  });
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const urlPath = req.nextUrl.pathname;

  console.log("🔹 URL demandée :", urlPath);
  console.log("🔹 Token data :", token);

  if (!token) {
    // 🔹 Vérifier les droits des invités
    if (!doesRoleHaveAccessToURL("guest", urlPath)) {
      console.log(
        `🔹 Invité bloqué sur : ${urlPath}, redirection vers ${defaultPages["guest"]}`
      );
      return NextResponse.redirect(new URL(defaultPages["guest"], req.url));
    }
  } else {
    const { isAdministrateur, isActif } = token;
    const role = isAdministrateur ? "admin" : "user";

    if (isActif === false) {
      return NextResponse.json({ error: "Compte inactif" }, { status: 403 });
    }

    // 🔹 Vérification des accès
    if (!doesRoleHaveAccessToURL(role, urlPath)) {
      console.log(
        `🔹 Accès refusé : ${urlPath}, redirection vers ${defaultPages[role]}`
      );
      return NextResponse.redirect(new URL(defaultPages[role], req.url));
    }
  }

  return NextResponse.next();
}

// 🔹 Exclusion des fichiers statiques
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)", // Exclut les routes NextAuth
  ],
};
