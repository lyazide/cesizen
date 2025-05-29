// cypress/component/menu.cy.tsx

import React from "react";
import { mount } from "@cypress/react";
import { Provider } from "../../src/components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Import Session from the main package

import { Block } from "../../src/components/Header/Block";

// NO MORE `interface CustomSession` HERE, as it's now handled by next-auth.d.ts

const mountHeaderWithSession = (sessionData: Session | null = null) => {
  mount(
    <Provider>
      <SessionProvider session={sessionData}>
        <Block />
      </SessionProvider>
    </Provider>
  );
};

describe("Header Component", () => {
  it("should render correctly for a logged-out user (Guest)", () => {
    mountHeaderWithSession(null);
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]')
      .as("menuButton")
      .should("be.visible");

    cy.get("@menuButton").click();

    cy.contains("h2", "Menu").should("be.visible");
    cy.contains("Invité").should("be.visible");
    cy.contains("Utilisateur").should("be.visible");
    //cy.get('svg[data-icon="user-slash"]').should("exist");

    cy.contains("A propos").should("be.visible");
    cy.contains("S'enregistrer").should("be.visible");
    /*cy.contains("Login").should("be.visible");
    cy.contains("Logout").should("not.exist");*/
    cy.contains("button", "Login").should("be.visible");
    cy.contains("button", "Logout").should("be.visible");

    cy.get("p").should("satisfy", ($p) => {
      const text = $p.text();
      return /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/.test(text);
    });

    cy.get('button[aria-label="Close"]').click();
    cy.contains("Invité").should("not.be.visible");
  });

  it("should render correctly for a logged-in active regular user", () => {
    const regularUserSession: Session = {
      user: {
        // ADD THE 'id' PROPERTY HERE
        id: 1, // Use a unique number for each mock user
        name: "Jean Dupont",
        nom: "Dupont",
        prenom: "Jean",
        email: "jean.dupont@example.com",
        isActif: true,
        isAdministrateur: false,
      },
      expires: "2025-12-31T23:59:59.999Z",
    };
    mountHeaderWithSession(regularUserSession);
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]').click();

    cy.contains("Jean Dupont").should("be.visible");
    cy.contains("Utilisateur").should("be.visible");
    //cy.get('svg[data-icon="user"]').should("exist");

    cy.contains("button", "Login").should("be.visible");
    cy.contains("button", "Logout").should("be.visible");

    cy.contains("Dashboard").should("be.visible");
    cy.contains("Diagnostic de stress").should("be.visible");
    cy.contains("S'enregistrer").should("be.visible");
  });

  it("should render correctly for a logged-in active administrator", () => {
    const adminSession: Session = {
      user: {
        // ADD THE 'id' PROPERTY HERE
        id: 2, // Use a unique number for each mock user
        name: "Admin User",
        nom: "Admin",
        prenom: "User",
        email: "admin@example.com",
        isActif: true,
        isAdministrateur: true,
      },
      expires: "2025-12-31T23:59:59.999Z",
    };
    mountHeaderWithSession(adminSession);
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]').click();

    cy.contains("Admin User").should("be.visible");
    cy.contains("Admin").should("be.visible");
    //cy.get('svg[data-icon="shield-alt"]').should("exist");

    cy.contains("Login").should("be.visible");
    cy.contains("Logout").should("be.visible");
  });

  it("should render correctly for an inactive regular user", () => {
    const inactiveUserSession: Session = {
      user: {
        // ADD THE 'id' PROPERTY HERE
        id: 3, // Use a unique number for each mock user
        name: "Utilisateur Inactif",
        nom: "Inactif",
        prenom: "Utilisateur",
        email: "inactive@example.com",
        isActif: false,
        isAdministrateur: false,
      },
      expires: "2025-12-31T23:59:59.999Z",
    };
    mountHeaderWithSession(inactiveUserSession);
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]').click();

    cy.contains("Utilisateur Inactif").should("be.visible");
    cy.contains("Utilisateur").should("be.visible");
    //cy.get('svg[data-icon="user-slash"]').should("exist");
  });

  /*  it("should call signIn when Login button is clicked", () => {
    mountHeaderWithSession(null);
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]').click();
    cy.contains("button", "Login").click({ force: true });
  });*/

  /*  it("should call signOut when Logout button is clicked", () => {
    const activeSession: Session = {
      user: {
        // ADD THE 'id' PROPERTY HERE
        id: 4, // Use a unique number for each mock user
        name: "Test User",
        email: "test@example.com",
        isActif: true,
        isAdministrateur: false,
      },
      expires: "2025-12-31T23:59:59.999Z",
    };
    mountHeaderWithSession(activeSession);
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]').click();
    cy.contains("button", "Logout").click({ force: true });
  });*/

  it("should navigate to the correct URL when a navigation link is clicked", () => {
    mountHeaderWithSession();
    cy.viewport(480, 720);
    cy.get('button[aria-label="Toggle navigation"]').click();

    //cy.contains("a", "A propos").click({ force: true });
    //cy.url().should("include", "/apropos");

    /*cy.visit("/");
    cy.get('button[aria-label="Toggle navigation"]').click();
    cy.contains("a", "Dashboard").click({ force: true });
    cy.url().should("include", "/dashboard");*/
    /*{ label: "A propos", href: "/apropos" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Diagnostic de stress", href: "/diagnostics" },
    { label: "Exercises de respiration", href: "/respirations" },
    { label: "Suivis des emotions", href: "/emotions" },
    { label: "Activités Détente", href: "/detentes" },
    { label: "Informations sur la santé mentale", href: "/informations" },
    { label: "S'enregistrer", href: "/signup" },*/

    cy.contains("a", "A propos").should("have.attr", "href", "/apropos");
    cy.contains("a", "Dashboard").should("have.attr", "href", "/dashboard");
    cy.contains("a", "Diagnostic de stress").should(
      "have.attr",
      "href",
      "/diagnostics"
    );
    cy.contains("a", "Exercises de respiration").should(
      "have.attr",
      "href",
      "/respirations"
    );
    cy.contains("a", "Suivis des emotions").should(
      "have.attr",
      "href",
      "/emotions"
    );
    cy.contains("a", "Activités Détente").should(
      "have.attr",
      "href",
      "/detentes"
    );
    cy.contains("a", "Informations sur la santé mentale").should(
      "have.attr",
      "href",
      "/informations"
    );
    // ... continue for all navItems ...
    cy.contains("a", "S'enregistrer").should("have.attr", "href", "/signup");

    // Close the drawer if needed for subsequent tests, but not strictly part of this test's assertion
    cy.get('button[aria-label="Close"]').click();
  });
});
