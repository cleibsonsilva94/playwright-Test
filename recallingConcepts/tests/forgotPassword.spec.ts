import { test, expect } from "@playwright/test";

test('Acoes Básicas 1', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/forgot_password'); // Acessa tela de recuperação de senha

  const emailInput = page.locator('input#email'); // Localiza input pelo id (seletor estável)
  await emailInput.fill('start@hotmail.com'); // Preenche campo
  await emailInput.fill(''); // Limpa campo (sobrescreve valor)
  await emailInput.pressSequentially('123456'); // Digitação caractere a caractere (simula usuário)
  await expect(emailInput).toHaveValue('123456'); // Valida valor final

  await page.goto('https://the-internet.herokuapp.com/'); // Navega para home
  const checkboxesLink = page.locator('a[href="/checkboxes"]'); // Localiza link de checkboxes
  await checkboxesLink.click(); // Acessa página

  const checkbox1 = page.locator('input[type="checkbox"]').nth(0); // Primeiro checkbox (index 0)
  await checkbox1.check(); // Garante marcado

  const checkbox2 = page.locator('input[type="checkbox"]').nth(1); // Segundo checkbox (index 1)
  await checkbox2.uncheck(); // Garante desmarcado (idempotente)
  await expect(checkbox2).not.toBeChecked(); // Valida estado
});

test('Lidando com dropdown', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown'); // Página correta com dropdown

  const dropdown = page.locator('select#dropdown'); // Localiza dropdown por id
  await dropdown.selectOption('1'); // Seleciona pelo value
  await expect(dropdown).toHaveValue('1'); // Valida seleção

  await dropdown.selectOption({ label: 'Option 2' }); // Seleciona pelo label visível
  await expect(dropdown).toHaveValue('2'); // Valida nova seleção

  await page.goto('https://the-internet.herokuapp.com/hovers'); // Página de hover

  const img1 = page.locator('div.figure').nth(0); // Primeiro elemento com hover
  const img2 = page.locator('div.figure').nth(1); // Segundo elemento
  const img3 = page.locator('div.figure').nth(2); // Terceiro elemento


  const imgInfo1 = img1.locator('.figcaption');// Na verdade voce inspeciona o "Pai"
  const imgInfo2 = img2.locator('.figcaption');
  const imgInfo3 = img3.locator('.figcaption');

  await img1.hover();
  await expect(imgInfo1).toBeVisible();
  await expect(imgInfo2).not.toBeVisible(); 
  await expect(imgInfo3).not.toBeVisible();

  await img2.hover();
  await expect(imgInfo1).not.toBeVisible();
  await expect(imgInfo2).toBeVisible(); 
  await expect(imgInfo3).not.toBeVisible();

  await img3.hover();
  await expect(imgInfo1).not.toBeVisible();
  await expect(imgInfo2).not.toBeVisible(); 
  await expect(imgInfo3).toBeVisible();

  await imgInfo3.getByRole('link').click();

  await expect(page).toHaveURL('https://the-internet.herokuapp.com/users/3');

  // Dica DevTools: usar ":hov" -> force state (:hover) para revelar elementos ocultos
});

test('Desafio 01 - Login com sucesso (Meu teste)', async ({ page }) => {
  //VisitandoPag
  await page.goto('https://www.saucedemo.com/');
  //Preenchimento de login
  await page.locator('input#user-name').fill('standard_user');
  await page.locator('input#password').fill('secret_sauce');
  //Click Login
  await page.locator('input#login-button').click();
  //Verificacao
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.getByText('Products');
});

test('Desafio 02 - Login com Usuario locked (Meu teste)', async ({ page }) => {
  //VisitandoPag
  await page.goto('https://www.saucedemo.com/');
  //Preenchimento de login
  await page.locator('input#user-name').fill('locked_out_user');
  await page.locator('input#password').fill('secret_sauce');
  //Click Login
  await page.locator('input#login-button').click();
  //Verificacao
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.getByText('Epic sadface: Sorry, this user has been locked out.');
});

test('Desafio 03 - Login com senha errada (Meu teste)', async ({ page }) => {
  //VisitandoPag
  await page.goto('https://www.saucedemo.com/');
  //Preenchimento de login
  await page.locator('input#user-name').fill('locked_out_user');
  await page.locator('input#password').fill('secret_sauc');
  //Click Login
  await page.locator('input#login-button').click();
  //Verificacao
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.getByText('Epic sadface: Username and password do not match any user in this service.');
});