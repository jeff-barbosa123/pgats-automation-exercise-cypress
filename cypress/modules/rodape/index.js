const seletores = {
  rodape: '#footer',
  tituloInscricao: '#footer .single-widget h2',
  emailInscricao: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemSucesso: '#success-subscribe .alert-success',
}

function rolarAteORodape() {
  cy.get(seletores.rodape).scrollIntoView()
}

function validarInscricaoVisivel() {
  cy.get(seletores.tituloInscricao).should('be.visible').and('have.text', 'Subscription')
}

function inscreverEmail(email) {
  cy.get(seletores.emailInscricao).type(email)
  cy.get(seletores.botaoInscrever).click()
}

function validarInscricaoRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('have.text', 'You have been successfully subscribed!')
}

module.exports = {
  rolarAteORodape,
  validarInscricaoVisivel,
  inscreverEmail,
  validarInscricaoRealizada,
}
