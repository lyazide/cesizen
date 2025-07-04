// src/app/informations/[id]/page.tsx
import InformationDetails from "../../../components/Informations/InformationDetails";
import prisma from "@/utils/db";
import { Box, Container, /*Text,*/ SimpleGrid } from "@chakra-ui/react";
import Header from "../../../components/Header/Header";
import { notFound } from "next/navigation";
import DeleteButton from "../../../components/Informations/deleteInformation";
import EditButton from "../../../components/Informations/editInformation";

async function InformationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const information = await prisma.information.findUnique({
    where: { id: parseInt(id) },
    /*  include: {
      //titre: true,
      contenu: true,
      dateCreation: true,
      dateModification: true,
    },*/
  });

  if (!information) {
    notFound();
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
        <DeleteButton id={parseInt(id)} />
        <EditButton id={information.id} />
        <Box p={4} mt={{ base: "1150px", md: "600px", lg: "500px" }}>
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
}

export default InformationDetailsPage;
