"use client";

import { useState } from "react";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";

const Signup = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("Utilisateur créé avec succès !");
      } else {
        setMessage("Erreur lors de la création de l'utilisateur.");
      }
    } catch (error) {
      setMessage("Une erreur s'est produite.");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="md">
      <Heading textAlign="center" mb={6}>
        Inscription
      </Heading>
      <VStack gap={4}>
        <Box>
          <Text>Nom</Text>
          <Input name="nom" type="text" onChange={handleChange} />
        </Box>
        <Box>
          <Text>Prénom</Text>
          <Input name="prenom" type="text" onChange={handleChange} />
        </Box>
        <Box>
          <Text>Email</Text>
          <Input name="email" type="email" onChange={handleChange} />
        </Box>
        <Box>
          <Text>Mot de passe</Text>
          <Input name="motDePasse" type="password" onChange={handleChange} />
        </Box>
        <Button colorScheme="teal" width="full" onClick={handleSubmit}>
          S inscrire
        </Button>
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
};

export default Signup;
