# PGATS - Automação Web com Cypress (Automation Exercise)

Trabalho de conclusão da disciplina de Automação de Testes Web da Pós-Graduação em Automação de Testes de Software (PGATS).

O projeto automatiza, com Cypress, os casos da página [Test Cases](https://www.automationexercise.com/test_cases) da aplicação fictícia **Automation Exercise**: **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16**.

## Casos automatizados

| Caso | Descrição |
|------|-----------|
| 1  | Cadastro de usuário completo até a exclusão da conta |
| 2  | Login com e-mail e senha corretos |
| 3  | Login com e-mail e senha incorretos |
| 4  | Logout |
| 5  | Cadastro com e-mail já existente |
| 8  | Listagem de produtos e página de detalhes |
| 9  | Busca de produto |
| 10 | Inscrição na newsletter pelo rodapé da home |
| 15 | Pedido com cadastro antes do checkout |
| 16 | Pedido com login antes do checkout |

## Tecnologias

- [Cypress](https://www.cypress.io/) 13
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) para o relatório HTML
- [@faker-js/faker](https://fakerjs.dev/) para massa de dados dinâmica
- GitHub Actions para execução contínua

## Estrutura

```
cypress/
├── e2e/
│   └── automation-exercise.cy.js   # specs: só chamam ações e passam dados
├── modules/                        # um módulo por contexto da aplicação
│   ├── cadastro/
│   ├── carrinho/
│   ├── checkout/
│   ├── login/
│   ├── menu/
│   ├── produtos/
│   └── rodape/
└── support/
    ├── commands.js                 # preparo/limpeza de massa via API
    ├── dados.js                    # geradores de dados com faker
    └── e2e.js                      # reporter, bloqueio de anúncios
```

### Padrões adotados

- **Módulos por contexto**: cada pasta em `cypress/modules` exporta funções via `module.exports`, com os seletores centralizados em `const seletores = {}`.
- **Seletores**: `data-qa` sempre que a página oferece; nos demais casos, `id` ou classes estáveis.
- **Validações nos módulos**: os `should` ficam nas funções de validação; a spec apenas orquestra.
- **Dados independentes**: cada execução gera um e-mail novo. Casos que excluem a conta criam o próprio usuário, e nenhum caso depende da conta de outro.
- **Preparo via API**: quando o caso precisa de um usuário já existente (2, 4, 5 e 16), ele é criado pela API pública do site (`/api/createAccount`) e, quando o próprio caso não o exclui, é removido ao final (`/api/deleteAccount`).
- **Estabilidade**: anúncios de terceiros são bloqueados com `cy.intercept` e há `retries` configurado para a execução em modo `run`.

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm test            # executa em modo headless e gera o relatório
npm run cy:open     # abre a interface do Cypress
```

## Relatório

Após `npm test`, o relatório HTML fica em `cypress/reports/index.html`.

No GitHub Actions, o relatório é publicado como artifact **relatorio-mochawesome** em cada execução (aba *Actions* > execução > *Artifacts*).
