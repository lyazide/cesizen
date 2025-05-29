// src/components/Header.test.tsx

import { render, screen } from "../../tests/utils/test-utils";
import Header from "../Header/Header";

describe("Header Component", () => {
  it("affiche correctement le nom passé en prop", () => {
    const testName = "Nom de l'Application";
    render(<Header name={testName} />);

    const headingElement = screen.getByRole("heading", {
      name: testName,
      level: 1,
    });

    expect(headingElement).toBeInTheDocument();
    expect(headingElement.textContent).toBe(testName);
  });
});
