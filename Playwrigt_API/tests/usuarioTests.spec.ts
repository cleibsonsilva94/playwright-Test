import { test, expect } from '@playwright/test';
import { setupUsuario, teardownUsuario, loginUsuario, buscarUsuario, atualizarUsuario } from './helpers/helperUser';
import { userData } from './data/userData';

test.describe('API Usuário', () => {
  let apiRequestContext: any; //Qualquer valor
  let idUsuario: string;

  test.beforeEach(async () => {
    const setup = await setupUsuario();
    apiRequestContext = setup.apiRequestContext;
    idUsuario = setup.idUsuario;
  });

  test.afterEach(async () => {
    await teardownUsuario(apiRequestContext, idUsuario);
  });

  test('Login Usuário', async () => {
    const token = await loginUsuario(apiRequestContext, userData.email, userData.senha);
    expect(token).toBeTruthy();//verificação confirma que: O login funcionou A API retornou um token válido (não vazio)
  });

  test('Buscar usuário por ID', async () => {
    const usuario = await buscarUsuario(apiRequestContext, idUsuario);
    expect(usuario.nome).toBe(userData.nome);
    expect(usuario.email).toBe(userData.email);
    expect(usuario._id).toBe(idUsuario);
  });

  test('Atualização de Usuário', async () => {
    await atualizarUsuario(apiRequestContext, idUsuario, {
      nome: userData.nome2,
      email: userData.email2,
      password: userData.senha,
      administrador: userData.administrador
    });

    const usuarioAtualizado = await buscarUsuario(apiRequestContext, idUsuario);
    expect(usuarioAtualizado.nome).toBe(userData.nome2);
    expect(usuarioAtualizado.email).toBe(userData.email2);
  });
});
