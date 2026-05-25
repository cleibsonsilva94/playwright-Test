const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve('allure-results');
const historyDir = path.resolve('allure-history');

if (fs.existsSync(historyDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });

  fs.cpSync(historyDir, path.join(resultsDir, 'history'), {
    recursive: true,
  });
}

console.log('History restored');