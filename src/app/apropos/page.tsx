import React from "react";
import { Container, VStack, Heading } from "@chakra-ui/react";
import Rgpd from "../../components/Rgpd"; // Import du composant réutilisable

const GDPRPage = () => {
  return (
    <Container maxW="container.md" py={10}>
      <VStack gap={8} align="start">
        <Heading as="h1" size="xl">
          Règles de confidentialité
        </Heading>
        <Rgpd />
      </VStack>
    </Container>
  );
};

export default GDPRPage;
