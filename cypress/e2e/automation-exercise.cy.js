const menu = require('../modules/menu')
const cadastro = require('../modules/cadastro')
const login = require('../modules/login')
const produtos = require('../modules/produtos')
const carrinho = require('../modules/carrinho')
const checkout = require('../modules/checkout')
const rodape = require('../modules/rodape')
const { gerarUsuario, gerarCartao } = require('../support/dados')

describe('Automation Exercise', () => {
  beforeEach(() => {
    menu.acessarHome()
    menu.validarHomeVisivel()
  })

  context('Cadastro de usuário', () => {
    it('Test Case 1: cadastra um usuário novo, confirma o login e exclui a conta', () => {
      const usuario = gerarUsuario()

      menu.irParaLogin()
      cadastro.validarFormularioNovoUsuarioVisivel()
      cadastro.iniciarCadastro(usuario.nome, usuario.email)
      cadastro.validarInformacoesDaContaVisivel()
      cadastro.preencherInformacoesDaConta(usuario)
      cadastro.preencherEndereco(usuario)
      cadastro.criarConta()
      cadastro.validarContaCriada()
      cadastro.clicarEmContinuar()
      menu.validarLogadoComo(usuario.nome)
      menu.excluirConta()
      cadastro.validarContaExcluida()
      cadastro.clicarEmContinuar()
    })

    context('com e-mail já cadastrado', () => {
      const usuarioExistente = gerarUsuario()

      beforeEach(() => {
        cy.criarUsuarioViaApi(usuarioExistente)
      })

      afterEach(() => {
        cy.excluirUsuarioViaApi(usuarioExistente)
      })

      it('Test Case 5: impede o cadastro com e-mail que já existe', () => {
        menu.irParaLogin()
        cadastro.validarFormularioNovoUsuarioVisivel()
        cadastro.iniciarCadastro(usuarioExistente.nome, usuarioExistente.email)
        cadastro.validarEmailJaCadastrado()
      })
    })
  })

  context('Login', () => {
    it('Test Case 3: exibe erro ao fazer login com e-mail e senha incorretos', () => {
      const usuarioInexistente = gerarUsuario()

      menu.irParaLogin()
      login.validarFormularioLoginVisivel()
      login.fazerLogin(usuarioInexistente.email, usuarioInexistente.senha)
      login.validarCredenciaisInvalidas()
    })

    it('Test Case 2: faz login com e-mail e senha corretos e exclui a conta', () => {
      const usuario = gerarUsuario()
      cy.criarUsuarioViaApi(usuario)

      menu.irParaLogin()
      login.validarFormularioLoginVisivel()
      login.fazerLogin(usuario.email, usuario.senha)
      menu.validarLogadoComo(usuario.nome)
      menu.excluirConta()
      cadastro.validarContaExcluida()
    })

    context('Logout', () => {
      const usuario = gerarUsuario()

      beforeEach(() => {
        cy.criarUsuarioViaApi(usuario)
      })

      afterEach(() => {
        cy.excluirUsuarioViaApi(usuario)
      })

      it('Test Case 4: faz logout e volta para a página de login', () => {
        menu.irParaLogin()
        login.validarFormularioLoginVisivel()
        login.fazerLogin(usuario.email, usuario.senha)
        menu.validarLogadoComo(usuario.nome)
        menu.fazerLogout()
        login.validarPaginaDeLogin()
      })
    })
  })

  context('Produtos', () => {
    it('Test Case 8: lista todos os produtos e exibe os detalhes do primeiro', () => {
      menu.irParaProdutos()
      produtos.validarPaginaTodosProdutos()
      produtos.validarListaDeProdutosVisivel()
      produtos.verPrimeiroProduto()
      produtos.validarDetalhesDoProduto()
    })

    it('Test Case 9: busca um produto e exibe apenas os resultados relacionados', () => {
      const termo = 'Jeans'

      menu.irParaProdutos()
      produtos.validarPaginaTodosProdutos()
      produtos.buscarProduto(termo)
      produtos.validarResultadoDaBusca(termo)
    })
  })

  context('Inscrição no rodapé', () => {
    it('Test Case 10: inscreve um e-mail na newsletter pelo rodapé da home', () => {
      const { email } = gerarUsuario()

      rodape.rolarAteORodape()
      rodape.validarInscricaoVisivel()
      rodape.inscreverEmail(email)
      rodape.validarInscricaoRealizada()
    })
  })

  context('Pedido', () => {
    const produtosDoPedido = [1, 2]

    it('Test Case 15: cadastra antes do checkout, finaliza o pedido e exclui a conta', () => {
      const usuario = gerarUsuario()
      const cartao = gerarCartao(usuario.nome)

      menu.irParaLogin()
      cadastro.cadastrarUsuarioCompleto(usuario)
      cadastro.validarContaCriada()
      cadastro.clicarEmContinuar()
      menu.validarLogadoComo(usuario.nome)

      produtosDoPedido.forEach((id) => carrinho.adicionarProdutoAoCarrinho(id))
      menu.irParaCarrinho()
      carrinho.validarPaginaDoCarrinho(produtosDoPedido)
      carrinho.finalizarCompra()
      checkout.validarRevisaoDoPedido(usuario)
      checkout.fazerPedidoComComentario('Pedido automatizado - cadastro antes do checkout')
      checkout.pagar(cartao)
      checkout.validarPedidoRealizado()

      menu.excluirConta()
      cadastro.validarContaExcluida()
      cadastro.clicarEmContinuar()
    })

    it('Test Case 16: faz login antes do checkout, finaliza o pedido e exclui a conta', () => {
      const usuario = gerarUsuario()
      const cartao = gerarCartao(usuario.nome)
      cy.criarUsuarioViaApi(usuario)

      menu.irParaLogin()
      login.fazerLogin(usuario.email, usuario.senha)
      menu.validarLogadoComo(usuario.nome)

      produtosDoPedido.forEach((id) => carrinho.adicionarProdutoAoCarrinho(id))
      menu.irParaCarrinho()
      carrinho.validarPaginaDoCarrinho(produtosDoPedido)
      carrinho.finalizarCompra()
      checkout.validarRevisaoDoPedido(usuario)
      checkout.fazerPedidoComComentario('Pedido automatizado - login antes do checkout')
      checkout.pagar(cartao)
      checkout.validarPedidoRealizado()

      menu.excluirConta()
      cadastro.validarContaExcluida()
      cadastro.clicarEmContinuar()
    })
  })
})
