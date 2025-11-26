
import { test, expect } from '@playwright/test';
import { setupUsuarioComContexto, teardownUsuario, login, cadastrarProduto, buscarProduto, excluirProduto } from './helpers/helpersProduto';
import { prodData } from './data/prodData';

test.describe('API Produto', () => {
  let apiRequestContext: any;
  let idUsuario: string;
  let token: string;

  test.beforeEach(async () => {
    const setup = await setupUsuarioComContexto();
    apiRequestContext = setup.apiRequestContext;
    idUsuario = setup.idUsuario;

    token = await login(apiRequestContext);
  });

  test.afterEach(async () => {
    await teardownUsuario(apiRequestContext, idUsuario);
  });

  test('Cadastrar e buscar produto por ID', async () => {
    const produtoId = await cadastrarProduto(apiRequestContext, token, {
      nome: prodData.nomeDoProduto2,
      descricao: prodData.descricao,
      preco: prodData.preco,
      quantidade: prodData.quantidade
    });

    const produto = await buscarProduto(apiRequestContext, token, produtoId);
    expect(produto.nome).toBe(prodData.nomeDoProduto2);
    expect(produto.descricao).toBe(prodData.descricao);
    expect(produto.preco).toBe(prodData.preco);
    expect(produto.quantidade).toBe(prodData.quantidade);
    await excluirProduto(apiRequestContext, token, produtoId);
  });
});
