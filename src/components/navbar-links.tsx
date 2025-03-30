import { Link, Stack, type StackProps } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";

export const NavbarLinks = (props: StackProps) => {
  // Définir les URLs correspondantes pour chaque élément
  const navItems = [
    { label: "A propos", href: "/A propos/1" },
    { label: "Dashboard", href: "/Dashboard" },
    { label: "Mesure de Stress", href: "/Stress" },
    { label: "Suivis des emaotions", href: "/Emotion" },
    { label: "Activités Détente", href: "/Detente" },
    { label: "Informations sur la santé mentale", href: "/Information" },
  ];

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={{ base: "6", md: "8" }}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href} // Ajout de l'URL
          fontWeight="medium"
          color="fg.muted"
          _hover={{
            color: "colorPalette.fg",
            textDecoration: "none",
          }}
        >
          {item.label}
        </Link>
      ))}
      <ColorModeButton />
    </Stack>
  );
};
