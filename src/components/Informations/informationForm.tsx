"use client";

import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function InformationForm({
  mode = "create",
}: {
  mode: "create" | "edit";
}) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Charger les données existantes en mode édition
  useEffect(() => {
    if (mode === "edit" && id) {
      fetch(`/api/informations/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitre(data.titre);
          setContenu(data.contenu);
        })
        .catch(() => {
          setFeedbackMessage("Impossible de charger les données.");
          setIsError(true);
        });
    }
  }, [id, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage("");
    setIsError(false);

    const endpoint =
      mode === "edit" ? `/api/informations/${id}` : "/api/informations";
    const method = mode === "edit" ? "PUT" : "POST";

    const body = {
      titre,
      contenu,
      ...(mode === "create"
        ? { dateCreation: new Date(), dateModification: new Date() }
        : { dateModification: new Date() }),
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const redirectUrl =
          mode === "create" ? "/informations" : `/informations/${id}`;
        router.push(redirectUrl);
      } else {
        const errorData = await res.json();
        setFeedbackMessage(errorData.error || "Erreur inattendue.");
        setIsError(true);
      }
    } catch {
      setFeedbackMessage("Échec de la requête.");
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
        <Heading as="h2" mb={6} textAlign="center" style={{ color: "white" }}>
          {mode === "create"
            ? "Créer une nouvelle information"
            : "Modifier l'information"}
        </Heading>

        <form onSubmit={handleSubmit}>
          <Input
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            required
            mb={3}
            backgroundColor="white"
          />
          <Textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Contenu"
            rows={6}
            required
            mb={4}
            backgroundColor="white"
          />
          <Button type="submit" colorScheme="teal" w="100%">
            {mode === "create" ? "Créer" : "Enregistrer"}
          </Button>

          {feedbackMessage && (
            <Text mt={4} color={isError ? "red.400" : "green.400"}>
              {feedbackMessage}
            </Text>
          )}
        </form>
      </Container>
    </Box>
  );
}
