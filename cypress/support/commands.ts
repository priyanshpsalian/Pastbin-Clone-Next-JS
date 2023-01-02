// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToastMessage', (messages: string[]) => {
  cy.get('.Toastify__toast-body').each((el, index, list) => {
    cy.wrap(el).should('contain', messages[index]);
  });
});

declare namespace Cypress {
  interface Chainable {
    /**
     * Get the `Toastify` messages popup
     * @example cy.getToastMessage('"filename" should not be empty')
     */
    getToastMessage: (messages: string[]) => void;
  }
}
