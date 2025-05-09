import { Spinner, Text, VStack } from "@chakra-ui/react";

// users/loading.tsx
export default function Loading() {
  return (
    <VStack colorPalette="teal">
      <Spinner color="brand.600" />
      <Text color="brand.600">Chargement de la page...</Text>
    </VStack>
  );
}
