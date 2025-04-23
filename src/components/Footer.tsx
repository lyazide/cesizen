import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="brand.600" p="8">
      <Container
        as="footer"
        bg="brand.600"
        color="white"
        textAlign="center"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        py={4}
      >
        <Text>© CesiZen : votre compagnon santé mentale.</Text>
      </Container>
    </Box>
  );
};

export default Footer;
