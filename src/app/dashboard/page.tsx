import React from "react";

import Footer from "../../components/Footer/Footer";
import Dashboard from "../../components/Dashboard/dashboard";
/*import TestSession from "../../components/testcomponent";*/
import { Box, Container } from "@chakra-ui/react";
import Header from "../../components/Header/Header";

export default function Page() {
  return (
    <Box as="main" flex="1">
      <Container
        as="main"
        backgroundColor={"brand.600"}
        padding="0px"
        pt="130px"
        minHeight="100vh"
        maxW="100%" // 90% de la largeur de l'écran
        height="100vh" // 90% de la hauteur de l'écran
        boxShadow="lg" // Ombre pour un effet esthétique
        //borderRadius="lg" // Coins arrondis
        overflow="auto" // Permettre le défilement si contenu trop long
        //p={6} // Padding interne
      >
        <Header name="Tableau de bord" />
        <Box p={4}>
          <Box
            backgroundColor={"brand.500"}
            // Centrer verticalement
          >
            <Dashboard />
          </Box>
          <Footer />
        </Box>
      </Container>
    </Box>
  );
}
