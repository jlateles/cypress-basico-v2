describe('testando 3 funcionalidades diferentes de busca', () => { 
  const searchTerm = 'cypress.io'
  beforeEach(() => {
    cy.intercept(
      'GET', 
      `**?q=${searchTerm}**`
    ).as('getSearchResults')

    cy.visit('https://duckduckgo.com/')

    cy.get('input[type="text"]')
      .as('searchField')
      .should('be.visible')
  })
  // types and hits ENTER 
  it('primeiro cenário de busca', () => {
    cy.get('@searchField')
      .type(`${searchTerm}{enter}`)

    cy.wait('@getSearchResults')
  })
  // types and clicks the magnifying glass button
  it('segundo cenário de busca', () => {
    cy.get('@searchField')
      .type(searchTerm)
    cy.get('input[type="submit"]') // nao passou 
      .should('be.visible')
      .click()
    cy.wait('@getSearchResults')
  })
  // types and submits the form directly
  it('terceiro cenário de busca', () => {
    cy.get('@searchField')
      .type(searchTerm)
    cy.get('form').submit()
    cy.wait('@getSearchResults')
  })

})