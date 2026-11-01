const seletores = {
  logo: '.logo img',
  carrossel: '#slider',
  linkLogin: 'a[href="/login"]',
  linkLogout: 'a[href="/logout"]',
  linkExcluirConta: 'a[href="/delete_account"]',
  linkProdutos: 'a[href="/products"]',
  linkCarrinho: '.shop-menu a[href="/view_cart"]',
  itensDoMenu: '.shop-menu li',
}

function acessarHome() {
  cy.visit('/')
}

function validarHomeVisivel() {
  cy.title().should('eq', 'Automation Exercise')
  cy.get(seletores.logo).should('be.visible')
  cy.get(seletores.carrossel).should('be.visible')
}

function irParaLogin() {
  cy.get(seletores.linkLogin).click()
}

function irParaProdutos() {
  cy.get(seletores.linkProdutos).click()
}

function irParaCarrinho() {
  cy.get(seletores.linkCarrinho).click()
}

function fazerLogout() {
  cy.get(seletores.linkLogout).click()
}

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click()
}

function validarLogadoComo(nome) {
  cy.get(seletores.itensDoMenu)
    .contains('Logged in as')
    .should('be.visible')
    .find('b')
    .should('have.text', nome)
}

module.exports = {
  acessarHome,
  validarHomeVisivel,
  irParaLogin,
  irParaProdutos,
  irParaCarrinho,
  fazerLogout,
  excluirConta,
  validarLogadoComo,
}
