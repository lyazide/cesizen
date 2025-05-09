import { Box, HStack /*Text*/ } from "@chakra-ui/react";
import { Logo, Text } from "./logo";
import { NavbarLinks } from "./navbar-links";
//import LogoutButton from "./LogoutButton";

export const Block = () => {
  const cesizenText = "Cesizen";
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
        <Box py={{ base: "0.2", md: "0.2" }}>
          <HStack justify="space-between" align="center" width="100%">
            <HStack gap="20px">
              <Logo />

              <Text
                text={cesizenText}
                color="white"
                fontFamily="dancing-script"
              />
            </HStack>
            <HStack gap="20px">
              <NavbarLinks />
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
