// src/components/RecetteCard.tsx
import { Box, Heading, Text } from "@chakra-ui/react";

type InformationCardProps = {
  titre: string;
  contenu: string;
  dateCreation: Date;
  dateModification: Date;
};

const InformationCard: React.FC<InformationCardProps> = ({
  titre,
  contenu,
  dateCreation,
  dateModification,
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
        {titre}
      </Heading>
      <Text mt={2}>{dateCreation.toString()}</Text>
      <Text mt={2}>{dateModification.toString()}</Text>
      <Text mt={2}>{contenu}</Text>
    </Box>
  );
};

export default InformationCard;
