import React from "react";
import { Container, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Container
      as="footer"
      bg="brand.900"
      color="white"
      textAlign="center"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      py={4}
    >
      <Text>© 2025 MyApp. Tous droits réservés.</Text>
    </Container>
  );
};

export default Footer;
