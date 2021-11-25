describe("Note app", function() {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", () => {
    cy.contains("Notes");
    cy.contains("Note app, Department of Computer Science, University of Helsinki");
  });

  it("login form can be opened", () => {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
  });

  it("user can log in", () => {
    cy.contains("login").click();
    cy.get("#username").type("root");
    cy.get("#password").type("fsosupersuser");
    cy.get("#loginSubmit").click();
    cy.contains("Superuser is logged in.");
  });

});