import {
  Box,
  SimpleGrid,
  Container,
  Text,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import InformationCard from "../../components/Informations/InformationCard";
import prisma from "../../utils/db";
import Header from "../../components/Header/Header";

//import { Block } from "@/components/block";
type Information = {
  id: number;
  titre: string;
  contenu: string;
  dateCreation: Date;
  dateModification: Date;
};

// Fonction pour récupérer toutes les exercise de detente
const getAllInformations = async (): Promise<Information[]> => {
  return await prisma.information.findMany({
    select: {
      id: true,
      titre: true,
      contenu: true,
      dateCreation: true,
      dateModification: true,
    },
  });
};

const InformationsPage = async () => {
  const detentes = await getAllInformations();

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
        <Header name="Informations sur la santé mentale" />
        <Box p={4}>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <ChakraLink as={NextLink} href="/informations/create">
              <Button colorScheme="teal">Ajouter une information</Button>
            </ChakraLink>
          </Box>
          {detentes.length > 0 ? (
            <SimpleGrid minChildWidth="sm" gap="20px">
              {detentes.map((information) => (
                <Box key={information.id} maxW="320px" width="100%">
                  <ChakraLink
                    as={NextLink}
                    href={`/informations/${information.id}`}
                    _hover={{ textDecoration: "none" }}
                  >
                    <InformationCard
                      titre={information.titre}
                      contenu={information.contenu.slice(0, 100) + "..."}
                      dateCreation={information.dateCreation}
                      dateModification={information.dateModification}
                    />
                  </ChakraLink>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>Aucune information trouvée.</Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default InformationsPage;
