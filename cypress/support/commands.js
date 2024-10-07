Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id="firstName"]').type('Pedro').should('have.value', 'Pedro');
    cy.get('input[id="lastName"]').type('Belchior').should('have.value', 'Belchior');
    cy.get('input[id="email"]').type('pedrobelchior@duck.com');
    cy.get('textarea[id="open-text-area"]').type('Testando a funcionalidade de textarea');
    cy.get('.button').click()
})