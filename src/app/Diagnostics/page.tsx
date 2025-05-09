/*
Plus de 300 points : stress très élevé, risque évalué à 80 %
Entre 100 et 300 points : stress élevé, risque évalué à 51 %
Moins de 100 points : stress modéré, risque évalué à 30% 
  */

"use client";
import { Box, Text, Heading, Container, Button } from "@chakra-ui/react";
import DiagnosticCard from "../../components/DiagnosticCard";
import Title from "../../components/Header";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Importation pour next-auth
import { v4 as uuidv4 } from "uuid";
import { Toaster, toaster } from "../..//components/ui/toaster"; // Importation du composant Toaster

type diagnostic = {
  id: number;
  evenement: string;
  points: number;
};

type SoumissionData = {
  id_Diagnostic: number;
  id_Utilisateur: number | undefined;
  date_: string;
};

const DiagnosticsPage = () => {
  const [diagnostics, setDiagnostics] = useState<diagnostic[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { data: session } = useSession(); // Récupération de la session utilisateur
  const utilisateurId = session?.user?.id; // ID utilisateur extrait de la session
  //const utilisateurId = 7; // ID utilisateur pour les tests (à remplacer par l'ID réel de l'utilisateur connecté)
  const [loading, setLoading] = useState<boolean>(true); // Ajout d'un état de chargement

  // console.log("DiagnosticsPage component rendered");
  // console.log(diagnostics);
  // console.log(checkedItems);

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

  const handleSubmit = async () => {
    const selectedDiagnostics = diagnostics.filter((diagnostic) =>
      checkedItems.includes(diagnostic.id)
    );
    const soumetUUID = uuidv4();
    const dateSoumissionUnique = new Date().toISOString();

    const soumetData: SoumissionData[] = selectedDiagnostics.map(
      (diagnostic) => ({
        id_Diagnostic: diagnostic.id,
        id_Utilisateur: utilisateurId, // ID utilisateur récupéré
        date_: dateSoumissionUnique, // Format ISO
        uuid: soumetUUID,
      })
    );

    try {
      const response = await fetch("/api/soumettreDiagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soumissions: soumetData }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Diagnostic(s) soumis avec succès !");
        console.log("Response data:", data);
      } else {
        const errorData = await response.json();
        console.error("Erreur serveur :", errorData.error);
        alert("Impossible de soumettre les diagnostics.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur est survenue.");
    }
  };

  const totalPoints = checkedItems.reduce(
    (acc, id) =>
      acc +
      (diagnostics.find((diagnostic) => diagnostic.id === id)?.points || 0),
    0
  );
  useEffect(() => {
    //if (totalPoints > 0) {
    let description = "";
    let type = "success";

    // Ensure there's a meaningful update
    if (totalPoints > 300) {
      description = "Stress très élevé, risque évalué à 80 %";
      type = "error";
    } else if (totalPoints > 100) {
      description = "Stress élevé, risque évalué à 51 %";
      type = "warning";
    } else {
      description = "Stress modéré, risque évalué à 30%";
      type = "success";
    }
    setTimeout(() => {
      toaster.create({
        title: "Total de points : " + totalPoints,
        duration: 2000,
        type: type,
        description: description,
      });
    }, 0); // Allows React to finish rendering before executing
    //}
  }, [totalPoints]);

  if (loading) {
    return <Text>Chargement...</Text>; // Affichage d'un message de chargement
  }

  return (
    <Box as="main" flex="1">
      <Toaster /> {/* Affichage du toaster */}
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
        <Title name="Questionnaire diagnostic de stress" />
        <Heading rowGap="20" height="20" color={"brand.200"} textAlign="center">
          Total des points: {totalPoints}
        </Heading>
        <Box
          as="main"
          width="100%"
          height="60%"
          justifyContent="center"
          backgroundColor={"brand.600"}
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

              <Button type="submit" onClick={handleSubmit}>
                Soumettre Diagnostic
              </Button>
            </Box>
          ) : (
            <Text>
              Aucun diagnostic trouvé. Longueur : {diagnostics.length}
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default DiagnosticsPage;
