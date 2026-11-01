const seletores = {
  botaoAdicionar: (idProduto) => `.productinfo a.add-to-cart[data-product-id="${idProduto}"]`,
  modalCarrinho: '#cartModal',
  botaoContinuarComprando: '#cartModal .close-modal',
  tabelaCarrinho: '#cart_info_table',
  linhaProduto: (idProduto) => `#product-${idProduto}`,
  botaoFinalizar: '.check_out',
}

function adicionarProdutoAoCarrinho(idProduto) {
  cy.get(seletores.botaoAdicionar(idProduto)).first().scrollIntoView().click()
  cy.get(seletores.modalCarrinho).should('be.visible')
  cy.get(seletores.botaoContinuarComprando).click()
  cy.get(seletores.modalCarrinho).should('not.be.visible')
}

function validarPaginaDoCarrinho(idsProdutos) {
  cy.location('pathname').should('eq', '/view_cart')
  cy.get(seletores.tabelaCarrinho).should('be.visible')
  idsProdutos.forEach((id) => {
    cy.get(seletores.linhaProduto(id)).should('be.visible')
  })
}

function finalizarCompra() {
  cy.get(seletores.botaoFinalizar).contains('Proceed To Checkout').click()
}

module.exports = {
  adicionarProdutoAoCarrinho,
  validarPaginaDoCarrinho,
  finalizarCompra,
}
