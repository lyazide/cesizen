import { Box, HStack, Text } from "@chakra-ui/react";
import { Logo } from "./logo";
import { NavbarLinks } from "./navbar-links";
//import LogoutButton from "./LogoutButton";

export const Block = () => {
  return (
    <Box as="header" width="100vw">
      <Box
        bg="brand.600"
        as="header"
        position="fixed"
        top="0"
        borderBottomWidth="0px"
        width={"100vw"}
        zIndex="10"
      >
        <Box py={{ base: "3.5", md: "4" }}>
          <HStack justify="space-between" align="center">
            <Logo />

            <Text
              color="white"
              fontSize={{ base: "md", md: "lg" }}
              textAlign="center"
              fontFamily="dancing-script"
            >
              CesiZen
            </Text>
            <HStack gap="20px">
              <NavbarLinks />
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
