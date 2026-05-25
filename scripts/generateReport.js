const { execSync } = require('child_process');

const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, '-');

const reportDir = `allure-reports/report-${timestamp}`;

execSync(`npx allure generate allure-results -o ${reportDir} --clean`, {
  stdio: 'inherit'
});

execSync(`npx allure open ${reportDir}`, {
  stdio: 'inherit'
});