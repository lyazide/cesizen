/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Commande personnalisée pour se connecter
     * @example cy.login('email', 'motDePasse')
     */
    login(email: string, password: string): Chainable<void>;
  }
}
