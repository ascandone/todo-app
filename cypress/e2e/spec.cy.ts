// eslint-disable-next-line @typescript-eslint/no-var-requires
// const crypto = require("crypto");

const BASE_URL = "http://localhost:3000";

function randUsername() {
  const uuid = crypto.randomUUID();
  const username = `user-${uuid}`;
  return username;
}

it("is able to register and then log in again", () => {
  const username = randUsername();
  const password = "password";

  cy.visit(`${BASE_URL}/register`);

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(`${password}`);
  cy.get("button").contains("Register").click({ force: true });

  cy.url().should("equal", `${BASE_URL}/`);

  cy.get('button[aria-label="open menu"]').click();
  cy.get("button").contains("Log out").click();

  cy.url().should("equal", `${BASE_URL}/login`);

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(`${password}`);
  cy.get("button").contains("Log in").click({ force: true });

  cy.contains(`Hello, ${username}`);
});

it.skip("is able to do CRUD operations on todos", () => {
  cy.intercept({
    method: "POST",
    url: "/api/trpc/editTodo/**",
  }).as("trpcResponse");

  const username = randUsername();

  cy.visit(`${BASE_URL}/register`);
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type("password{Enter}");

  cy.get('input[name="todo"]').type("First todo{Enter}");
  cy.get('input[name="todo"]').type("Second todo{Enter}");
  cy.get("ul").contains("First todo");
  cy.get("ul").contains("Second todo");

  // "Second todo"
  cy.get("ul")
    .get("li")
    .first()
    .within(() => {
      cy.get('button[aria-label="toggle item"]').click();
      cy.get('input[type="checkbox"]').should("be.checked");
      cy.wait("@trpcResponse");
      cy.get('input[type="checkbox"]').should("be.checked");
    });
});
