// src/app/informations/[id]/page.tsx
import DetenteDetails from "../../../components/Detentes/DetenteDetails";
import prisma from "@/utils/db";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
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
  });

  if (!detente) {
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
        height="90vh" // 90% de la hauteur de l'écran
        boxShadow="lg" // Ombre pour un effet esthétique
        //borderRadius="lg" // Coins arrondis
        overflow="auto" // Permettre le défilement si contenu trop long
        //p={6} // Padding interne
      >
        <Header name={detente.nom} />
        <Box p={4} marginTop="200px">
          <SimpleGrid minChildWidth="sm" gap="20px" pt="20px">
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
