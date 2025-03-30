// src/components/RecetteDetails.tsx
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Flex,
  Separator,
} from "@chakra-ui/react";

type RecetteDetailsProps = {
  name: string;
  description: string;
  difficulty: number;
  time: number;
  autheur: {
    email: string;
  };
  ingredients: {
    id: number;
    name: string;
    quantity: string;
  }[];
  etapes: {
    id: number;
    instruction: string;
  }[];
};

const RecetteDetails: React.FC<RecetteDetailsProps> = ({
  name,
  description,
  difficulty,
  time,
  autheur,
  ingredients,
  etapes,
}) => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        {name}
      </Heading>
      <Text fontSize="lg" mb={2}>
        {description}
      </Text>
      <Flex mb={4} justifyContent="space-between">
        <Text>Difficulté : {difficulty}</Text>
        <Text>Temps : {time} min</Text>
      </Flex>
      <Separator my={4} />
      <Box mb={4}>
        <Heading as="h2" size="md" mb={2}>
          Auteur
        </Heading>
        <Text>{autheur.email}</Text>
      </Box>
      <Separator my={4} />
      <Box mb={4}>
        <Heading as="h2" size="md" mb={2}>
          Ingrédients
        </Heading>
        <List.Root gap="40px">
          {ingredients.map((ingredient) => (
            <ListItem key={ingredient.id}>
              {ingredient.name} - {ingredient.quantity}
            </ListItem>
          ))}
        </List.Root>
      </Box>
      <Separator my={4} />
      <Box>
        <Heading as="h2" size="md" mb={2}>
          Étapes
        </Heading>
        <List.Root gap="40px">
          {etapes.map((etape, index) => (
            <ListItem key={etape.id}>
              {index + 1}. {etape.instruction}
            </ListItem>
          ))}
        </List.Root>
      </Box>
    </Box>
  );
};

export default RecetteDetails;
