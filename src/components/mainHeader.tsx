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

import { HiMenu } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaShieldAlt, FaUser, FaUserSlash } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  // Récupération des informations utilisateur
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
  ];
  return (
    <Container as="header">
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            <HiMenu size="20" fill="white" />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner padding="4">
            <Drawer.Content rounded="md">
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
                  <Drawer.Title bg="brand.600">Menu</Drawer.Title>

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
              <Drawer.CloseTrigger asChild>
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
