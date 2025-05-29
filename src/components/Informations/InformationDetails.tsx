import { Box, Button, Center, Heading, Text, Link } from "@chakra-ui/react";

type InformationCardProps = {
  titre: string;
  contenu: string;
  dateCreation?: Date;
  dateModification?: Date;
  boutonNom?: string;
  boutonUrl?: string;
};

const convertirDate = (date?: Date): string => {
  return date
    ? new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
};

const InformationCard: React.FC<InformationCardProps> = ({
  titre,
  contenu,
  dateCreation,
  boutonNom,
  boutonUrl,
}) => {
  return (
    <Center as="section" bg="brand.600" h="45vh">
      <Box
        width="90%"
        maxW="1200px"
        borderWidth="1px"
        borderRadius="lg"
        p="6"
        bg="brand.50"
      >
        <Text mt={2}>{convertirDate(dateCreation)}</Text>

        <Heading as="h2" size="md">
          {titre}
        </Heading>

        <Text mt={2} dangerouslySetInnerHTML={{ __html: contenu }}></Text>

        {boutonNom && boutonUrl && (
          <Center my="6">
            <Link href={boutonUrl}>
              <Button bg="brand.400" colorScheme="blue">
                {boutonNom}
              </Button>
            </Link>
          </Center>
        )}
      </Box>
    </Center>
  );
};

export default InformationCard;
