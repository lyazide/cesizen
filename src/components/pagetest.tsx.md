"use client";

import { Box, Flex, Link, Text } from "@chakra-ui/react";

import { useState } from "react";

import { NextPage } from "next";

const Sidebar: NextPage = () => {
  const [selectedPage, setSelectedPage] = useState("about");

  const pages = {
    about: "À propos",

    relaxation: "Activité de détente",

    information: "Information",

    diagnostics: "Diagnostics",

    emotions: "Émotions",

    breathing: "Respiration",
  };

  return (
    <Flex direction="column" height="100vh">
      <Box as="nav" width="200px" bg="gray.800" color="white" p={4}>
        {Object.keys(pages).map((page) => (
          <Link
            key={page}
            onClick={() => setSelectedPage(page)}
            mb={2}
            display="block"
            _hover={{ textDecoration: "none", color: "gray.400" }}
          >
            {pages[page]}
          </Link>
        ))}
      </Box>

      <Box flex="1" overflowY="auto" p={4}>
        <Text fontSize="xl">{pages[selectedPage]}</Text>

        <Text mt={4}>Contenu de la page {pages[selectedPage]}.</Text>
      </Box>

      <Box as="footer" bg="gray.800" color="white" p={4} textAlign="center">
        <Text>&copy; 2025 Votre Nom</Text>

        <Link href="mailto:contact@example.com">contact@example.com</Link>

        <Link href="/about" ml={4}>
          About
        </Link>

        <Link href="https://portfolio.example.com" ml={4}>
          Portfolio
        </Link>

        <Link href="https://github.com/votreprofil" ml={4}>
          GitHub
        </Link>
      </Box>
    </Flex>
  );
};

export default Sidebar;
