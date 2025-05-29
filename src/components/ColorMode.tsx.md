import { Button, Box } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p="16">
      <p>The current Theme is: {colorMode} mode.</p>
      <Box h="7" />
      <Button onClick={toggleColorMode}>Change Theme</Button>
    </Box>
  );
};
