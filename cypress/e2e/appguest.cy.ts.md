/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  it("Dois naviguer vers la page à propos", () => {
    cy.viewport(480, 720);

    // Page A Propos
    cy.visit("http://localhost:3000");

    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="apropos"]').click();

    cy.url().should("include", "/apropos");

    cy.get("h1").contains("Politique de Confidentialité - CesiZen");
  }}
describe("Navigation", () => {
  it("Dois naviguer vers la page à propos", () => {
    // Page dashboard
    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="dashboard"]').click();

    cy.url().should("include", "/signin");

    //cy.get("h1").contains("Politique de Confidentialité - CesiZen");
  }
  it("Dois naviguer vers la page à propos", () => {
    // Page diagnostics
    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="diagnostics"]').click();

    cy.url().should("include", "/diagnostics");

    //cy.get("h1").contains("Politique de Confidentialité - CesiZen");
  }
    //page respirations
    it("Dois naviguer vers la page à propos", () => {
    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="respirations"]').click();

    cy.url().should("include", "/signin");

    // cy.get("h1").contains("Politique de Confidentialité - CesiZen");
    }
    // Page emotions
    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="emotions"]').click();

    cy.url().should("include", "/signin");

    //cy.get("h1").contains("Politique de Confidentialité - CesiZen");
    //page detentes
    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="detentes"]').click();

    cy.url().should("include", "/detentes");

    // cy.get("h1").contains("Politique de Confidentialité - CesiZen");
    //page informations
    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="informations"]').click();

    cy.url().should("include", "/informations");

    //cy.get("h1").contains("Politique de Confidentialité - CesiZen");
    //page signup
    /* cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.get('a[href*="signup"]').click();

    cy.url().should("include", "/singup");

    cy.get("h1").contains("Politique de Confidentialité - CesiZen");*/
  });
});

// Prevent TypeScript from reading file as legacy script
//export {};
