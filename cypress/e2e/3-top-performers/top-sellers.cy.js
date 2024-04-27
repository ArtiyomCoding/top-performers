/// <reference types="cypress" />
const frontend_port = Cypress.env("frontend_port");

describe("purchases", () => {
  const email = "test@user.com";
  const password = "1234";
  const login_uri = "http://localhost:" + frontend_port + "/login";
  const purchases_uri = "http://localhost:" + frontend_port + "/purchases";

  beforeEach(() => {
    cy.visit(login_uri);

    cy.get("#email").click();
    cy.get("#email").type(email);
    cy.get("#password").click();
    cy.get("#password").type(password);
    cy.get("#submit_login").click();
    cy.contains("Test User");

    cy.visit(purchases_uri);
  });

  it("view purchases", () => {
    cy.contains("Category").should("be.visible");
    cy.contains("adidas").should("be.visible");
  });

  it("filters Boots", () => {
    cy.get("#categories-filter").click();
    cy.get("#categories-filter-option-0").click();
    cy.get("table").should("include.text", "Boots");
    cy.get("table").should("not.include.text", "Sandals");
  });

  it("filters Ankle", () => {
    cy.get("#types-filter").click();
    cy.get("#types-filter-option-0").click();
    cy.get("table").should("include.text", "Ankle");
    cy.get("table").should("not.include.text", "Athletic");
  });

  it("filters adidas", () => {
    cy.get("#brands-filter").click();
    cy.get("#brands-filter-option-0").click();
    cy.get("table").should("include.text", "adidas");
    cy.get("table").should("not.include.text", "Ahnu");
  });

  it("filters earliest purchaae date", () => {
    cy.get("#earliest-purchase-date-picker").click();
    cy.get("#earliest-purchase-date-picker").type("01.02.2022");
    cy.get("table").should("not.include.text", "Ahnu");
    cy.get("table").should("include.text", "adidas");
  });

  it("filters latest purchase date", () => {
    cy.get("#latest-purchase-date-picker").click();
    cy.get("#latest-purchase-date-picker").type("01.06.2022");
    cy.get("table").should("not.include.text", "adidas");
    cy.get("table").should("include.text", "Ahnu");
  });
});
