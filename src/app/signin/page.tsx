"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  Heading,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username: email,
      password: password,
    });

    if (result?.error) {
      console.error("Erreur de connexion :", result.error);
    } else {
      console.log("Connexion réussie !");
      window.location.href = "/dashboard"; // Redirige après connexion
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="md">
      <Heading textAlign="center" mb={6}>
        Connexion
      </Heading>

      <Text>Email</Text>
      <InputGroup mb={4}>
        <Input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      <Text>Mot de passe</Text>
      <InputGroup mb={6}>
        <Input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <Button colorScheme="teal" width="full" onClick={handleSignIn}>
        Se connecter
      </Button>
    </Box>
  );
};

export default SignIn;
