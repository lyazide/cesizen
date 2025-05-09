// src/app/informations/[id]/page.tsx
import InformationDetails from "../../../components/InformationDetails";
import prisma from "@/utils/db";
import { Box, Container, Text, SimpleGrid } from "@chakra-ui/react";
import Header from "../../../components/Header";

const getInformationById = async (id: number) => {
  return await prisma.information.findUnique({
    where: { id },
  });
};

const InformationDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const information = await getInformationById(parseInt(params.id));

  if (!information) {
    return <Text>Information non trouvée.</Text>;
  }

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
        <Header name={information.titre} />
        <Box p={4} marginTop="80px">
          <SimpleGrid minChildWidth="sm" gap="20px">
            <InformationDetails
              titre={information.titre}
              contenu={information.contenu}
              dateCreation={information.dateCreation}
              dateModification={information.dateModification}
              boutonNom="Retour"
              boutonUrl="/informations"
            />
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default InformationDetailsPage;
