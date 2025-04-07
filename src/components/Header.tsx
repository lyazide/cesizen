import { Box, Heading, HStack } from "@chakra-ui/react";

interface HeaderProps {
  name: string;
}

/*const handleLogout = () => {
  signOut({ callbackUrl: "/" }); // Redirect to home page after logout
};*/

const Title: React.FC<HeaderProps> = ({ name }) => {
  return (
    <Box bg="brand.400" color="white" p={4} textAlign="center">
      <Heading as="h1" size="lg">
        {name}
      </Heading>
      <HStack gap="20px" justify="center"></HStack>
    </Box>
  );
};

export default Title;
