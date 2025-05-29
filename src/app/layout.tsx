"use client"; //Indique que ce composant est un Client Component dans Next.js.

// Importation de bibliothèques et de composants nécessaires
import { Provider } from "../components/ui/provider"; // Un composant personnalisé utilisé pour fournir le contexte global de l'application.
import { Block } from "../components/Header/Block"; //Un composant comportant notre barre de navigation
import Footer from "../components/Footer/Footer"; // Un composant de pied de page personnalisé
import { SessionProvider } from "next-auth/react"; // Un composant de fournisseur de session pour gérer l'authentification des utilisateurs
import { Box } from "@chakra-ui/react"; // Un composant de boîte de Chakra UI pour la mise en page
import { Suspense } from "react";
import Loading from "./loading"; // Un composant de chargement personnalisé

// Déclare un composant fonctionnel RootLayout qui prend children comme prop.
// children représente tous les composants et pages qui seront affichés dans l'application.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      {/* permet d'éviter les avertissements liés à l'hydratation des composants Next.js.*/}
      <body>
        <SessionProvider>
          {/* Encapsule toute l'application pour gérer l'authentification de l'utilisateur.*/}
          <Provider>
            {/*Un contexte global pour gérer les états ou les thèmes.*/}
            <Box display="flex" flexDirection="column" minHeight="100vh">
              {/*Structure d'affichage */}
              <Block /> {/* Composant Barre de navigation */}
              <Suspense fallback={<Loading />}>
                {children} {/* Toutes les pages seront encapsulées */}
              </Suspense>
              {/* prop qui permet d'afficher le contenu de chaque page*/}
              <Footer /> {/* Composant Pour le pied  de page */}
            </Box>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
