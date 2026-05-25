module.exports = {
  default: {
    requireModule: ["ts-node/register/transpile-only"],
    require: [
      "tests/steps/**/*.ts",
      "tests/support/**/*.ts"
    ],
    paths: ["tests/features/**/*.feature"]
  }
};