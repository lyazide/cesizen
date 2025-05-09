/**
 * @file ExerciseRespiration.tsx
 * @description Composant React pour un exercice de respiration guidé.
 * Implémente une séquence de respiration en trois phases (inspiration, rétention, expiration)
 * avec visualisation, minuteur et sélection d'exercices depuis l'API.
 */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
/**
 * Interface définissant un exercice de respiration récupéré depuis l'API
 */
interface Respiration {
  id: number;
  nom: string;
  description: string;
  inspiration: number;
  retention: number;
  expiration: number;
  apnee: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface définissant une étape de l'exercice de respiration
 * @property {string} name - Nom de l'étape (Inspiration, Rétention, Expiration)
 * @property {number} duration - Durée de l'étape en secondes
 */
interface Step {
  name: string;
  duration: number;
}

/**
 * Composant principal de l'exercice de respiration
 * Gère le cycle des étapes, le minuteur associé et la sélection d'exercices
 */
const ExerciseRespiration: React.FC = () => {
  // États pour gérer les données et les interactions
  const [respirations, setRespirations] = useState<Respiration[]>([]);
  const [selectedRespiration, setSelectedRespiration] =
    useState<Respiration | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  //const [/*error,*/ setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "warning" | "info" | "success";
  } | null>(null);

  // Générer les étapes basées sur l'exercice de respiration sélectionné
  const steps = useMemo<Step[]>(() => {
    if (!selectedRespiration) {
      return [
        { name: "Inspiration", duration: 4 },
        { name: "Rétention", duration: 4 },
        { name: "Expiration", duration: 7 },
      ];
    }

    return [
      { name: "Inspiration", duration: selectedRespiration.inspiration },
      { name: "Rétention", duration: selectedRespiration.apnee },
      { name: "Expiration", duration: selectedRespiration.expiration },
    ];
  }, [selectedRespiration]);

  /**
   * Récupérer les exercices de respiration depuis l'API
   */
  useEffect(() => {
    const fetchRespirations = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/respirations");

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des exercices de respiration"
          );
        }

        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setRespirations(result.data);

          // Sélectionner le premier exercice par défaut s'il existe
          if (result.data.length > 0) {
            setSelectedRespiration(result.data[0]);
            setCount(result.data[0].inspiration);
          }
        } else {
          throw new Error("Format de données invalide");
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Une erreur est survenue";
        /*setError(errorMsg);*/
        setNotification({
          message: errorMsg,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRespirations();
  }, []);

  // Effet pour masquer la notification après 5 secondes
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  /**
   * Gestion du changement d'exercice de respiration
   */
  const handleRespirationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const respirationId = parseInt(e.target.value, 10);
    const selected = respirations.find((r) => r.id === respirationId) || null;

    setSelectedRespiration(selected);
    setIsRunning(false);
    setStepIndex(0);

    if (selected) {
      setCount(selected.inspiration);
    }
  };

  /**
   * Effet pour gérer le minuteur et la progression des étapes
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            if (stepIndex < steps.length - 1) {
              setStepIndex(stepIndex + 1);
              return steps[stepIndex + 1].duration;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, stepIndex, steps]);

  /**
   * Démarre l'exercice de respiration depuis le début
   */
  const startExercise = (): void => {
    if (!selectedRespiration) {
      setNotification({
        message: "Veuillez sélectionner un exercice de respiration",
        type: "warning",
      });
      return;
    }

    setStepIndex(0);
    setCount(steps[0].duration);
    setIsRunning(true);
  };

  /**
   * Obtient la couleur de fond pour les notifications selon le type
   */
  const getNotificationColor = (type: string): string => {
    switch (type) {
      case "error":
        return "#F56565"; // Équivalent de red.500
      case "warning":
        return "#ED8936"; // Équivalent de orange.500
      case "success":
        return "#48BB78"; // Équivalent de green.500
      case "info":
      default:
        return "#4299E1"; // Équivalent de blue.500
    }
  };

  /**
   * Obtient la couleur du cercle en fonction de l'étape
   */
  const getCircleColor = (stepName: string): string => {
    switch (stepName) {
      case "Inspiration":
        return "#90CDF4"; // Bleu clair (équivalent brand.300)
      case "Rétention":
        return "#63B3ED"; // Bleu moyen (équivalent brand.400)
      case "Expiration":
        return "#4299E1"; // Bleu foncé (équivalent brand.500)
      default:
        return "#4299E1";
    }
  };

  // Rendu du composant
  return (
    <Flex
      as="main"
      flex="1"
      direction="column"
      align="center"
      justify="center"
      bg="brand.600"
      minH="100vh"
      p={6}
    >
      <Header name="Exercice de Respiration" />
      {notification && (
        <Box
          bg={getNotificationColor(notification.type)}
          color="white"
          borderRadius="md"
          p={4}
          mb={4}
          textAlign="center"
          maxWidth="md"
          width="100%"
        >
          <Text>{notification.message}</Text>
        </Box>
      )}

      <Box
        bg="brand.50"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxWidth="md"
        width="100%"
        textAlign="center"
      >
        {loading ? (
          <Flex justify="center" align="center">
            <Spinner size="xl" color="brand.500" />
          </Flex>
        ) : (
          <Flex direction="column" align="center">
            {/* Sélecteur d'exercice de respiration */}
            <select
              value={selectedRespiration?.id ?? ""}
              onChange={handleRespirationChange}
              disabled={isRunning}
              //mb={4}
              //placeholder="Sélectionnez un exercice"
              //size="lg"
            >
              {respirations.map((respiration) => (
                <option key={respiration.id} value={respiration.id}>
                  {respiration.nom} : {respiration.description}
                </option>
              ))}
            </select>

            {/* Visualisation de l'exercice avec animation */}
            <Flex position="relative" direction="column" align="center" mb={6}>
              <motion.div
                animate={{
                  scale: isRunning ? [1, 1.1, 1] : 1,
                  opacity: isRunning ? [1, 0.8, 1] : 1,
                }}
                transition={{
                  duration: isRunning ? steps[stepIndex]?.duration : 0,
                  repeat: isRunning ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <Box
                  width="100px"
                  height="100px"
                  borderRadius="full"
                  bg={getCircleColor(steps[stepIndex]?.name || "")}
                  mb={2}
                />
              </motion.div>
              <Text fontSize="xl" fontWeight="bold" color="brand.500">
                {steps[stepIndex]?.name || "Terminé"}
              </Text>
            </Flex>

            {/* Affichage du compte à rebours */}
            <Text fontSize="3xl" fontWeight="bold" color="brand.500" mb={4}>
              {count > 0 ? count : ""}
            </Text>

            {/* Bouton pour démarrer l'exercice */}
            <Button
              onClick={startExercise}
              disabled={isRunning || !selectedRespiration}
              bg="teal.500"
              color="white"
              fontWeight="bold"
              size="lg"
              borderRadius="md"
              _hover={{ bg: "teal.600" }}
              cursor={
                isRunning || !selectedRespiration ? "not-allowed" : "pointer"
              }
              opacity={isRunning || !selectedRespiration ? 0.7 : 1}
            >
              {isRunning ? "En cours..." : "Commencer"}
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default ExerciseRespiration;
