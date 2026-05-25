const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve('allure-results');
const historyDir = path.resolve('allure-history');

if (fs.existsSync(path.join(resultsDir, 'history'))) {
  if (!fs.existsSync(historyDir)) {
    fs.mkdirSync(historyDir, { recursive: true });
  }

  fs.cpSync(
    path.join(resultsDir, 'history'),
    historyDir,
    { recursive: true }
  );
}

console.log('History saved');