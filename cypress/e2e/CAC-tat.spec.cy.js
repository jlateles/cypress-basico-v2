describe('Central de Atendimento ao Cliente TAT', () => {
  
  it('verifica o título da aplicação', () => {
    const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    cy.visit('./src/index.html') //ação: visitar a página
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); // verificação: ver se o título é apresentado
    cy.get('input[id="firstName"]').type('Júlia').should('have.value', 'Júlia');
    cy.get('input[id="lastName"]').type('Bispo').should('have.value', 'Bispo');
    cy.get('input[id="email"]').type('juliabispo@duck.com');
    cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0});
    cy.get('.button').click()
    cy.get('.success').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="firstName"]').type('Júlia').should('have.value', 'Júlia');
    cy.get('[data-testid="input-firstName"]')
    cy.get('input[id="lastName"]').type('Bispo').should('have.value', 'Bispo');
    cy.get('input[id="email"]').type('juliabispo@duck,cm');
    cy.get('textarea[id="open-text-area"]').type('Teste');
    cy.get('.button').click()
    cy.get('.error').should('be.visible');

  })
})