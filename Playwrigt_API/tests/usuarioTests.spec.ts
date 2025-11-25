import { test, expect } from '@playwright/test';
import { setupUsuario, teardownUsuario, loginUsuario } from './helpers/userHelper.js';
import { userData } from './data/userData.js';

test.describe('API Usuário', () => {
  let apiRequestContext;
  let idUsuario;

  test.beforeEach(async () => {
    const setup = await setupUsuario();
    apiRequestContext = setup.apiRequestContext;
    idUsuario = setup.idUsuario;
  });

  test.afterEach(async () => {
    await teardownUsuario(idUsuario);
  });

  test('Login Usuário', async () => {
    const token = await loginUsuario(apiRequestContext, userData.email, userData.senha);
    expect(token).toBeTruthy();
  });

  test('Buscar usuário por ID', async () => {
    const response = await apiRequestContext.get(`https://serverest.dev/usuarios/${idUsuario}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.nome).toBe(userData.nome);
    expect(body.email).toBe(userData.email);
    expect(body._id).toBe(idUsuario);
  });

  test('Atualização de Usuário', async () => {
    const token = await loginUsuario(apiRequestContext, userData.email, userData.senha);

    const updateResponse = await apiRequestContext.put(`https://serverest.dev/usuarios/${idUsuario}`, {
      // headers: { Authorization: `Bearer ${token}` },
      data: {
        nome: userData.nome2,
        email: userData.email2,
        password: userData.senha,
        administrador: userData.administrador
      }
    });

    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    expect(updateBody.message).toBe('Registro alterado com sucesso');

    const getResponse = await apiRequestContext.get(`https://serverest.dev/usuarios/${idUsuario}`);
    const getBody = await getResponse.json();
    expect(getBody.nome).toBe(userData.nome2);
    expect(getBody.email).toBe(userData.email2);
  });
});