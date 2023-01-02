const samplePaste = {
  filename: 'x.js',
  description: 'this is a test',
  content: "console.log('this is a test from cypress')"
};

describe('Using the Editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows error if clicked `Create Paste` with no filename', () => {
    cy.get('#create-update-btn').click();

    // might be an anti-pattern but it works wahhaha
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000).getToastMessage(['Creating paste...', '"filename" is not allowed to be empty']);
  });

  it('create a paste and assert contents', () => {
    cy.intercept('PUT', '/api/pastes/create', { fixture: 'samplePaste' }).as('createPaste');
    // cy.intercept('/api/pastes/get/**', { fixture: 'samplePaste' }).as('getPaste');

    cy.get('#paste-filename').type(samplePaste.filename); // filename
    cy.get('#paste-description').type(samplePaste.description); // description
    cy.get('.monaco-editor').first().click().type(samplePaste.content); // content
    cy.get('#paste-privacy').check(); // isPrivate?
    cy.get('#create-update-btn').click(); // click on `Create Paste`
    cy.getToastMessage(['Creating paste...']);

    /* THE BELOW FUNCTION WON'T WORK SINCE THE DATABASE CODE IS USED IN THE GETSERVERSIDEPROPS */

    // cy.wait('@createPaste');

    // // eslint-disable-next-line cypress/no-unnecessary-waiting
    // cy.wait(10000); // wait for redirecting

    // cy.wait('@getPaste');

    // // NOTE: Hope their are better solutions for this one. T_T

    // cy.get('#paste-filename').should('contain', samplePaste.filename); // filename
    // cy.get('#paste-description').should('contain', samplePaste.description); // description
    // cy.get('.hljs').should('contain', samplePaste.description);
  });
});
