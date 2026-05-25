import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({
    headless: false, // ✅ true = oculto | false = visível
    slowMo: 300      // ✅ opcional (deixa mais lento pra ver)
  });

  page = await browser.newPage();

  // 👉 disponibiliza o page no contexto (this.page)
  this.page = page;
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});