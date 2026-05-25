const fs = require('fs');

const folders = [
  'allure-results',
  'allure-report',
  'allure-reports',
  'allure-history',
  'evidences'
];

folders.forEach(folder => {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
    console.log(`✅ Removido: ${folder}`);
  }
});