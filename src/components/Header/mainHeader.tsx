"use client";

import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Link,
  Stack,
  Container,
  HStack,
  Text,
} from "@chakra-ui/react";

import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaUserSlash } from "@react-icons/all-files/fa/FaUserSlash";
import { useSession } from "next-auth/react";

/*import dynamic from "next/dynamic";
//import { FaShieldAlt, FaUser, FaUserSlash } from "react-icons/fa";
const HiMenu = dynamic(
  () => import("react-icons/hi").then((mod) => mod.HiMenu),
  { ssr: false }
);

const FaShieldAlt = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaShieldAlt),
  { ssr: false }
);
const FaUser = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaUser),
  { ssr: false }
);
const FaUserSlash = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaUserSlash),
  { ssr: false }
);*/

//import { HiMenu, FaShieldAlt, FaUser, FaUserSlash } from "../icons";

const Header = () => {
  const { data: session } = useSession();

  // Récupération des informations utilisateur
  const userId = session?.user.id;
  const userName = session?.user?.name || "Invité";
  const userStatus = session?.user?.isActif ? "Actif" : "Inactif";
  const userRole = session?.user?.isAdministrateur ? "Admin" : "Utilisateur";

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Détermine l'icône à afficher
  const getStatusIcon = () => {
    if (userRole === "Admin") {
      return userStatus === "Actif" ? (
        <FaShieldAlt color="green" />
      ) : (
        <FaShieldAlt color="red" />
      );
    } else {
      return userStatus === "Actif" ? (
        <FaUser color="green" />
      ) : (
        <FaUserSlash color="red" />
      );
    }
  };
  const navItems = [
    { label: "A propos", href: "/apropos" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Diagnostic de stress", href: "/diagnostics" },
    { label: "Exercises de respiration", href: "/respirations" },
    { label: "Suivis des emotions", href: "/emotions" },
    { label: "Activités Détente", href: "/detentes" },
    { label: "Informations sur la santé mentale", href: "/informations" },
    { label: "S'enregistrer", href: "/signup" },

    { label: "Mot de passe", href: `/utilisateurs/${userId}` }, // Lien vers la page de l'utilisateur connecté
  ];
  return (
    <Container as="header">
      <Drawer.Root>
        <Drawer.Trigger>
          {/* <Button variant="outline" size="sm" aria-label="Toggle navigation">*/}
          <HiMenu size="20" fill="white" aria-label="Toggle navigation" />
          {/*</Button>*/}
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack
                  py="2"
                  textAlign="center"
                  color="white"
                  bg="brand.600"
                  width="100%"
                >
                  <Drawer.Title>Menu</Drawer.Title>

                  <Text fontSize="sm" bg="brand.600">
                    {currentTime}
                  </Text>

                  <Text fontSize="sm" bg="brand.600">
                    {userName}
                  </Text>

                  <HStack bg="brand.600" justifyContent="center">
                    <Box
                      bg="white"
                      borderRadius="full"
                      p="2" // Ajuste l'espace autour de l'icône
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {getStatusIcon()}
                    </Box>
                    <Text fontSize="sm" bg="brand.600">
                      {userRole}
                    </Text>
                  </HStack>
                </Stack>
              </Drawer.Header>
              <Drawer.Body>
                <Stack direction="column" gap="4">
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
                </Stack>
              </Drawer.Body>
              <Drawer.Footer>
                <Button onClick={() => signIn()}>Login</Button>
                <Button onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Container>
  );
};

export default Header;
