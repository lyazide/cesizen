import { render, screen } from "@testing-library/react";
import DetenteCard from "../DetenteCard"; // Assurez-vous que le chemin est correct

jest.mock("@chakra-ui/react", () => ({
  Box: jest.fn(({ children }) => (
    <div style={{ borderWidth: "1px" }}>{children}</div>
  )),
  Heading: jest.fn(({ children }) => <h2>{children}</h2>),
  Text: jest.fn(({ children }) => <p>{children}</p>),
  Flex: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("DetenteCard", () => {
  test("affiche correctement les informations fournies en props", () => {
    // Données de test
    const props = {
      nom: "Yoga Relaxation",
      description: "Une session de yoga pour se détendre.",
      duree: 30,
    };

    // Rendu du composant avec les props simulées
    render(<DetenteCard {...props} />);

    // Vérifications
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      props.nom
    );
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText(`Duree : ${props.duree} min`)).toBeInTheDocument();
  });

  test("applique les styles correctement", () => {
    const props = {
      nom: "Méditation",
      description: "Un moment de calme et de sérénité.",
      duree: 15,
    };

    const { container } = render(<DetenteCard {...props} />);

    expect(container.firstChild).toHaveStyle("borderWidth: 1px");
    expect(container.firstChild).toHaveStyle("background: brand.50");
  });
});
