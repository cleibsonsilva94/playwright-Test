export async function stepWithScreenshot(
  this: any,
  page: Page,
  stepName: string,
  action: () => Promise<void>
) {
  await action();

  const screenshot = await page.screenshot({ fullPage: true });

  // salva arquivo (opcional)
  const dir = path.resolve('evidences');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileName = `${stepCounter.toString().padStart(2, '0')} - ${sanitize(stepName)}.png`;
  fs.writeFileSync(path.join(dir, fileName), screenshot);

  // ENVIA PARA O ALLURE
  await this.attach(screenshot, 'image/png');

  stepCounter++;
}