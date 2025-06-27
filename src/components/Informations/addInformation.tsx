"use client";

//import { useRouter } from "next/navigation";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

export default function AddButton() {
  const { data: session } = useSession();
  //const router = useRouter();
  if (!session || session.user.isAdministrateur !== true) {
    return null; // Ne rien afficher si non admin
  }

  return (
    <ChakraLink as={NextLink} href="/informations/create">
      <Button colorScheme="teal">Ajouter une information</Button>
    </ChakraLink>
  );
}
