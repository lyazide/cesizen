import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="brand.900" color="white" textAlign="center" py={4}>
      <Text>© 2025 MyApp. Tous droits réservés.</Text>
    </Box>
  );
};

export default Footer;
