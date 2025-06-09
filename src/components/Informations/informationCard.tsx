"use client";

// src/components/InformationCard.tsx strange
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";

type InformationCardProps = {
  titre: string;
  contenu: string;
  dateCreation: Date;
  dateModification: Date;
};

const convertirDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const InformationCard: React.FC<InformationCardProps> = ({
  titre,
  contenu,
  dateCreation,
}) => {
  return (
    <Center as="section" bg="brand.600" h="45vh">
      <Box maxW="420px" borderWidth="1px" borderRadius="lg" p="6" bg="brand.50">
        {/*
        <Image
          src="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Svartifoss Waterfall"
          borderRadius="xl"
          objectFit="cover"
          mx="auto"
        />
        */}
        <Text mt={2}>{convertirDate(dateCreation)}</Text>
        {/*}
        <HStack mt="5" gap="3">
          {["Waterfall", "Nature"].map((item) => (
            <Tag.Root key={item} variant="outline">
              {item}
            </Tag.Root>
          ))}
        </HStack>
        */}
        <Heading as="h2" size="md">
          {titre}
        </Heading>

        <Text mt={2} dangerouslySetInnerHTML={{ __html: contenu }}></Text>
        <Center my="6">
          <Button bg="brand.400" colorScheme="blue">
            Détails
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default InformationCard;
