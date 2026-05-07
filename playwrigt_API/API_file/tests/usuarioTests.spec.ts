import { test, expect } from '@playwright/test';
import { olaMundo, } from './helpers/helperUser';
import { points } from './data/data';

test.describe('API Inicial', () => {
  let apiRequestContext: any; //Qualquer valor

  test('Olá Mundo', async () => {
    const response = await olaMundo();
  });

});
//Comandos npx playwright test --ui  Executar com o navegador visível
// npx playwright test --headed npx playwright test --ui
// REAPROVEITAMENTO. 
  // test.beforeEach(async () => {
  //   const setup = await setupUsuario();
  //   apiRequestContext = setup.apiRequestContext;
  //   idUsuario = setup.idUsuario;''
  // });

  // test.afterEach(async () => {
  //   await teardownUsuario(apiRequestContext, idUsuario);
  // });


  // test('', async () => {
  //   const usuario = await buscarUsuario(apiRequestContext, idUsuario);
  //   expect(usuario.nome).toBe(userData.nome);
  //   expect(usuario.email).toBe(userData.email);
  //   expect(usuario._id).toBe(idUsuario);
  // });

  // test('', async () => {
  //   await atualizarUsuario(apiRequestContext, idUsuario, {
  //     nome: userData.nome2,
  //     email: userData.email2,
  //     password: userData.senha,
  //     administrador: userData.administrador
  //   });

  //   const usuarioAtualizado = await buscarUsuario(apiRequestContext, idUsuario);
  //   expect(usuarioAtualizado.nome).toBe(userData.nome2);
  //   expect(usuarioAtualizado.email).toBe(userData.email2);
  // });