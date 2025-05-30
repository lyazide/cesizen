describe("Diagnostics API (Mocked Responses)", () => {
  const baseUrl = "http://localhost:3000/api/diagnostics";

  // Mock responses using cy.intercept()
  beforeEach(() => {
    cy.intercept("GET", baseUrl, {
      statusCode: 200,
      body: {
        data: [
          { id: 1, evenement: "Mock Event 1", points: 10 },
          { id: 2, evenement: "Mock Event 2", points: 20 },
        ],
      },
    }).as("getDiagnostics");

    cy.intercept("POST", baseUrl, {
      statusCode: 201,
      body: { data: { id: 3, evenement: "New Event", points: 30 } },
    }).as("createDiagnostic");

    cy.intercept("PUT", baseUrl, {
      statusCode: 201,
      body: { data: { id: 1, evenement: "Updated Event", points: 40 } },
    }).as("updateDiagnostic");

    cy.intercept("DELETE", baseUrl, {
      statusCode: 201,
      body: { data: { id: 1 } },
    }).as("deleteDiagnostic");

    cy.intercept("GET", baseUrl, {
      statusCode: 404,
      body: { error: "No diagnostics found." },
    }).as("notFound");
  });

  // Test fetching diagnostics
  it("should fetch diagnostics successfully (mocked)", () => {
    cy.wait("@getDiagnostics").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  // Test creating a diagnostic
  it("should create a new diagnostic (mocked)", () => {
    cy.request("POST", baseUrl, { evenement: "Test Event", points: 50 }).then(
      (response) => {
        expect(response.status).to.eq(201);
        expect(response.body.data.evenement).to.eq("New Event");
      }
    );
  });

  // Test updating a diagnostic
  it("should update a diagnostic (mocked)", () => {
    cy.request("PUT", baseUrl, {
      id: 1,
      evenement: "Updated Event",
      points: 75,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.evenement).to.eq("Updated Event");
    });
  });

  // Test deleting a diagnostic
  it("should delete a diagnostic (mocked)", () => {
    cy.request("DELETE", baseUrl, { id: 1 }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  // Test when no diagnostics are found
  it("should return 404 when no diagnostics are found", () => {
    cy.wait("@notFound").then(({ response }) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("error", "No diagnostics found.");
    });
  });

  // Test handling a server error (status 500)
  it("should handle server errors gracefully", () => {
    cy.intercept("GET", baseUrl, {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("serverError");

    cy.wait("@serverError").then(({ response }) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property("error", "Internal Server Error");
    });
  });
});
