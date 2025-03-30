// src/components/DiagnosticCard.tsx
import { CheckboxCard } from "@chakra-ui/react";

type DiagnosticDetailsProps = {
  evenement: string;
  points: number;
  checked: boolean;
  onChange: (checked: boolean, points: number) => void;
};

const DiagnosticCard: React.FC<DiagnosticDetailsProps> = ({
  evenement,
  points,
  checked,
  onChange,
}) => {
  const handleCheckboxChange = () => {
    onChange(!checked, points);
  };
  return (
    <CheckboxCard.Root
      key={evenement}
      value={`${points.toString()}`}
      w="100%"
      p="30"
      colorPalette="teal"
      checked={checked}
      onChange={handleCheckboxChange}
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
