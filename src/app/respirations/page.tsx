"use client";

import { Box, Button, Text, Heading, VStack, Circle } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";

interface Step {
  name: string;
  duration: number;
}

const BreathingExercise: React.FC = () => {
  const steps = useMemo<Step[]>(
    () => [
      { name: "Inspiration", duration: 4 },
      { name: "Retention", duration: 4 },
      { name: "Expiration", duration: 7 }, // Corresponds to Rétention
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(steps[0].duration);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    console.log("Component mounted");
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            if (stepIndex < steps.length - 1) {
              setStepIndex((prevStep) => prevStep + 1);

              clearInterval(interval);
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

  const startExercise = (): void => {
    setStepIndex(0);
    setCount(steps[0].duration);
    setIsRunning(true);
  };

  return (
    <VStack gap={4} align="center" p={6}>
      <Heading fontSize="xl" fontFamily="Pacifico">
        Exercice de Respiration
      </Heading>
      <Text fontSize="md" color="gray.600">
        Suivez les étapes pour vous détendre.
      </Text>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Circle size="100px" bg="blue.500" mb={4} />
        <Text fontSize="lg" fontWeight="bold">
          {steps[stepIndex]?.name || "Terminé"}
        </Text>
      </Box>
      <Text fontSize="2xl" fontWeight="bold" color="red.500">
        {count > 0 ? count : ""}
      </Text>
      <Button onClick={startExercise} colorScheme="teal" disabled={isRunning}>
        {isRunning ? "En cours..." : "Commencer"}
      </Button>
    </VStack>
  );
};

export default BreathingExercise;
