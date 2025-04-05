"use client";
import { Box, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import DiagnosticCard from "../../components/DiagnosticCard";
import Header from "../../components/Header";
import { Block } from "../../components/Block";
import { useState, useEffect } from "react";

type diagnostic = {
  id: number;
  evenement: string;
  points: number;
};

const DiagnosticsPage = () => {
  const [diagnostics, setDiagnostics] = useState<diagnostic[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Ajout d'un état de chargement

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
      } finally {
        setLoading(false); // Mise à jour de l'état de chargement
      }
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

  if (loading) {
    return <Text>Chargement...</Text>; // Affichage d'un message de chargement
  }

  return (
    <div>
      <Block />
      <Header name="Questionnaire diagnostic de stress" />
      {diagnostics.length > 0 ? (
        <>
          <SimpleGrid gap="10px">
            {diagnostics.map((diagnostic) => (
              <Box key={diagnostic.id} height="20">
                <DiagnosticCard
                  id={diagnostic.id}
                  evenement={diagnostic.evenement}
                  points={diagnostic.points}
                  checked={checkedItems.includes(diagnostic.id)}
                  onChange={handleCheckboxChange}
                />
              </Box>
            ))}
          </SimpleGrid>
          <Heading as="h3" mt={4}>
            Total des points: {totalPoints}
          </Heading>
        </>
      ) : (
        <Text>Aucun diagnostic trouvé. Longueur : {diagnostics.length}</Text>
      )}
    </div>
  );
};

export default DiagnosticsPage;
