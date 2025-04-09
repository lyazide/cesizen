// src/components/DiagnosticCard.tsx
import { Checkbox } from "@chakra-ui/react";

type DiagnosticDetailsProps = {
  id: number;
  evenement: string;
  points: number;
  checked: boolean;
  onChange: (checked: boolean, id: number) => void;
};

const DiagnosticCard: React.FC<DiagnosticDetailsProps> = ({
  id,
  evenement,
  points,
  checked,
  onChange,
}) => {
  console.log("Props received in DiagnosticCard:", {
    id,
    evenement,
    points,
    checked,
  });

  const handleCheckboxChange = () => {
    onChange(!checked, id);
  };

  return (
    <Checkbox.Root
      key={id}
      value={{ points }.toString()}
      w="100%"
      p="30"
      checked={checked}
      onChange={handleCheckboxChange}
      bg="brand.50"
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label></Checkbox.Label>
    </Checkbox.Root>
  );
};

export default DiagnosticCard;
