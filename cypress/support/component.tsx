/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";
import { mount } from "cypress/react";
import { Provider } from "../../src/components/ui/provider";
// Adjust the path to your theme file if needed
import "@cypress/code-coverage/support";

// Augment the Cypress namespace to include type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mountComponent;
    }
    interface Window {
      __coverage__?: unknown;
    }
  }
}
//

// Custom mount function that wraps components in ChakraProvider
const mountComponent = (component: React.ReactNode) => {
  return mount(<Provider>{component}</Provider>);
};

// Add the custom mount function to Cypress commands
Cypress.Commands.add("mount", mountComponent);
// Exécuter le task code coverage
Cypress.on("window:before:load", (win) => {
  win.__coverage__ = {}; // Assurer que le coverage est bien activé
});

// Example use:
// cy.mount(<MyComponent />)

export {};
