const seletores = {
  titulosDaPagina: '#cart_items h2.heading',
  enderecoEntrega: '#address_delivery',
  itensDoPedido: '#cart_info',
  comentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',

  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',

  tituloPedidoConfirmado: '[data-qa="order-placed"]',
  mensagemConfirmacao: '#form p',
}

function validarRevisaoDoPedido(usuario) {
  cy.location('pathname').should('eq', '/checkout')
  cy.get(seletores.titulosDaPagina).contains('Address Details').should('be.visible')
  cy.get(seletores.titulosDaPagina).contains('Review Your Order').should('be.visible')
  cy.get(seletores.enderecoEntrega)
    .should('contain.text', usuario.primeiroNome)
    .and('contain.text', usuario.endereco)
  cy.get(seletores.itensDoPedido).should('be.visible')
}

function fazerPedidoComComentario(comentario) {
  cy.get(seletores.comentario).type(comentario)
  cy.get(seletores.botaoFazerPedido).click()
}

function pagar(cartao) {
  cy.get(seletores.nomeNoCartao).type(cartao.nome)
  cy.get(seletores.numeroCartao).type(cartao.numero, { log: false })
  cy.get(seletores.cvc).type(cartao.cvc, { log: false })
  cy.get(seletores.mesValidade).type(cartao.mesValidade)
  cy.get(seletores.anoValidade).type(cartao.anoValidade)
  cy.get(seletores.botaoPagar).click()
}

function validarPedidoRealizado() {
  cy.location('pathname').should('include', '/payment_done')
  cy.get(seletores.tituloPedidoConfirmado).should('be.visible').and('have.text', 'Order Placed!')
  cy.contains(seletores.mensagemConfirmacao, 'Congratulations! Your order has been confirmed!')
    .should('be.visible')
}

module.exports = {
  validarRevisaoDoPedido,
  fazerPedidoComComentario,
  pagar,
  validarPedidoRealizado,
}
