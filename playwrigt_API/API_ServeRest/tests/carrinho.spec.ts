
import { test, expect } from '@playwright/test';
import { setupCarrinho, cadastrarCarrinho, buscarCarrinho, concluirCompra, cancelarCompra } from './helpers/helpersCarrinho';
import { teardownUsuario } from './helpers/helperUser';
import { excluirProduto, buscarProduto } from './helpers/helpersProduto';
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
    // Não excluímos carrinho aqui porque os testes 2 e 3 já fazem isso
    await excluirProduto(apiRequestContext, token, produtoId1);
    await excluirProduto(apiRequestContext, token, produtoId2);
    await teardownUsuario(apiRequestContext, idUsuario);
  });

  //  Teste 1: Criar carrinho com produtos
  test('Cadastrar e buscar carrinho por ID', async () => {
    carrinhoId = await cadastrarCarrinho(apiRequestContext, token, carrinhoData);
    const carrinho = await buscarCarrinho(apiRequestContext, token, carrinhoId);

    expect(carrinho.produtos.length).toBe(2);
    expect(carrinho.produtos[0].idProduto).toBe(produtoId1);
    expect(carrinho.produtos[1].idProduto).toBe(produtoId2);
  });

  //  Teste 2: Finalizar compra e validar carrinho removido
  test('Concluir compra e verificar carrinho removido', async () => {
    carrinhoId = await cadastrarCarrinho(apiRequestContext, token, carrinhoData);

    // Concluir compra
    await concluirCompra(apiRequestContext, token);

    // Tentar buscar carrinho (deve falhar ou retornar vazio)
    const carrinho = await buscarCarrinho(apiRequestContext, token, carrinhoId);
    expect(carrinho.message).toBe('Carrinho não encontrado'); // Ajuste conforme resposta da API
  });

  //  Teste 3: Cancelar compra e validar carrinho removido + estoque restaurado
  test('Cancelar compra e verificar carrinho removido e estoque restaurado', async () => {
    carrinhoId = await cadastrarCarrinho(apiRequestContext, token, carrinhoData);

    // Cancelar compra
    await cancelarCompra(apiRequestContext, token);

    // Tentar buscar carrinho (deve falhar ou retornar vazio)
    const carrinho = await buscarCarrinho(apiRequestContext, token, carrinhoId);
    expect(carrinho.message).toBe('Carrinho não encontrado'); // Ajuste conforme resposta da API

    // Verificar se produtos voltaram ao estoque (opcional)
    const produto1 = await buscarProduto(apiRequestContext, token, produtoId1);
    expect(produto1.quantidade).toBeGreaterThan(0); // Deve ter voltado ao estoque
  });
});
