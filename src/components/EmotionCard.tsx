// src/components/DiagnosticCard.tsx
import { CheckboxCard } from "@chakra-ui/react";

type EmotionDetailsProps = {
  id: number;
  emotion: string;
  emotionBase: string;
  checked: boolean;
  onChange: (checked: boolean, id: number) => void;
};

const EmotionCard: React.FC<EmotionDetailsProps> = ({
  id,
  emotion,
  emotionBase,
  checked,
  onChange,
}) => {
  console.log("Props received in EmotionCard:", {
    id,
    emotion,
    emotionBase,
    checked,
  });

  const handleCheckboxChange = () => {
    onChange(!checked, id);
  };

  return (
    <CheckboxCard.Root
      key={id}
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
            {emotion} ({emotionBase})
          </CheckboxCard.Label>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  );
};

export default EmotionCard;
