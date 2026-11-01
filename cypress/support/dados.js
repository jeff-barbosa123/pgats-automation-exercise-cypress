const { faker } = require('@faker-js/faker')

// Gera um usuário novo a cada execução, com e-mail único.
function gerarUsuario() {
  const primeiroNome = faker.person.firstName()
  const sobrenome = faker.person.lastName()

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `qa.${Date.now()}.${faker.string.alphanumeric(6).toLowerCase()}@pgats.com`,
    senha: faker.internet.password({ length: 12 }),
    dia: '15',
    mes: '6',
    ano: '1992',
    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    complemento: faker.location.secondaryAddress(),
    pais: 'Canada',
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.location.zipCode('#####'),
    celular: faker.string.numeric(11),
  }
}

function gerarCartao(nomeNoCartao) {
  return {
    nome: nomeNoCartao,
    numero: '4111111111111111',
    cvc: faker.string.numeric(3),
    mesValidade: '12',
    anoValidade: '2030',
  }
}

module.exports = {
  gerarUsuario,
  gerarCartao,
}
