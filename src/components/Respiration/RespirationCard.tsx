import { Box, Button, Text, Heading, Circle, Center } from "@chakra-ui/react";

type RespirationDetailsProps = {
  id: number;
  nom: string;
  description: string;
  inspiration: number;
  apnee: number;
  expiration: number;
};

// Correction : "apne" changé en "apnee" pour cohérence avec les propriétés
const RespirationCard: React.FC<RespirationDetailsProps> = ({
  id,
  nom,
  description,
  inspiration,
  apnee,
  expiration,
}) => {
  console.log("Props received in RespirationCard:", {
    id,
    nom,
    description,
    inspiration,
    apnee,
    expiration,
  });

  // Vérification de l'existence des variables utilisées
  const steps = [
    { name: "Inspiration" },
    { name: "Apnée" },
    { name: "Expiration" },
  ];
  const stepIndex = 0; // Exemple statique, à adapter à votre logique
  const count = 3; // Exemple statique, à adapter à votre logique
  const isRunning = false;
  const startExercise = () => console.log("Exercice démarré");

  return (
    <Center as="section" bg="brand.50" h="45vh">
      <Box maxW="420px" borderWidth="1px" borderRadius="lg" p="6" bg="brand.50">
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
      </Box>
    </Center>
  );
};

export default RespirationCard;
