import React from "react";
import { mount } from "@cypress/react";
import { Provider } from "../../src/components/ui/provider";
import Footer from "../../src/components/Footer/Footer";

//const theme = Theme({});

describe("Footer Component", () => {
  it("renders the footer with correct text", () => {
    mount(
      <Provider>
        <Footer />
      </Provider>
    );

    cy.get("footer").should("exist");
    cy.contains("© CesiZen : votre compagnon santé mentale.").should(
      "be.visible"
    );
  });
});
