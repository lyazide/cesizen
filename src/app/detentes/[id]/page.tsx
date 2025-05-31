// src/app/informations/[id]/page.tsx
import DetenteDetails from "../../../components/Detentes/DetenteDetails";
import prisma from "@/utils/db";
import { Box, Container, /*Text,*/ SimpleGrid } from "@chakra-ui/react";
import Header from "../../../components/Header/Header";
import { notFound } from "next/navigation";

async function InformationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detente = await prisma.detente.findUnique({
    where: { id: parseInt(id) },
    /*  include: {
      //titre: true,
      contenu: true,
      dateCreation: true,
      dateModification: true,
    },*/
  });

  if (!detente) {
    notFound();
  }

  // Define the interface for the component's props, aligning with Next.js PageProps structure
  /*interface InformationDetailsPageProps {
  params: {
    id: string; // Dynamic route parameter
  };
  // searchParams are often part of PageProps in Next.js app directory,
  // even if not directly used by the component. Adding it can help satisfy
  // Next.js's internal type constraints.
  searchParams?: { [key: string]: string | string[] | undefined };
}*/

  /*const getInformationById = async (id: number) => {
  return await prisma.detente.findUnique({
    where: { id },
  });
};

const InformationDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  // Use the defined interface here
  const detente = await getInformationById(parseInt( params.id));

  if (!detente) {
    return <Text>Detente non trouvée.</Text>;
  }*/

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
        <Header name={detente.nom} />
        <Box p={4} marginTop="80px">
          <SimpleGrid minChildWidth="sm" gap="20px">
            <DetenteDetails
              nom={detente.nom}
              description={detente.description}
              duree={detente.duree}
              imagePath={detente.imagePath ?? undefined}
              boutonNom="Retour"
              boutonUrl="/detentes"
            />
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

export default InformationDetailsPage;
