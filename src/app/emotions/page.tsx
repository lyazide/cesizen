"use client";
import { Box, Text, Container } from "@chakra-ui/react";
import EmotionCard from "../../components/EmotionCard";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

type emotion = {
  id: number;
  emotion: string;
  emotionBase: string;
};

const EmotionsPage = () => {
  const [emotions, setEmotions] = useState<emotion[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  //const [loading, setLoading] = useState<boolean>(true); // Ajout d'un état de chargement

  console.log("DiagnosticsPage component rendered");
  console.log(emotions);
  console.log(checkedItems);

  useEffect(() => {
    console.log("useEffect is running");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/emotions");
        console.log("API Response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch emotions");
        }
        const reponse = await response.json();
        console.log("API Data:", reponse);
        setEmotions(reponse.data);
      } catch (error) {
        console.error("Error fetching emotions:", error);
      } /*finally {
        setLoading(false); // Mise à jour de l'état de chargement
      }*/
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("emotions state updated:", emotions);
  }, [emotions]);

  /*const handleCheckboxChange = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    }
  };*/

  const handleCheckboxChange = (checked: boolean, id: number) => {
    if (checked) {
      // Ne permettre qu'un seul élément sélectionné
      setCheckedItems([id]);
    } else {
      setCheckedItems([]);
    }
  };

  /*  const totalPoints = checkedItems.reduce(
    (acc, id) =>
      acc +
      (emotions.find((emotion) => emotion.id === id)?.points || 0),
    0
  );*/

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
      <Header name="Questionnaire emotion de stress" />

      <Box
        as="main"
        width="100%"
        height="60%"
        justifyContent="center"
        backgroundColor={"brand.200"}
        padding="10px"
      >
        {emotions.length > 0 ? (
          <Box rowGap="0" height="20">
            {emotions.map((emotion) => (
              <Box backgroundColor={"brand.200"} key={emotion.id}>
                <EmotionCard
                  id={emotion.id}
                  emotion={emotion.emotion}
                  emotionBase={emotion.emotionBase}
                  checked={checkedItems.includes(emotion.id)}
                  onChange={handleCheckboxChange}
                ></EmotionCard>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>Aucune émotion trouvé. Longueur : {emotions.length}</Text>
        )}
      </Box>
    </Container>
  );
};

export default EmotionsPage;
