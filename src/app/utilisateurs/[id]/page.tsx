// src/components/PasswordUpdateDialog.tsx
"use client";

import {
  Button,
  // Assuming Dialog components are from a Chakra UI extension or custom implementation
  // as they are not standard Chakra UI core components.
  // If these are custom components, ensure they correctly pass props to underlying Chakra Button.
  // For standard Chakra UI, you'd typically use AlertDialog or a custom Modal.
  // For simplicity, I'm keeping the original Dialog structure but fixing button props.
  Input,
  VStack,
  Text,
  Container,
  Box, // Added Box for general container, assuming DialogContent is a Box-like component
  Heading, // Added Heading for DialogTitle equivalent
} from "@chakra-ui/react";
import { useState } from "react";

// Mock Dialog components for demonstration, as the original import seems to be custom
// You would replace these with your actual Dialog implementation if they are not standard Chakra.
const Dialog = ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);
const DialogTrigger = ({
  children,
}: {
  asChild: boolean;
  children: React.ReactElement;
}) => children;
const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <Box
    p={6}
    borderWidth="1px"
    borderRadius="lg"
    boxShadow="lg"
    bg="white"
    maxW="400px"
    mx="auto"
    my={4}
  >
    {children}
  </Box>
);
const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <Heading as="h2" size="md" mb={2}>
    {children}
  </Heading>
);
const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <Text mb={4}>{children}</Text>
);
const DialogCloseTrigger = ({
  children,
}: {
  asChild: boolean;
  children: React.ReactElement;
}) => children;

export default function PasswordUpdateDialog({ userId }: { userId: number }) {
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch(`/api/utilisateur/${userId}/mot-de-passe`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (res.ok) {
        setStatus("success");
        setNewPassword("");
      } else {
        setStatus("error");
        // Optionally, parse error message from response
        const errorData = await res.json();
        console.error(
          "Password update failed:",
          errorData.error || res.statusText
        );
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="main" flex="1">
      <Container
        as="main"
        backgroundColor={"brand.600"}
        padding="0px"
        pt="130px"
        minHeight="100vh"
        maxW="100%" // 90% de la largeur de l'écran
        height="100vh" // 90% de la hauteur de l'écran
        boxShadow="lg" // Ombre pour un effet esthétique
        //borderRadius="lg" // Coins arrondis
        overflow="auto" // Permettre le défilement si contenu trop long
        //p={6} // Padding interne
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button colorScheme="blue">Changer le mot de passe</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogDescription>
              Entrez le nouveau mot de passe :
            </DialogDescription>

            <VStack mt={4} gap={3}>
              <Input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                colorScheme="teal"
                onClick={handleSubmit}
                loading={isSubmitting} // Changed isLoading to loading
                disabled={newPassword.length < 6} // Changed isDisabled to disabled
              >
                Enregistrer
              </Button>

              {status === "success" && (
                <Text fontSize="sm" color="green.500">
                  Mot de passe mis à jour avec succès.
                </Text>
              )}
              {status === "error" && (
                <Text fontSize="sm" color="red.500">
                  Échec de la mise à jour.
                </Text>
              )}
            </VStack>

            <DialogCloseTrigger asChild>
              <Button variant="ghost" mt={4}>
                Annuler
              </Button>
            </DialogCloseTrigger>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
