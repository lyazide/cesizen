import { Box, Text } from "@chakra-ui/react";

interface HoursProps {
  hours: string;
}

const Hours: React.FC<HoursProps> = ({ hours }) => {
  return (
    <Box p={4}>
      <Text fontSize="lg" fontWeight="bold">
        Quand pouvez-vous nous rendre visite?
      </Text>
      <Text>{hours}</Text>
    </Box>
  );
};

export default Hours;
