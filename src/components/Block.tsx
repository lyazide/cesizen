import { useSession } from "next-auth/react";
import { Box, HStack, Text, Flex } from "@chakra-ui/react";
import { Logo, LogoText } from "./logo";
import { NavbarLinks } from "./navbar-links";
import { useState, useEffect } from "react";
import { FaShieldAlt, FaUser, FaUserSlash } from "react-icons/fa";

export const Block = () => {
  const cesizenText = "Cesizen";
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
            {/* Rectangle arrondi à gauche avec icône du rôle */}

            <HStack gap="20px">
              <Logo />
              <LogoText
                text={cesizenText}
                color="white"
                fontFamily="dancing-script"
              />
            </HStack>

            <HStack gap="20px">
              <NavbarLinks />
            </HStack>

            {/* Rectangle arrondi à droite avec nom d'utilisateur */}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
