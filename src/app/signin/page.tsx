"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  Heading,
  Text,
} from "@chakra-ui/react";

const SignIn = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="md">
      <Heading textAlign="center" mb={6}>
        Connexion
      </Heading>
      <Text>Email</Text>
      <InputGroup mb={4}>
        <Input type="email" placeholder="Entrez votre email" />
      </InputGroup>
      <Text>Mot de passe</Text>
      <InputGroup mb={6}>
        <Input type="password" placeholder="Entrez votre mot de passe" />
      </InputGroup>
      <Button
        colorScheme="teal"
        width="full"
        onClick={() => console.log("Connexion...")}
      >
        Se connecter
      </Button>
    </Box>
  );
};

export default SignIn;
