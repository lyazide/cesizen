/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  it("Dois naviguer vers la page à propos", () => {
    cy.viewport(480, 720);

    // Start from the index page
    cy.visit("http://localhost:3000");

    cy.get('[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="diagnostics"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/diagnostics");
    cy.get("h1").contains("Questionnaire diagnostic de stress");
    cy.contains("Mort du conjoint (100 points)").click();
    cy.contains("Divorce (73 points)").click();
    cy.contains("Séparation des époux (65 points)").click();
    cy.contains("Mort d’un parent proche (63 points)").click();
    cy.contains("Période de prison (63 points)").click();
    cy.contains("Blessure corporelle ou maladie (53 points)").click();
    cy.contains("Mariage (50 points)").click();
    cy.contains("Licenciement (47 points)").click();
    cy.contains("Réconciliation entre époux (45 points)").click();
    cy.contains("Départ à la retraite (45 points)").click();
    cy.contains(
      "Changement dans la santé d’un membre de la famille (44 points)"
    ).click();
    cy.contains("Grossesse (40 points)").click();
    cy.contains("Difficultés sexuelles (39 points)").click();
    cy.contains(
      "Arrivée d’un nouveau membre dans la famille (39 points)"
    ).click();
    cy.contains("Changement dans l’univers du travail (39 points)").click();
    cy.contains("Changement au niveau financier (38 points)").click();
    cy.contains("Mort d’un ami proche (37 points)").click();
    cy.contains("Changement de fonction professionnelle (36 points)").click();
    cy.contains(
      "Modification de la fréquence des scènes de ménage (35 points)"
    ).click();
    cy.contains("Hypothèque ou emprunt de plus de 3.000 € (31 points)").click();
    cy.contains("Saisie sur hypothèque ou sur prêt (30 points)").click();
    cy.contains(
      "Changement de responsabilité dans le travail (29 points)"
    ).click();
    cy.contains("Départ du foyer d’une fille ou d’un fils (29 points)").click();
    cy.contains("Difficultés avec les beaux-parents (29 points)").click();
    cy.contains("Succès exceptionnel (28 points)").click();
    cy.contains(
      "Conjoint commençant ou cessant de travailler (26 points)"
    ).click();
    cy.contains("Début ou fin des études (26 points)").click();
    cy.contains("Changement dans les conditions de vie (25 points)").click();
    cy.contains("Changement d’habitudes (24 points)").click();
    cy.contains(
      "Difficultés avec son employeur/son manager (23 points)"
    ).click();
    cy.contains(
      "Changement d’horaires ou de conditions de travail (20 points)"
    ).click();
    cy.contains("Changement de domicile (20 points)").click();
    cy.contains("Changement de lieu d’étude (20 points)").click();
    cy.contains("Changement dans les loisirs (19 points)").click();
    cy.contains(
      "Changement dans les activités de la paroisse (19 points)"
    ).click();
    cy.contains("Changement dans les activités sociales (19 points)").click();
    cy.contains("Hypothèque ou emprunt de moins de 3.000€ (17 points)").click();
    cy.contains("Changement dans les habitudes de sommeil (16 points)").click();
    cy.contains(
      "Changement du nombre de réunions de famille (15 points)"
    ).click();
    cy.contains(
      "Changement dans les habitudes alimentaires (15 points)"
    ).click();
    cy.contains("Vacances (13 points)").click();
    cy.contains("Noël (12 points)").click();
    cy.contains(
      "Infractions mineures à la loi, contraventions (11 points)"
    ).click();
    // The new page should contain an h1 with "About page"
    cy.get("h2").contains("Total des points: 1467");

    cy.contains("Mort du conjoint (100 points)").click();
    cy.contains("Divorce (73 points)").click();
    cy.contains("Séparation des époux (65 points)").click();
    cy.contains("Mort d’un parent proche (63 points)").click();
    cy.contains("Période de prison (63 points)").click();
    cy.contains("Blessure corporelle ou maladie (53 points)").click();
    cy.contains("Mariage (50 points)").click();
    cy.contains("Licenciement (47 points)").click();
    cy.contains("Réconciliation entre époux (45 points)").click();
    cy.contains("Départ à la retraite (45 points)").click();
    cy.contains(
      "Changement dans la santé d’un membre de la famille (44 points)"
    ).click();
    cy.contains("Grossesse (40 points)").click();
    cy.contains("Difficultés sexuelles (39 points)").click();
    cy.contains(
      "Arrivée d’un nouveau membre dans la famille (39 points)"
    ).click();
    cy.contains("Changement dans l’univers du travail (39 points)").click();
    cy.contains("Changement au niveau financier (38 points)").click();
    cy.contains("Mort d’un ami proche (37 points)").click();
    cy.contains("Changement de fonction professionnelle (36 points)").click();
    cy.contains(
      "Modification de la fréquence des scènes de ménage (35 points)"
    ).click();
    cy.contains("Hypothèque ou emprunt de plus de 3.000 € (31 points)").click();
    cy.contains("Saisie sur hypothèque ou sur prêt (30 points)").click();
    cy.contains(
      "Changement de responsabilité dans le travail (29 points)"
    ).click();
    cy.contains("Départ du foyer d’une fille ou d’un fils (29 points)").click();
    cy.contains("Difficultés avec les beaux-parents (29 points)").click();
    cy.contains("Succès exceptionnel (28 points)").click();
    cy.contains(
      "Conjoint commençant ou cessant de travailler (26 points)"
    ).click();
    cy.contains("Début ou fin des études (26 points)").click();
    cy.contains("Changement dans les conditions de vie (25 points)").click();
    cy.contains("Changement d’habitudes (24 points)").click();
    cy.contains(
      "Difficultés avec son employeur/son manager (23 points)"
    ).click();
    cy.contains(
      "Changement d’horaires ou de conditions de travail (20 points)"
    ).click();
    cy.contains("Changement de domicile (20 points)").click();
    cy.contains("Changement de lieu d’étude (20 points)").click();
    cy.contains("Changement dans les loisirs (19 points)").click();
    cy.contains(
      "Changement dans les activités de la paroisse (19 points)"
    ).click();
    cy.contains("Changement dans les activités sociales (19 points)").click();
    cy.contains("Hypothèque ou emprunt de moins de 3.000€ (17 points)").click();
    cy.contains("Changement dans les habitudes de sommeil (16 points)").click();
    cy.contains(
      "Changement du nombre de réunions de famille (15 points)"
    ).click();
    cy.contains(
      "Changement dans les habitudes alimentaires (15 points)"
    ).click();
    cy.contains("Vacances (13 points)").click();
    cy.contains("Noël (12 points)").click();
    cy.contains(
      "Infractions mineures à la loi, contraventions (11 points)"
    ).click();
    // The new page should contain an h1 with "About page"
    cy.get("h2").contains("Total des points: 0");
  });
});

// Prevent TypeScript from reading file as legacy script
//export {};
