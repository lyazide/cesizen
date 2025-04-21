import { CheckboxCard } from "@chakra-ui/react";
import { useSession } from "next-auth/react"; // Importation pour next-auth

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
  const { data: session } = useSession(); // Récupération des données de la session avec next-auth
  const utilisateurId = session?.user?.id; // Extraction de l'ID utilisateur depuis la session

  const handleCheckboxChange = () => {
    onChange(!checked, id);
  };

  console.log("Props received in DiagnosticCard:", {
    id,
    evenement,
    points,
    checked,
    utilisateurId,
  });

  return (
    <CheckboxCard.Root
      key={id}
      value={points.toString()}
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
