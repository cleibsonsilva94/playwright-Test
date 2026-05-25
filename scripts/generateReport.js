const { execSync } = require('child_process');

const now = new Date();

const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');

const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

const reportDir = `allure-reports/report-${timestamp}`;

execSync(`npx allure generate allure-results -o ${reportDir} --clean`, {
  stdio: 'inherit'
});

execSync(`npx allure open ${reportDir}`, {
  stdio: 'inherit'
});