// src/components/RecetteCard.tsx
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

type DetenteCardProps = {
  nom: string;
  description: string;
  duree: number;
};

const DetenteCard: React.FC<DetenteCardProps> = ({
  nom,
  description,
  duree,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      background="lightgray"
    >
      <Heading as="h2" size="md">
        {nom}
      </Heading>
      <Text mt={2}>{description}</Text>
      <Flex mt={2} justifyContent="space-between">
        <Text>Duree : {duree} min</Text>
      </Flex>
    </Box>
  );
};

export default DetenteCard;
