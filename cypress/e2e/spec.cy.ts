// eslint-disable-next-line @typescript-eslint/no-var-requires
// const crypto = require("crypto");

const BASE_URL = "http://localhost:3000";

it("is able to register and then log in again", () => {
  const uuid = crypto.randomUUID();
  cy.visit(`${BASE_URL}/register`);

  const username = `user-${uuid}`;
  const password = "password";

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(`${password}{Enter}`);

  cy.url().should("equal", `${BASE_URL}/`);

  cy.get('button[aria-label="open menu"]').click();
  cy.get("button").contains("Log out").click();

  cy.url().should("equal", `${BASE_URL}/login`);

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(`${password}{Enter}`);

  cy.contains(`Hello, ${username}`);
});
