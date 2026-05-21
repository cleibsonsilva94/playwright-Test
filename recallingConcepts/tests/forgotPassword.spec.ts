import { test, expect } from "@playwright/test";
import { takeStepScreenshot } from '../utils/screenshotHelper'; // 🔵 usado para gerar imagens que depois podem virar PDF

test('Acoes Básicas 1', async ({ page }, testInfo) => { // 🟢 testInfo usado pelo Allure (attachments)

  await test.step('Acessa página de recuperação de senha', async () => {
    await page.goto('https://the-internet.herokuapp.com/forgot_password'); // Acessa tela de recuperação de senha

    const path = await takeStepScreenshot(page, '01-forgot-password'); // 🔵 captura imagem → base para PDF
    await testInfo.attach('forgot-password', { // 🟢 Allure: anexa screenshot no relatório
      path,
      contentType: 'image/png'
    });
  });

  await test.step('Manipula input de email', async () => {
    const emailInput = page.locator('input#email'); // Localiza input pelo id (seletor estável)

    await emailInput.fill('start@hotmail.com'); // Preenche campo
    await emailInput.fill(''); // Limpa campo (sobrescreve valor)
    await emailInput.pressSequentially('123456'); // Digitação caractere a caractere (simula usuário)

    await expect(emailInput).toHaveValue('123456'); // Valida valor final

    const path = await takeStepScreenshot(page, '02-email-input'); // 🔵 evidência para PDF
    await testInfo.attach('email-input', { // 🟢 Allure attachment
      path,
      contentType: 'image/png'
    });
  });

  await test.step('Valida checkboxes', async () => {
    await page.goto('https://the-internet.herokuapp.com/'); // Navega para home

    const checkboxesLink = page.locator('a[href="/checkboxes"]'); // Localiza link
    await checkboxesLink.click(); // Acessa página

    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    await checkbox1.check(); // Garante marcado

    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    await checkbox2.uncheck(); // Garante desmarcado (idempotente)

    await expect(checkbox2).not.toBeChecked(); // Valida estado

    const path = await takeStepScreenshot(page, '03-checkbox'); // 🔵 evidência para PDF
    await testInfo.attach('checkbox', { // 🟢 aparece no relatório Allure
      path,
      contentType: 'image/png'
    });
  });
});

test('Desafio 01 - Login com sucesso (Meu teste)', async ({ page }, testInfo) => {

  await test.step('Realiza login com sucesso', async () => {
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

    const path = await takeStepScreenshot(page, '06-login-sucesso'); // 🔵 imagem usada no PDF depois
    await testInfo.attach('login-sucesso', { // 🟢 Allure usa isso pra mostrar no report
      path,
      contentType: 'image/png'
    });
  });
});