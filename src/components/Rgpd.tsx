"use client"; // Indique que ce composant est un Client Component

import React from "react";
import { Text, Button, VStack } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

const Rgpd = () => {
  const handleDeleteData = () => {
    // Logique de suppression des données
    toaster.create({
      title: "Données supprimées",
      description:
        "Toutes vos données personnelles ont été supprimées avec succès.",
      //status: 'success',
      duration: 3000,
      //isClosable: true,
    });
  };

  return (
    <VStack gap={4} align="start">
      <Text>
        Nous respectons votre vie privée et nous nous engageons à protéger vos
        données personnelles conformément aux réglementations RGPD. Vos données
        ne seront jamais utilisées sans votre consentement explicite et vous
        avez le droit de demander leur suppression à tout moment.
      </Text>
      <Text>
        Si vous souhaitez en savoir plus sur vos droits et notre politique de
        confidentialité, veuillez consulter notre documentation officielle ou
        nous contacter directement.
      </Text>
      <Button colorScheme="red" onClick={handleDeleteData}>
        Supprimer toutes mes données
      </Button>
    </VStack>
  );
};

export default Rgpd;
