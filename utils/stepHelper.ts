import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';

let stepCounter = 1;

function sanitize(text: string) {
  return text.replace(/[<>:"/\\|?*]+/g, '').trim();
}

export async function stepWithScreenshot(
  this: any,
  page: Page,
  stepName: string,
  action: () => Promise<void>
) {
  await action();

  const screenshot = await page.screenshot({ fullPage: true });

  const dir = path.resolve('evidences');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileName = `${stepCounter.toString().padStart(2, '0')} - ${sanitize(stepName)}.png`;
  fs.writeFileSync(path.join(dir, fileName), screenshot);

  // ✅ envio seguro para o Allure
  if (this.attach) {
    await this.attach(screenshot, 'image/png');
  }

  stepCounter++;
}