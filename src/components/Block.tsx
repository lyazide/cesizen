import { Box, Container, HStack, Spacer } from "@chakra-ui/react";
import { Logo } from "./logo";
import { MobilePopover } from "./mobile-popover";
import { NavbarLinks } from "./navbar-links";
//import LogoutButton from "./LogoutButton";

export const Block = () => {
  return (
    <Container
      bg="brand.600"
      as="header"
      position="fixed"
      top="0"
      borderBottomWidth="1px"
      width={"100%"}
      zIndex="1000"
    >
      <Container py={{ base: "3.5", md: "4" }}>
        <HStack justify="space-between">
          <Logo />
          <Spacer hideFrom="md" />
          <NavbarLinks hideBelow="md" />

          <MobilePopover>
            <NavbarLinks />
          </MobilePopover>
        </HStack>
      </Container>
    </Container>
  );
};
