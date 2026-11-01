const seletores = {
  tituloLista: '.features_items h2.title',
  cardsDeProduto: '.features_items .product-image-wrapper',
  nomesDosProdutos: '.features_items .productinfo p',
  linkVerProduto: '.choose a[href^="/product_details/"]',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',

  detalhes: '.product-information',
  nomeDetalhe: '.product-information h2',
  paragrafosDetalhe: '.product-information p',
  precoDetalhe: '.product-information span span',
}

function validarPaginaTodosProdutos() {
  cy.location('pathname').should('eq', '/products')
  cy.get(seletores.tituloLista).should('be.visible').and('have.text', 'All Products')
}

function validarListaDeProdutosVisivel() {
  cy.get(seletores.cardsDeProduto).should('have.length.greaterThan', 0)
  cy.get(seletores.cardsDeProduto).first().should('be.visible')
}

function verPrimeiroProduto() {
  cy.get(seletores.linkVerProduto).first().click()
}

function validarDetalhesDoProduto() {
  cy.location('pathname').should('match', /^\/product_details\/\d+$/)
  cy.get(seletores.detalhes).should('be.visible')
  cy.get(seletores.nomeDetalhe).should('be.visible').and('not.be.empty')
  cy.get(seletores.paragrafosDetalhe).contains('Category:').should('be.visible')
  cy.get(seletores.precoDetalhe).should('be.visible').and('contain.text', 'Rs.')
  cy.get(seletores.paragrafosDetalhe).contains('Availability:').should('be.visible')
  cy.get(seletores.paragrafosDetalhe).contains('Condition:').should('be.visible')
  cy.get(seletores.paragrafosDetalhe).contains('Brand:').should('be.visible')
}

function buscarProduto(termo) {
  cy.get(seletores.campoBusca).type(termo)
  cy.get(seletores.botaoBusca).click()
}

function validarResultadoDaBusca(termo) {
  cy.get(seletores.tituloLista).should('be.visible').and('have.text', 'Searched Products')
  cy.get(seletores.nomesDosProdutos)
    .should('have.length.greaterThan', 0)
    .each(($nome) => {
      expect($nome.text().toLowerCase()).to.contain(termo.toLowerCase())
    })
}

module.exports = {
  validarPaginaTodosProdutos,
  validarListaDeProdutosVisivel,
  verPrimeiroProduto,
  validarDetalhesDoProduto,
  buscarProduto,
  validarResultadoDaBusca,
}
