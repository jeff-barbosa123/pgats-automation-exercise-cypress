const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: '.login-form form p',
}

function validarFormularioLoginVisivel() {
  cy.get(seletores.tituloLogin).should('be.visible').and('have.text', 'Login to your account')
}

function fazerLogin(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha, { log: false })
  cy.get(seletores.botaoLogin).click()
}

function validarCredenciaisInvalidas() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Your email or password is incorrect!')
}

function validarPaginaDeLogin() {
  cy.location('pathname').should('eq', '/login')
  validarFormularioLoginVisivel()
}

module.exports = {
  validarFormularioLoginVisivel,
  fazerLogin,
  validarCredenciaisInvalidas,
  validarPaginaDeLogin,
}
