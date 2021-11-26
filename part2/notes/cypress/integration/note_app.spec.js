describe("Note app", () => {
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

  describe("basic funcionality", () => {
    it("front page can be opened", () => {
      cy.contains("Notes");
      cy.contains("Note app, Department of Computer Science, University of Helsinki");
    });

    it("login form can be opened", () => {
      cy.contains("login").click();
    });

  });


  describe("login handling", () => {
    it("user can log in", () => {
      cy.contains("login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("fsosuperuser");
      cy.get("#loginSubmit").click();
      cy.contains("Superuser is logged in.");
    });

    it("login fails with wrong password", () => {
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
  });


  describe("when logged in", () => {
    beforeEach(() => {
      cy.login("root", "fsosuperuser");
    });

    it("a new note can be created", () => {
      cy.contains("new note").click();
      cy.get("#newNoteInput").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });


    describe("and several notes exist", () => {
      beforeEach(() => {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it.only("one of those can be made important", () => {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make unimportant");
      });
    });
  });
});