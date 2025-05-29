"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

// Définir le type Utilisateur
type Utilisateur = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  isActif: boolean;
  isAdministrateur: boolean;
};

const UserManagement = () => {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [formData, setFormData] = useState<
    Omit<Utilisateur, "id"> & { id: number | null }
  >({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    isActif: false,
    isAdministrateur: false,
  });

  // Récupérer les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/signup");
      const data: Utilisateur[] = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  // Suppression d'un utilisateur
  const handleDelete = async (id: number): Promise<void> => {
    const response = await fetch(`/api/signup?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Mise en place des données dans le formulaire pour l'édition
  const handleEdit = (user: Utilisateur): void => {
    setFormData(user);
  };

  return (
    <Box maxW="lg" mx="auto" mt={10}>
      <Heading textAlign="center" mb={6}>
        Gestion des Utilisateurs
      </Heading>

      <Box>
        <Flex bg="gray.200" p={2} fontWeight="bold">
          <Box flex="1">Nom</Box>
          <Box flex="1">Prénom</Box>
          <Box flex="2">Email</Box>
          <Box flex="1">Actif</Box>
          <Box flex="1">Admin</Box>
          <Box flex="1" textAlign="center">
            Actions
          </Box>
        </Flex>
        {users.map((user) => (
          <Flex key={user.id} p={2} borderBottom="1px solid #ccc">
            <Box flex="1">{formData.nom}</Box>
            <Box flex="1">{user.prenom}</Box>
            <Box flex="2">{user.email}</Box>
            <Box flex="1">{user.isActif ? "Oui" : "Non"}</Box>
            <Box flex="1">{user.isAdministrateur ? "Oui" : "Non"}</Box>
            <Box flex="1" textAlign="center">
              <Button
                size="sm"
                colorScheme="yellow"
                mr={2}
                onClick={() => handleEdit(user)}
              >
                Éditer
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(user.id)}
              >
                Supprimer
              </Button>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default UserManagement;
