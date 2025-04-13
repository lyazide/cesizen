/**
 * @file ExerciseRespiration.tsx
 * @description Composant React pour un exercice de respiration guidé
 * Implémente une séquence de respiration en trois phases (inspiration, rétention, expiration)
 * avec visualisation, minuteur et sélection d'exercices depuis l'API.
 */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

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
  const [error, setError] = useState<string | null>(null);
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
        { name: "Retention", duration: 4 },
        { name: "Expiration", duration: 7 },
      ];
    }

    return [
      { name: "Inspiration", duration: selectedRespiration.inspiration },
      { name: "Retention", duration: selectedRespiration.apnee },
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
        setError(errorMsg);
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
      case "Retention":
        return "#63B3ED"; // Bleu moyen (équivalent brand.400)
      case "Expiration":
        return "#4299E1"; // Bleu foncé (équivalent brand.500)
      default:
        return "#4299E1";
    }
  };

  // Rendu du composant
  return (
    <div
      style={{
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
        background: "#F7FAFC",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {/* En-tête de l'exercice */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontFamily: "Pacifico, cursive",
          textAlign: "center",
        }}
      >
        Exercice de Respiration
      </h1>

      {/* Notification simple */}
      {notification && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: getNotificationColor(notification.type),
            color: "white",
            borderRadius: "0.375rem",
            width: "100%",
            maxWidth: "400px",
            marginBottom: "1rem",
          }}
        >
          <p>{notification.message}</p>
        </div>
      )}

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "4px solid #E2E8F0",
              borderTopColor: "#4299E1",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : (
        <>
          {/* Sélecteur d'exercice de respiration */}
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <select
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #E2E8F0",
                marginBottom: "1rem",
                backgroundColor: "white",
              }}
              value={selectedRespiration?.id ?? ""}
              onChange={handleRespirationChange}
              disabled={isRunning}
            >
              <option value="" disabled>
                Sélectionnez un exercice
              </option>
              {respirations.map((respiration) => (
                <option key={respiration.id} value={respiration.id}>
                  {respiration.nom} : {respiration.description}
                </option>
              ))}
            </select>

            {selectedRespiration && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4A5568",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {selectedRespiration.description}
              </p>
            )}
          </div>

          {/* Visualisation de l'exercice avec animation */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: getCircleColor(steps[stepIndex]?.name || ""),
                  marginBottom: "1rem",
                }}
              />
            </motion.div>
            <p style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
              {steps[stepIndex]?.name || "Terminé"}
            </p>
          </div>

          {/* Affichage du compte à rebours */}
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2B6CB0",
            }}
          >
            {count > 0 ? count : ""}
          </p>

          {/* Bouton pour démarrer l'exercice */}
          <button
            onClick={startExercise}
            disabled={isRunning || !selectedRespiration}
            style={{
              backgroundColor: "#38B2AC",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              fontWeight: "bold",
              cursor:
                isRunning || !selectedRespiration ? "not-allowed" : "pointer",
              opacity: isRunning || !selectedRespiration ? 0.7 : 1,
            }}
          >
            {isRunning ? "En cours..." : "Commencer"}
          </button>
        </>
      )}
    </div>
  );
};

export default ExerciseRespiration;
