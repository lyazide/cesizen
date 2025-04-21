"use client";
import { Box, Text, Heading, Container, Button } from "@chakra-ui/react";
import DiagnosticCard from "../../components/DiagnosticCard";
import Title from "../../components/Header";
import { useState, useEffect } from "react";
//import { useSession } from "next-auth/react"; // Importation pour next-auth
import { v4 as uuidv4 } from "uuid";

type diagnostic = {
  id: number;
  evenement: string;
  points: number;
};

type SoumissionData = {
  id_Diagnostic: number;
  id_Utilisateur: number;
  date_: string;
};

const DiagnosticsPage = () => {
  const [diagnostics, setDiagnostics] = useState<diagnostic[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  //const { data: session } = useSession(); // Récupération de la session utilisateur
  //const utilisateurId = session?.user?.id; // ID utilisateur extrait de la session
  const utilisateurId = 2; // ID utilisateur pour les tests (à remplacer par l'ID réel de l'utilisateur connecté)
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

  const handleSubmit = async () => {
    const selectedDiagnostics = diagnostics.filter((diagnostic) =>
      checkedItems.includes(diagnostic.id)
    );
    const soumetUUID = uuidv4();

    const soumetData: SoumissionData[] = selectedDiagnostics.map(
      (diagnostic) => ({
        id_Diagnostic: diagnostic.id,
        id_Utilisateur: utilisateurId, // ID utilisateur récupéré
        date_: new Date().toISOString(), // Format ISO
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

            <Button type="submit" onClick={handleSubmit}>
              Soumettre Diagnostic
            </Button>
          </Box>
        ) : (
          <Text>Aucun diagnostic trouvé. Longueur : {diagnostics.length}</Text>
        )}
      </Box>
    </Container>
  );
};

export default DiagnosticsPage;
