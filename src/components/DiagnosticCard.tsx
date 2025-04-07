// src/components/DiagnosticCard.tsx
import { CheckboxCard } from "@chakra-ui/react";

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
    <CheckboxCard.Root
      key={id}
      value={{ points }.toString()}
      w="100%"
      p="30"
      checked={checked}
      onChange={handleCheckboxChange}
      bg="brand.50"
    >
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>
            {evenement} ({points}&nbsp;points)
          </CheckboxCard.Label>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  );
};

export default DiagnosticCard;
