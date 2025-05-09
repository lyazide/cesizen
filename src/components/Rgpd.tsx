"use client"; // Indique que ce composant est un Client Component

import React from "react";
import { Text, Box, Heading, List, Button } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import Header from "./Header";

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
    <Box p={6} maxW="800px" mx="auto" bg="brand.50">
      <Text fontSize="lg" mb={6}>
        Nous respectons votre vie privée et nous nous engageons à protéger vos
        données personnelles conformément aux réglementations RGPD. Vos données
        ne seront jamais utilisées sans votre consentement explicite et vous
        avez le droit de demander leur suppression à tout moment.
      </Text>

      <Heading as="h3" size="lg" mt={6} mb={4}>
        1. Introduction
      </Heading>
      <Text>
        Bienvenue sur CESIZEN. Afin d’améliorer votre expérience et de vous
        offrir un service personnalisé, nous collectons certaines données vous
        concernant. Nous nous engageons à les protéger et à respecter votre vie
        privée conformément au Règlement Général sur la Protection des Données
        (RGPD).
      </Text>

      <Heading as="h3" size="lg" mt={6} mb={4}>
        2. Données collectées
      </Heading>
      <List.Root gap={3}>
        <List.Item>
          🔹 Données personnelles : Nom, prénom, adresse e-mail.
        </List.Item>
        <List.Item>
          🔹 Données de navigation : aucune données de ce type est collectée
        </List.Item>
        <List.Item>
          🔹 Données comportementales : Resultat des exercices et exercises de
          détente favoris
        </List.Item>
      </List.Root>

      <Heading as="h3" size="lg" mt={6} mb={4}>
        3. Finalité de l’utilisation des données
      </Heading>
      <List.Root gap={3}>
        <List.Item>
          ✅ Améliorer votre expérience : Personnalisation du contenu et
          recommandations adaptées.
        </List.Item>
        <List.Item>
          ✅ Fournir nos services : Assurer l’accès sécurisé à l’application et
          répondre à vos demandes.
        </List.Item>
        <List.Item>
          ✅ Analyser et optimiser nos performances : Suivi des usages et
          amélioration des fonctionnalités.
        </List.Item>
        <List.Item>
          ✅ Respecter nos obligations légales : Conformité avec la législation
          en vigueur.
        </List.Item>
      </List.Root>

      <Heading as="h3" size="lg" mt={6} mb={4}>
        4. Partage et conservation des données
      </Heading>
      <Text>
        Nous ne partageons jamais vos données sans votre consentement, sauf dans
        les cas suivants :
      </Text>
      <List.Root gap={3}>
        <List.Item>
          🔹 Prestataires techniques pour garantir la maintenance et la sécurité
          du service.
        </List.Item>
        <List.Item>
          🔹 Autorités légales en cas d’obligation réglementaire.
        </List.Item>
      </List.Root>
      <Text>
        Vos données sont conservées <strong>pendant 12 mois</strong>, puis
        anonymisées ou supprimées.
      </Text>

      <Heading as="h3" size="lg" mt={6} mb={4}>
        5. Vos droits
      </Heading>
      <List.Root gap={3}>
        <List.Item>
          🛡️ Droit d’accès : Vous pouvez demander une copie des données
          collectées.
        </List.Item>
        <List.Item>
          🛡️ Droit de rectification : Vous pouvez modifier vos informations.
        </List.Item>
        <List.Item>
          🛡️ Droit à l’effacement : Vous pouvez demander la suppression de vos
          données.
        </List.Item>
        <List.Item>
          🛡️ Droit à la portabilité : Vous pouvez récupérer vos données pour les
          transférer.
        </List.Item>
      </List.Root>

      <Text mt={6}>
        Si vous souhaitez en savoir plus sur vos droits et notre politique de
        confidentialité, veuillez consulter notre documentation officielle ou{" "}
        <strong>nous contacter directement</strong>.
      </Text>

      <Box display="flex" justifyContent="center">
        <Button
          colorScheme="red"
          onClick={handleDeleteData}
          bg="brand.600"
          mt={4}
        >
          Supprimer toutes mes données
        </Button>
      </Box>
    </Box>
  );
};

export default Rgpd;
