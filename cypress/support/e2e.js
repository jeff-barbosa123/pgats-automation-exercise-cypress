import 'cypress-mochawesome-reporter/register'
import './commands'

// O site carrega anúncios de terceiros que lançam erros de JavaScript
// que não têm relação com a aplicação. Eles não devem derrubar os testes.
Cypress.on('uncaught:exception', () => false)

// Bloqueia anúncios (Google Ads / vinheta em tela cheia) que cobrem a página
// e deixam os testes instáveis.
beforeEach(() => {
  const dominiosDeAnuncio = [
    '**/*googlesyndication.com/**',
    '**/*doubleclick.net/**',
    '**/*googleadservices.com/**',
    '**/*adtrafficquality.google/**',
    '**/*fundingchoicesmessages.google.com/**',
  ]
  dominiosDeAnuncio.forEach((dominio) => {
    cy.intercept(dominio, { statusCode: 204, body: '' })
  })
})
