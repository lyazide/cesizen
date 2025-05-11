import { HStack, type StackProps, Container } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
import Header from "./mainHeader";

export const NavbarLinks = (props: StackProps) => {
  // Définir les URLs correspondantes pour chaque élément
  return (
    <Container>
      <HStack
        direction={{ base: "column", md: "row" }}
        gap={{ base: "6", md: "8" }}
        {...props}
      >
        <Header />
      </HStack>
    </Container>
  );
};
