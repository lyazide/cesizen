"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  Heading,
  Text,
  Container,
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
    <Box as="main" flex="1">
      <Container
        as="main"
        backgroundColor={"brand.600"}
        padding="0px"
        pt="130px"
        minHeight="100vh"
        maxW="100%" // 90% de la largeur de l'écran
        height="100vh" // 90% de la hauteur de l'écran
        boxShadow="lg" // Ombre pour un effet esthétique
        borderRadius="lg" // Coins arrondis
        overflow="auto" // Permettre le défilement si contenu trop long
        //p={6} // Padding interne
      >
        <Box
          maxW="md"
          mx="auto"
          mt={10}
          p={5}
          boxShadow="lg"
          borderRadius="md"
          backgroundColor={"brand.50"}
        >
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

          <Button
            colorScheme="teal"
            width="full"
            onClick={handleSignIn}
            backgroundColor={"brand.600"}
          >
            Se connecter
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
