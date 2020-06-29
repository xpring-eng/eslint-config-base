module.exports = {
  env: {
    node: true, // Enable node global variables & Node.js scoping
    es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
  },
  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['@fintechstudios/eslint-plugin-chai-as-promised'],

  rules: {
    // Must not use await within chai-as-promised expressions
    // https://github.com/fintechstudios/eslint-plugin-chai-as-promised/blob/master/docs/rules/no-await-in-condition.md
    '@fintechstudios/chai-as-promised/no-unhandled-promises': 'error',

    // Must handle promises returned from chai-as-promised expressions
    // https://github.com/fintechstudios/eslint-plugin-chai-as-promised/blob/master/docs/rules/no-unhandled-promises.md
    '@fintechstudios/chai-as-promised/no-await-in-condition': 'error',
  },

  overrides: [],
}
