import { request, expect } from '@playwright/test';
import { userData } from '../data/userData.js';
import { prodData } from '../data/prodData.ts';

let apiRequestContext;
let idProduto;

export async function teardownProduto(apiRequestContext, idProduto, token) {
    if (idProduto) {
      const deleteResponse = await apiRequestContext.delete(`https://serverest.dev/produtos/${idProduto}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const deleteBody = await deleteResponse.json();
      expect(deleteResponse.status()).toBe(200);
      expect(['Registro excluído com sucesso', 'Nenhum registro excluído']).toContain(deleteBody.message);
    }
  }
  
  