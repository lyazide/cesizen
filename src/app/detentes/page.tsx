import {
  Box,
  //  Heading,
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
    <div>
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
    </div>
  );
};

export default DetentesPage;
