import {
  Box,
  //  Heading,
  Container,
  SimpleGrid,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import DetenteCard from "../../components/DetenteCard";
import prisma from "../../utils/db";
import Header from "../../components/Header";
//import { Block } from "@/components/block";
type Detente = {
  id: number;
  nom: string;
  description: string;
  duree: number;
};

// Fonction pour récupérer toutes les exercise de detente
const getAllDetentes = async (): Promise<Detente[]> => {
  return await prisma.detente.findMany({
    select: {
      id: true,
      nom: true,
      description: true,
      duree: true,
    },
  });
};

const DetentesPage = async () => {
  const detentes = await getAllDetentes();

  return (
    <Box as="main" flex="1">
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
        <Header name="Toutes les activités de détente" />
        <Box p={4}>
          {detentes.length > 0 ? (
            <SimpleGrid minChildWidth="sm" gap="40px">
              {detentes.map((detente) => (
                <Box key={detente.id} maxW="320px" width="100%">
                  <ChakraLink
                    as={NextLink}
                    href={`/detentes/${detente.id}`}
                    _hover={{ textDecoration: "none" }}
                  >
                    <DetenteCard
                      nom={detente.nom}
                      description={detente.description}
                      duree={detente.duree}
                    />
                  </ChakraLink>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>Aucune detente trouvée.</Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default DetentesPage;
