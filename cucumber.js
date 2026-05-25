module.exports = {
  default: {
    requireModule: ["ts-node/register/transpile-only"],
    require: [
      "tests/steps/**/*.ts",
      "tests/support/**/*.ts"
    ],
    paths: ["tests/features/**/*.feature"],

    format: [
      "progress",
      "allure-cucumberjs/reporter" // adiciona o Allure
    ],

    formatOptions: {
      resultsDir: "allure-results" // asta onde salva os dados
    }
  }
};