import fs from 'fs';
import path from 'path';

let stepCounter = 1;

export async function stepWithScreenshot(page, stepName, action) {
  await action();

  const dir = path.resolve('evidences');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fileName = `${stepCounter.toString().padStart(2, '0')} - ${stepName}.png`;

  await page.screenshot({
    path: path.join(dir, fileName),
    fullPage: true,
  });

  stepCounter++;
}