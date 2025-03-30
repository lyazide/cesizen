import { Box, Text } from "@chakra-ui/react";

interface LocationProps {
  address: string;
}

const Location: React.FC<LocationProps> = ({ address }) => {
  return (
    <Box p={4}>
      <Text fontSize="lg" fontWeight="bold">
        Ou sommes-nous?
      </Text>
      <Text>{address}</Text>
    </Box>
  );
};

export default Location;
