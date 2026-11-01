const seletores = {
  tituloNovoUsuario: '.signup-form h2',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  mensagemErroSignup: '.signup-form form p',

  tituloInformacoesConta: '.login-form h2',
  tratamentoSr: '#id_gender1',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  tituloContaCriada: '[data-qa="account-created"]',
  tituloContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
}

function validarFormularioNovoUsuarioVisivel() {
  cy.get(seletores.tituloNovoUsuario).should('be.visible').and('have.text', 'New User Signup!')
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.nome).type(nome)
  cy.get(seletores.email).type(email)
  cy.get(seletores.botaoSignup).click()
}

function validarInformacoesDaContaVisivel() {
  cy.get(seletores.tituloInformacoesConta)
    .first()
    .should('be.visible')
    .and('contain.text', 'Enter Account Information')
}

function preencherInformacoesDaConta(usuario) {
  cy.get(seletores.tratamentoSr).check()
  cy.get(seletores.senha).type(usuario.senha, { log: false })
  cy.get(seletores.dia).select(usuario.dia)
  cy.get(seletores.mes).select(usuario.mes)
  cy.get(seletores.ano).select(usuario.ano)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.ofertas).check()
}

function preencherEndereco(usuario) {
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome)
  cy.get(seletores.sobrenome).type(usuario.sobrenome)
  cy.get(seletores.empresa).type(usuario.empresa)
  cy.get(seletores.endereco).type(usuario.endereco)
  cy.get(seletores.complemento).type(usuario.complemento)
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.estado).type(usuario.estado)
  cy.get(seletores.cidade).type(usuario.cidade)
  cy.get(seletores.cep).type(usuario.cep)
  cy.get(seletores.celular).type(usuario.celular)
}

function criarConta() {
  cy.get(seletores.botaoCriarConta).click()
}

function validarContaCriada() {
  cy.get(seletores.tituloContaCriada).should('be.visible').and('have.text', 'Account Created!')
}

function validarContaExcluida() {
  cy.get(seletores.tituloContaExcluida).should('be.visible').and('have.text', 'Account Deleted!')
}

function clicarEmContinuar() {
  cy.get(seletores.botaoContinuar).click()
}

function validarEmailJaCadastrado() {
  cy.get(seletores.mensagemErroSignup)
    .should('be.visible')
    .and('have.text', 'Email Address already exist!')
}

// Fluxo completo de cadastro pela interface, reaproveitado nos casos de checkout.
function cadastrarUsuarioCompleto(usuario) {
  iniciarCadastro(usuario.nome, usuario.email)
  validarInformacoesDaContaVisivel()
  preencherInformacoesDaConta(usuario)
  preencherEndereco(usuario)
  criarConta()
}

module.exports = {
  validarFormularioNovoUsuarioVisivel,
  iniciarCadastro,
  validarInformacoesDaContaVisivel,
  preencherInformacoesDaConta,
  preencherEndereco,
  criarConta,
  validarContaCriada,
  validarContaExcluida,
  clicarEmContinuar,
  validarEmailJaCadastrado,
  cadastrarUsuarioCompleto,
}
