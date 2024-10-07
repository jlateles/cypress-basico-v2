describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') //ação: visitar a página
  })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente'); // verificação: ver se o título é apresentado
  })

  it('preenche os campo do formulário e clica no botão de enviar', () => {
    const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    
    cy.get('input[id="firstName"]').type('Júlia').should('have.value', 'Júlia');
    cy.get('input[id="lastName"]').type('Bispo').should('have.value', 'Bispo');
    cy.get('input[id="email"]').type('juliabispo@duck.com');
    cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0});
    cy.contains('.button', 'Enviar').click() // usando o comando contains como outra forma de identificar um elemento 
    cy.get('.success').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="firstName"]').type('Júlia').should('have.value', 'Júlia');
    cy.get('input[id="lastName"]').type('Bispo').should('have.value', 'Bispo');
    cy.get('input[id="email"]').type('juliabispo@duck,cm');
    cy.get('textarea[id="open-text-area"]').type('Teste');
    cy.get('.button').click()

    cy.get('.error').should('be.visible');
  })

  it('garantir que o campo de teelefone só aceita números e quando insirido valor não-númerico deve ficar vazio', () =>{
    cy.get('#phone')
      .type('abcdefgh')
        .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]').type('Júlia').should('have.value', 'Júlia');
    cy.get('input[id="lastName"]').type('Bispo').should('have.value', 'Bispo');
    cy.get('input[id="email"]').type('juliabispo@duck.com');
    cy.get('#phone-checkbox').click()
    cy.get('textarea[id="open-text-area"]').type('Teste');
    cy.get('.button').click()

    cy.get('.error').should('be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]')
      .type('Júlia')
        .should('have.value', 'Júlia')
          .clear()
          .should('have.value', '');
    cy.get('input[id="lastName"]')
      .type('Bispo')
        .should('have.value', 'Bispo')
          .clear()
          .should('have.value', '');
    cy.get('input[id="email"]')
      .type('juliabispo@duck.com')
        .should('have.value', 'juliabispo@duck.com')
          .clear()
            .should('have.value', '');
    cy.get('#phone')
      .type('21973644513')
        .should('have.value', '21973644513')
          .clear()
            .should('have.value', '');
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.get('.button').click()
    cy.get('.error').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible');
  })

})