import { request, expect } from '@playwright/test';
import { userData } from '../data/userData.js';

let apiRequestContext;

export async function setupUsuario() {
  apiRequestContext = await request.newContext();
  
  const response = await apiRequestContext.post('https://serverest.dev/usuarios', {
    ignoreHTTPSErrors: true,
    data: {
      nome: userData.nome,
      email: userData.email,
      password: userData.senha,
      administrador: userData.administrador
    }
  });

  const body = await response.json();
  expect(response.status()).toBe(201);
  expect(body.message).toBe('Cadastro realizado com sucesso');


  return { apiRequestContext, idUsuario: body._id };
}

export async function teardownUsuario(idUsuario) {
  if (idUsuario) {
    const deleteResponse = await apiRequestContext.delete(`https://serverest.dev/usuarios/${idUsuario}`);
    const deleteBody = await deleteResponse.json();
    expect(deleteResponse.status()).toBe(200);
    expect(deleteBody.message).toBe('Registro excluído com sucesso');
    console.log(`Usuário ${userData.email} removido com sucesso.`);
  }
}