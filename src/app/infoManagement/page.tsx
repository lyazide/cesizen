"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, VStack, Heading } from "@chakra-ui/react";

// Définir le type Information
type Information = {
  id: number;
  titre: string;
  contenu: string;
  dateCreation: string;
  dateModification: string;
};

const InformationManagement = () => {
  const [informations, setInformations] = useState<Information[]>([]);
  const [formData, setFormData] = useState<
    Omit<Information, "id"> & { id: number | null }
  >({
    id: null,
    titre: "",
    contenu: "",
    dateCreation: new Date().toISOString(),
    dateModification: new Date().toISOString(),
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchInformations = async () => {
      try {
        const response = await fetch("/api/informations");
        const result = await response.json();
        console.log("Données récupérées :", result); // Vérification
        if (result.data && Array.isArray(result.data)) {
          setInformations(result.data); // Utiliser uniquement la propriété data
        } else {
          console.error("La réponse de l'API n'est pas un tableau :", result);
        }
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    };
    fetchInformations();
  }, []);

  // Gestion des changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      dateModification: new Date().toISOString(),
    });
  };

  // Création d'une information
  const handleCreate = async () => {
    const response = await fetch("/api/informations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const newInformation: Information = await response.json();
      setInformations([...informations, newInformation]);
      setFormData({
        id: null,
        titre: "",
        contenu: "",
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString(),
      });
    }
  };

  // Mise à jour d'une information
  const handleUpdate = async () => {
    if (formData.id === null) return;

    const response = await fetch(`/api/informations?id=${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const updatedInformation: Information = await response.json();
      setInformations(
        informations.map((info) =>
          info.id === updatedInformation.id ? updatedInformation : info
        )
      );
      setFormData({
        id: null,
        titre: "",
        contenu: "",
        dateCreation: new Date().toISOString(),
        dateModification: new Date().toISOString(),
      });
      setIsEditing(false);
    }
  };

  // Suppression d'une information
  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/informations?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setInformations(informations.filter((info) => info.id !== id));
    }
  };

  // Mise en place des données dans le formulaire pour l'édition
  const handleEdit = (info: Information) => {
    setFormData(info);
    setIsEditing(true);
  };

  return (
    <Box maxW="lg" mx="auto" mt={10}>
      <Heading textAlign="center" mb={6}>
        Gestion des Informations
      </Heading>
      <VStack gap={4} mb={6}>
        <Input
          placeholder="Titre"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
        />
        <Input
          placeholder="Contenu"
          name="contenu"
          value={formData.contenu}
          onChange={handleChange}
        />
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
      <Box>
        {informations.map((info) => (
          <Flex key={info.id} p={2} borderBottom="1px solid #ccc">
            <Box flex="2">{info.titre}</Box>
            <Box flex="3">{info.contenu}</Box>
            <Box flex="1">
              {new Date(info.dateCreation).toLocaleDateString()}
            </Box>
            <Box flex="1">
              {new Date(info.dateModification).toLocaleDateString()}
            </Box>
            <Box flex="1">
              <Button
                size="sm"
                colorScheme="yellow"
                mr={2}
                onClick={() => handleEdit(info)}
              >
                Éditer
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(info.id)}
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

export default InformationManagement;
