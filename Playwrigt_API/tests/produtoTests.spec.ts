import { test, expect } from '@playwright/test';
import { setupCarrinho, cadastrarCarrinho, buscarCarrinho, excluirCarrinho } from './helpers/helpersCarrinho';
import { teardownUsuario } from './helpers/helperUser';
import { excluirProduto } from './helpers/helpersProduto';
import { carrinhoData } from './data/carrinhoData';

test.describe('API Carrinho', () => {
  let apiRequestContext: any;
  let idUsuario: string;
  let token: string;
  let produtoId1: string;
  let produtoId2: string;
  let carrinhoId: string;

  test.beforeEach(async () => {
    const setup = await setupCarrinho();
    apiRequestContext = setup.apiRequestContext;
    idUsuario = setup.idUsuario;
    token = setup.token;
    produtoId1 = setup.produtoId1;
    produtoId2 = setup.produtoId2;
  });

  test.afterEach(async () => {
    if (carrinhoId) {
      await excluirCarrinho(apiRequestContext, token, carrinhoId);
    }
    await excluirProduto(apiRequestContext, token, produtoId1);
    await excluirProduto(apiRequestContext, token, produtoId2);
    await teardownUsuario(apiRequestContext, idUsuario);
  });

  test('Cadastrar e buscar carrinho por ID', async () => {
    
    carrinhoId = await cadastrarCarrinho(apiRequestContext, token, carrinhoData);
    const carrinho = await buscarCarrinho(apiRequestContext, token, carrinhoId);

    expect(carrinho.produtos.length).toBe(2);
    expect(carrinho.produtos[0].idProduto).toBe(produtoId1);
    expect(carrinho.produtos[1].idProduto).toBe(produtoId2);
  });
});