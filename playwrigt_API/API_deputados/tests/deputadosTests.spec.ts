//Inicio dos estudos 28/11/2025 as 15:34
import { test, expect, request } from '@playwright/test';
import { porNome } from './helpers/helperUser';
import { deputadosData } from './data/deputadosData';

test.describe('API Deputados', () => {
  let apiRequestContext: any; //Qualquer valor
  let parlamentares: string;

  test('Buscar deputados por nome', async () => {
    const parlamentares = await porNome();  
    expect(parlamentares.nome).toBe(deputadosData.nome);
  });
});
