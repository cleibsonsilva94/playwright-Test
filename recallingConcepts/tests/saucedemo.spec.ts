// import { test, expect } from "@playwright/test";

// test.only('Acessando página SauceDemo', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/'); // Navega para a página inicial
//   await page.getByLabel('input_error form_input').fill('Cleibson'); // Preenche o campo (locator pode não ser estável - parece classe, não label)
// });

// test.only('Asserts básicos', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/'); // Acessa a versão v1 da aplicação

//   const loginButton = page.locator('#login-button'); // Cria o locator (não precisa de await)

//   await expect.soft(loginButton).toHaveCSS('background-color', 'rgb(26, 29, 27)'); // Valida CSS (soft não quebra o teste)
//   await expect.soft(loginButton).toHaveAttribute('value', 'Login'); // Valida atributo HTML (case-sensitive)
//   await expect.soft(loginButton).toBeVisible(); // Garante que o botão está visível

//   await expect.soft(loginButton, 'Botão não deveria estar visível').not.toBeVisible(); // Mensagem customizada em caso de falha (assert contraditório, uso didático)
//   await expect.soft(loginButton).not.toBeHidden(); // Verifica que o elemento não está oculto (hidden)
// });