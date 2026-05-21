export async function takeStepScreenshot(page, stepName: string) {
  const path = `evidencias/${Date.now()}-${stepName}.png`;
  await page.screenshot({ path, fullPage: true });
  return path;
}