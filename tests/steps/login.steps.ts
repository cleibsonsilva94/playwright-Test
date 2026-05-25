import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage'; 
import { stepWithScreenshot } from '../../utils/stepHelper';

let loginPage: LoginPage;

Given('que acesso o sistema', async function () {
  loginPage = new LoginPage(this.page);

  await stepWithScreenshot(this.page, 'Acessar sistema', async () => {
    await loginPage.acessar();
  });
});

When('preencho o usuario', async function () {
  await stepWithScreenshot(this.page, 'Preencher usuário', async () => {
    await loginPage.preencherUsuario();
  });
});

When('preencho a senha', async function () {
  await stepWithScreenshot(this.page, 'Preencher senha', async () => {
    await loginPage.preencherSenha();
  });
});

When('clico em login', async function () {
  await stepWithScreenshot(this.page, 'Clicar login', async () => {
    await loginPage.clicarLogin();
  });
});

Then('devo ver a tela de produtos', async function () {
  await stepWithScreenshot(this.page, 'Validar login', async () => {
    await loginPage.validarLogin();
  });
});