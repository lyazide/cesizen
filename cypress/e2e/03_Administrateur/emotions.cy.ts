/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  beforeEach(() => {
    cy.login("lyazide11@hotmail.com", "password123"); // Remplace par tes identifiants de test
  });
  it("Dois naviguer vers la page à propos", () => {
    cy.viewport(480, 720);

    // Start from the index page
    cy.visit("http://localhost:3000");

    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="emotions"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/emotions");

    // The new page should contain an h1 with "About page"
    //cy.get("h1").contains("Politique de Confidentialité - CesiZen");
  });
});

// Prevent TypeScript from reading file as legacy script
//export {};
