ESTUDADO EM 28/11/2025
import { test, expect } from '@playwright/test';
import { setupUsuario, teardownUsuario, loginUsuario, buscarUsuario, atualizarUsuario } from './helpers/helperBank';
import { bankData1 } from './data/bankData';

  test('Todos os bancos', async () => {
    const token = await loginUsuario(apiRequestContext);
    expect(token).toBeTruthy();//verificação confirma que: O login funcionou A API retornou um token válido (não vazio)
  });

