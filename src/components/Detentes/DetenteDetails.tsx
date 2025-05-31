import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Link,
  Image as Img,
  Flex,
} from "@chakra-ui/react";

type InformationCardProps = {
  nom: string;
  description: string;
  duree: number;
  imagePath?: string | undefined;
  boutonNom?: string;
  boutonUrl?: string;
};

const DetenteDetails: React.FC<InformationCardProps> = ({
  nom,
  description,
  duree,
  imagePath,
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
        <Flex align="center">
          {/* Image on the left */}
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Img
              src={imagePath}
              roundedLeft={"sm"}
              objectFit="cover"
              h="full"
              w="full"
              alt={"Blog Image"}
            />

            {/* Retour button below the image */}
            {boutonNom && boutonUrl && (
              <Center my="4">
                <Link href={boutonUrl}>
                  <Button bg="brand.400" colorScheme="blue">
                    {boutonNom}
                  </Button>
                </Link>
              </Center>
            )}
          </Box>

          {/* Text content on the right */}
          <Box flex="2" p="4" bg="white" borderRadius="lg" ml="4">
            <Heading as="h2" size="md">
              {nom}
            </Heading>

            <Text
              mt={2}
              dangerouslySetInnerHTML={{ __html: description }}
            ></Text>
            <Text mt={2}> {duree}</Text>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default DetenteDetails;
