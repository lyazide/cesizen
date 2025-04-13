import { Box, Button, Text, Heading, VStack, Circle } from '@chakra-ui/react';

type EmotionDetailsProps = {
    id: number;
    nom: String;
    description: String;
    inspiration: Number;
    apnee: Number;
    expiration: Number;

  };
  
  

  const RespirationCard: React.FC<RespirationDetailsProps> = ({
    id,
    nom,
    description,
    inspiration,
    apne,
    expiration,
  }) => {
    console.log("Props received in EmotionCard:", {
      id,
      nom,
        description,
        inspiration,
        apne,
        expiration,
    });

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

export default RespirationCard;