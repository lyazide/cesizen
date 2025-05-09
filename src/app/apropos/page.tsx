import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Rgpd from "../../components/Rgpd"; // Import du composant réutilisable
import Title from "../../components/Header";

const GDPRPage = () => {
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
        borderRadius="lg" // Coins arrondis
        overflow="auto" // Permettre le défilement si contenu trop long
        //p={6} // Padding interne
      >
        <Title name="Politique de Confidentialité - CesiZen" />
        <Rgpd />
      </Container>
    </Box>
  );
};

export default GDPRPage;
