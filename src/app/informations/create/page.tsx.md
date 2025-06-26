"use client";

import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Container,
  Text, // Importez le composant Text pour les messages de feedback
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header/Header";

const CreateInformationPage = () => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedbackMessage(""); // Réinitialiser le message de feedback
    setIsError(false);

    try {
      const response = await fetch("/api/informations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          contenu,
          dateCreation: new Date(),
          dateModification: new Date(),
        }),
      });

      if (response.ok) {
        setFeedbackMessage("L'information a été ajoutée avec succès.");
        router.push("/informations");
      } else {
        const errorData = await response.json();
        setFeedbackMessage(
          errorData?.error ||
            "Une erreur est survenue lors de la création de l'information."
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
      setFeedbackMessage("Une erreur inattendue s'est produite.");
      setIsError(true);
    }
  };

  return (
    <Box as="main" flex="1">
      <Container
        as="main"
        backgroundColor={"brand.600"}
        padding="0px"
        pt="130px"
        minHeight="100vh"
        maxW="100%"
        height="auto"
        boxShadow="lg"
        overflow="auto"
        pb={8}
      >
        <Header name="Créer une nouvelle information" />
        <Box p={4}>
          <Heading as="h2" mb={4}>
            Créer une nouvelle information
          </Heading>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="titre">Titre :</label>
              <Input
                type="text"
                id="titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                mb={2}
              />
            </div>

            <div>
              <label htmlFor="contenu">Contenu :</label>
              <Textarea
                id="contenu"
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
                rows={5}
                required
                mb={4}
              />
            </div>

            <Button type="submit" colorScheme="teal">
              Créer
            </Button>

            {feedbackMessage && (
              <Text mt={4} color={isError ? "red.500" : "green.500"}>
                {feedbackMessage}
              </Text>
            )}
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateInformationPage;
