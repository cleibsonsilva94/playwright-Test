import { test, expect } from "@playwright/test";
import { stepWithScreenshot, resetSteps } from '../utils/stepHelper';

test.beforeEach(() => {
  resetSteps(); // garante sequência 01, 02, 03...
});

test.only('Desafio 01 - Login com sucesso (Meu teste)', async ({ page }) => {

  await stepWithScreenshot(page, 'Acessar sistema', async () => {
    await page.goto('https://www.saucedemo.com/');
  });

  await stepWithScreenshot(page, 'Preencher usuário', async () => {
    await page.locator('#user-name').fill('standard_user'); // simplificado
  });

  await stepWithScreenshot(page, 'Preencher senha', async () => {
    await page.locator('#password').fill('secret_sauce'); // simplificado
  });

  await stepWithScreenshot(page, 'Clicar login', async () => {
    await page.locator('#login-button').click(); // simplificado
  });

  await stepWithScreenshot(page, 'Validar login', async () => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products'); // melhoria
  });

});