import {
  Box,
  //  Heading,
  SimpleGrid,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import InformationCard from "../../components/InformationCard";
import prisma from "../../utils/db";
import Header from "../../components/Header";
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
    <div>
      <Header name="Toutes les activités de détente" />
      <Box p={4}>
        {detentes.length > 0 ? (
          <SimpleGrid minChildWidth="sm" gap="40px">
            {detentes.map((information) => (
              <Box key={information.id} maxW="320px" width="100%">
                <ChakraLink
                  as={NextLink}
                  href={`/informations/${information.id}`}
                  _hover={{ textDecoration: "none" }}
                >
                  <InformationCard
                    titre={information.titre}
                    contenu={information.contenu}
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
    </div>
  );
};

export default InformationsPage;
