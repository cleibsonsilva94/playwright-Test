import { test, expect } from '@playwright/test';
import { setupUsuario, teardownUsuario, loginUsuario } from './helpers/helperUser';
import { cadastrarProduto, excluirProduto } from './helpers/helpersProduto';
import { cadastrarCarrinho, buscarCarrinho, excluirCarrinho } from './helpers/helpersCarrinho';
import { prodData } from './data/prodData';
import { carrinhoData } from './data/carrinhoData';

test.describe('API Carrinho', () => {
  let apiRequestContext: any;
  let idUsuario: string;
  let token: string;
  let produtoId1: string;
  let produtoId2: string;
  let carrinhoId: string;

  test.beforeEach(async () => {
    // Cria usuário e contexto
    const setup = await setupUsuario();
    apiRequestContext = setup.apiRequestContext;
    idUsuario = setup.idUsuario;

    // Login
    token = await loginUsuario(apiRequestContext, prodData.email, prodData.senha);

    // Cria dois produtos para usar no carrinho
    produtoId1 = await cadastrarProduto(apiRequestContext, token, {
      nome: prodData.nomeDoProduto,
      descricao: prodData.descricao,
      preco: prodData.preco,
      quantidade: prodData.quantidade
    });

    produtoId2 = await cadastrarProduto(apiRequestContext, token, {
      nome: prodData.nomeDoProduto2,
      descricao: prodData.descricao,
      preco: prodData.preco,
      quantidade: prodData.quantidade
    });

    // Preenche carrinhoData com IDs criados
    carrinhoData.produtos[0].idProduto = produtoId1;
    carrinhoData.produtos[1].idProduto = produtoId2;
  });

  test.afterEach(async () => {
    // Remove carrinho (se criado)
    if (carrinhoId) {
      await excluirCarrinho(apiRequestContext, token, carrinhoId);
    }

    // Remove produtos
    await excluirProduto(apiRequestContext, token, produtoId1);
    await excluirProduto(apiRequestContext, token, produtoId2);

    // Remove usuário
    await teardownUsuario(apiRequestContext, idUsuario);
  });

  test('Cadastrar e buscar carrinho por ID', async () => {
    // 1. Cadastrar carrinho
    carrinhoId = await cadastrarCarrinho(apiRequestContext, token, carrinhoData);

    // 2. Buscar carrinho
    const carrinho = await buscarCarrinho(apiRequestContext, token, carrinhoId);

    // 3. Validações
    expect(carrinho.produtos.length).toBe(2);
    expect(carrinho.produtos[0].idProduto).toBe(produtoId1);
    expect(carrinho.produtos[1].idProduto).toBe(produtoId2);
  });
});