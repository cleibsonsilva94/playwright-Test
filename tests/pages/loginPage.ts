import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async acessar() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async preencherUsuario() {
    await this.page.locator('#user-name').fill('standard_user');
  }

  async preencherSenha() {
    await this.page.locator('#password').fill('secret_sauce');
  }

  async clicarLogin() {
    await this.page.locator('#login-button').click();
  }

  async validarLogin() {
    await this.page.locator('.title').isVisible();
  }
}