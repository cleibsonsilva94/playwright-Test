//ESTUDADO EM 01/12/2025
import { test, expect, request } from '@playwright/test';
import { bankFull } from './helpers/helperBank';
import { bankData } from './data/bankData';

  test('Todos os bancos', async () => {
    const token = await bankFull();
    expect(token).toBeTruthy();
  });