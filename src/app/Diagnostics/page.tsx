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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/diagnostics"); // ou /app/api/diagnostics
        if (!response.ok) {
          throw new Error("Failed to fetch diagnostics");
        }
        const data = await response.json();
        setDiagnostics(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching diagnostics:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (checked: boolean, points: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, points]);
    } else {
      setCheckedItems(checkedItems.filter((p) => p !== points));
    }
  };

  const totalPoints = checkedItems.reduce((acc, points) => acc + points, 0);

  return (
    <div>
      <Block />
      <Header name="Toutes les diagnostics" />

      {diagnostics.length > 0 ? (
        <>
          <SimpleGrid gap="10px">
            {diagnostics.map((diagnostic) => (
              <Box key={diagnostic.id} height="20">
                <DiagnosticCard
                  evenement={diagnostic.evenement}
                  points={diagnostic.points}
                  checked={checkedItems.includes(diagnostic.points)}
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
        <Text>Aucune diagnostic trouvée.</Text>
      )}
    </div>
  );
};

export default DiagnosticsPage;
