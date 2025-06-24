"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  HStack,
  Checkbox,
  Container,
  Center,
  Text,
} from "@chakra-ui/react";
import Header from "../../components/Header/Header";
import { useMediaQuery } from "@chakra-ui/react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]); // Définir un breakpoint pour les écrans mobiles

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
    <Box as="main" flex="2">
      <Container
        as="main"
        backgroundColor={"brand.600"}
        padding="0px"
        pt="130px"
        minHeight="100vh"
        maxW="100%" // 90% de la largeur de l'écran
        height="100vh" // 90% de la hauteur de l'écran
        boxShadow="lg" // Ombre pour un effet esthétique
        //borderRadius="lg" // Coins arrondis
        overflow="auto" // Permettre le défilement si contenu trop long
        //p={6} // Padding interne
      >
        <Header name="Gestion des Utilisateurs" />
        <Center as="section" bg="brand.600" h="calc(100vh - 130px)">
          <HStack width="100vw" gap={20} justifyContent="center">
            {isMobile ? (
              <Box
                maxW="md"
                p={5}
                borderRadius="md"
                backgroundColor={"brand.50"}
                textAlign="center"
              >
                <Text fontSize="lg">
                  Veuillez vous connecter sur une station de travail pour
                  pouvoir administrer les utilisateurs.
                </Text>
              </Box>
            ) : (
              <>
                <Box
                  maxW="container.md" // Utilisation d'un breakpoint de conteneur pour la largeur max
                  mt={10}
                  p={5}
                  boxShadow="lg"
                  borderRadius="md"
                  backgroundColor={"brand.50"}
                  width="auto" // La largeur s'ajuste au contenu et à maxW
                >
                  <Flex bg="gray.200" p={2} fontWeight="bold">
                    <Box flex="0.7">Nom</Box>{" "}
                    {/* Réduction du flex pour les colonnes courtes */}
                    <Box flex="0.7">Prénom</Box>
                    <Box flex="2">Email</Box>{" "}
                    {/* Augmentation du flex pour l'email */}
                    <Box flex="0.5">Actif</Box>
                    <Box flex="0.5">Admin</Box>
                    <Box flex="1" textAlign="center">
                      Actions
                    </Box>
                  </Flex>
                  {users.map((user) => (
                    <Flex key={user.id} p={2} borderBottom="1px solid #ccc">
                      <Box flex="0.7">{user.nom}</Box>
                      <Box flex="0.7">{user.prenom}</Box>
                      <Box flex="2">{user.email}</Box>
                      <Box flex="0.5">{user.isActif ? "Oui" : "Non"}</Box>
                      <Box flex="0.5">
                        {user.isAdministrateur ? "Oui" : "Non"}
                      </Box>
                      <Box flex="1" textAlign="center">
                        <HStack justifyContent="center" gap={2}>
                          {" "}
                          {/* Utilisation de HStack ici */}
                          <Button
                            size="sm"
                            borderRadius="full"
                            backgroundColor="brand.600"
                            color="white" // Assurez-vous que l'icône est visible sur ce fond
                            onClick={() => handleEdit(user)}
                          >
                            <HiOutlinePencil size="20px" />
                          </Button>
                          <Button
                            size="sm"
                            borderRadius="full"
                            backgroundColor="brand.600"
                            color="white" // Assurez-vous que l'icône est visible sur ce fond
                            onClick={() => handleDelete(user.id)}
                          >
                            <HiOutlineTrash size="20px" />
                          </Button>
                        </HStack>
                      </Box>
                    </Flex>
                  ))}
                </Box>

                <Box
                  maxW="md"
                  mt={10}
                  p={5}
                  boxShadow="lg"
                  borderRadius="md"
                  backgroundColor={"brand.50"}
                >
                  <VStack gap={4} mb={6}>
                    <Input
                      placeholder="Nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                    />
                    <Input
                      placeholder="Prénom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                    />
                    <Input
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Input
                      placeholder="Mot de Passe"
                      name="motDePasse"
                      type="password"
                      value={formData.motDePasse}
                      onChange={handleChange}
                    />
                    <Checkbox.Root
                      name="isActif"
                      checked={formData.isActif}
                      onCheckedChange={(details: CheckedChangeDetails) => {
                        setFormData({
                          ...formData,
                          isActif: details.checked === true,
                        });
                      }}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
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
                      <Checkbox.Control />
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
                </Box>
              </>
            )}
          </HStack>
        </Center>
      </Container>
    </Box>
  );
};

export default UserManagement;
