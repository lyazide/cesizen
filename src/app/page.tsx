import React from "react";
import Header from "../components/Header/Header";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import InformationDetails from "../components/Informations/InformationDetails";

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
        <Header name="Acccueil" />
        <Box p={4} marginTop="80px">
          <SimpleGrid minChildWidth="sm" gap="20px">
            <InformationDetails
              titre="ceci est un titre"
              contenu="ceci est un contenu"
            />
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
