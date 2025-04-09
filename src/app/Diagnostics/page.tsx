"use client";
import { Box, SimpleGrid, Text, Heading, Container } from "@chakra-ui/react";
import DiagnosticCard from "../../components/DiagnosticCard";
import Title from "../../components/Header";
import { useState, useEffect } from "react";

type diagnostic = {
  id: number;
  evenement: string;
  points: number;
};

const DiagnosticsPage = () => {
  const [diagnostics, setDiagnostics] = useState<diagnostic[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  //const [loading, setLoading] = useState<boolean>(true); // Ajout d'un état de chargement

  console.log("DiagnosticsPage component rendered");
  console.log(diagnostics);
  console.log(checkedItems);

  useEffect(() => {
    console.log("useEffect is running");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/diagnostics");
        console.log("API Response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch diagnostics");
        }
        const reponse = await response.json();
        console.log("API Data:", reponse);
        setDiagnostics(reponse.data);
      } catch (error) {
        console.error("Error fetching diagnostics:", error);
      } /*finally {
        setLoading(false); // Mise à jour de l'état de chargement
      }*/
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Diagnostics state updated:", diagnostics);
  }, [diagnostics]);

  const handleCheckboxChange = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    }
  };

  const totalPoints = checkedItems.reduce(
    (acc, id) =>
      acc +
      (diagnostics.find((diagnostic) => diagnostic.id === id)?.points || 0),
    0
  );

  /*if (loading) {
    return <Text>Chargement...</Text>; // Affichage d'un message de chargement
  }*/

  return (
    <Container
      as="main"
      backgroundColor={"brand.200"}
      padding="20px"
      pt="70px"
      minHeight="100vh"
      maxW="90%" // 90% de la largeur de l'écran
      height="90vh" // 90% de la hauteur de l'écran
      boxShadow="lg" // Ombre pour un effet esthétique
      borderRadius="lg" // Coins arrondis
      overflow="auto" // Permettre le défilement si contenu trop long
      p={6} // Padding interne
    >
      <Title name="Questionnaire diagnostic de stress" />
      <Heading rowGap="0" height="20">
        Total des points: {totalPoints}
      </Heading>
      <Box
        as="main"
        width="100%"
        height="60%"
        justifyContent="center"
        backgroundColor={"brand.200"}
        padding="10px"
      >
        {diagnostics.length > 0 ? (
          <Box rowGap="0" height="20">
            {diagnostics.map((diagnostic) => (
              <Box backgroundColor={"brand.200"} key={diagnostic.id}>
                <DiagnosticCard
                  id={diagnostic.id}
                  evenement={diagnostic.evenement}
                  points={diagnostic.points}
                  checked={checkedItems.includes(diagnostic.id)}
                  onChange={handleCheckboxChange}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Text>Aucun diagnostic trouvé. Longueur : {diagnostics.length}</Text>
        )}
      </Box>
    </Container>
  );
};

export default DiagnosticsPage;
