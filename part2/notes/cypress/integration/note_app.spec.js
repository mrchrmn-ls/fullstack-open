describe("Note app", function() {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/tests/reset");
    const user = {
      name: "Superuser",
      username: "root",
      password: "fsosuperuser"
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
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
    cy.get("#password").type("fsosuperuser");
    cy.get("#loginSubmit").click();
    cy.contains("Superuser is logged in.");
  });

  it("login fails with wrong password", function() {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#loginSubmit").click();

    cy.get(".error")
      .should("contain", "Wrong credentials.")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });


  describe("when logged in", function() {
    beforeEach(function() {
      cy.contains("login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("fsosuperuser");
      cy.get("#loginSubmit").click();
      });

    it("a new note can be created", function() {
      cy.contains("new note").click();
      cy.get("#newNoteInput").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });


    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("#newNoteInput").type("another note from cypress");
        cy.contains("save").click();
      });

      it("it can be made important", function () {
        cy.contains("another note from cypress")
          .contains("make important")
          .click();

        cy.contains("another note from cypress")
          .contains("make unimportant");
      });
    });
  });

});