"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Heading,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";

//import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";

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

type CheckedChangeDetails = {
  checked: boolean | "indeterminate";
};

const Edit = () => {
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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Récupérer les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/signup");
      const data: Utilisateur[] = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Gestion des changements dans les inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ): void => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Création d'un utilisateur
  const handleCreate = async (): Promise<void> => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const newUser: Utilisateur = await response.json();
      setUsers([...users, newUser]);
      setFormData({
        id: null,
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        isActif: false,
        isAdministrateur: false,
      });
    }
  };

  // Mise à jour d'un utilisateur
  const handleUpdate = async (): Promise<void> => {
    if (formData.id === null) return;

    const response = await fetch(`/api/signup?id=${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const updatedUser: Utilisateur = await response.json();
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setFormData({
        id: null,
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        isActif: false,
        isAdministrateur: false,
      });
      setIsEditing(false);
    }
  };

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
    setIsEditing(true);
  };

  return (
    <Box
      pt="80px"
      mx="auto"
      mt="80px"
      minWidth="100%"
      maxW="420px"
      borderWidth="1px"
      borderRadius="lg"
      p="6"
      bg="brand.600"
    >
      <Heading color="white" textAlign="center" mb={6}>
        Gestion des Utilisateurs
      </Heading>
      <VStack
        gap={4}
        mb={6}
        pt="10px"
        mx="auto"
        minWidth="90%"
        maxW="420px"
        borderWidth="1px"
        borderRadius="lg"
        p="6"
        bg="brand.50"
      >
        <Input
          placeholder="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          bg="white"
        />
        <Input
          placeholder="Prénom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          bg="white"
        />
        <Input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          bg="white"
        />
        <Input
          placeholder="Mot de Passe"
          name="motDePasse"
          type="password"
          value={formData.motDePasse}
          onChange={handleChange}
          bg="white"
        />
        <Checkbox.Root
          name="isActif"
          checked={formData.isActif}
          onCheckedChange={(details: CheckedChangeDetails) => {
            setFormData({ ...formData, isActif: details.checked === true });
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control bg="white" />
          <Checkbox.Label> Actif </Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root
          name="isAdministrateur"
          checked={formData.isAdministrateur}
          onCheckedChange={(details: CheckedChangeDetails) => {
            setFormData({
              ...formData,
              isAdministrateur: details.checked === true,
            });
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control bg="white" />
          <Checkbox.Label> Administrateur </Checkbox.Label>
        </Checkbox.Root>
        {isEditing ? (
          <Button colorScheme="blue" onClick={handleUpdate}>
            Mettre à jour
          </Button>
        ) : (
          <Button colorScheme="green" onClick={handleCreate}>
            Créer
          </Button>
        )}
      </VStack>
      <Box
        pt="10px"
        mx="auto"
        mt="10px"
        minWidth="90%"
        maxW="420px"
        borderWidth="1px"
        borderRadius="lg"
        p="6"
        bg="brand.50"
      >
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
              <Box flex="1">{user.nom}</Box>
              <Box flex="1">{user.prenom}</Box>
              <Box flex="2">{user.email}</Box>
              <Box flex="1">{user.isActif ? "Oui" : "Non"}</Box>
              <Box flex="1">{user.isAdministrateur ? "Oui" : "Non"}</Box>
              <Box flex="1" textAlign="center">
                <IconButton
                  colorScheme="red"
                  onClick={() => handleEdit(user)}
                  aria-label="Delete item"
                  variant="outline"
                >
                  <FaEdit />
                </IconButton>
                <IconButton
                  colorScheme="red"
                  onClick={() => handleDelete(user.id)}
                  aria-label="Delete item"
                  variant="outline"
                >
                  <FaTrash />
                </IconButton>
                {/*
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
              </Button>*/}
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Edit;
