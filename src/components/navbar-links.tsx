import { Stack, type StackProps } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
import Header from "./mainHeader";

export const NavbarLinks = (props: StackProps) => {
  // Définir les URLs correspondantes pour chaque élément
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={{ base: "6", md: "8" }}
      {...props}
    >
      <ColorModeButton />

      <Header />
    </Stack>
  );
};
