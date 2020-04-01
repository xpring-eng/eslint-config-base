module.exports = {
  env: {
    node: true, // Enable node global variables & Node.js scoping
    es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
  },
  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['mocha'],
  extends: ['plugin:mocha/recommended'],

  // These rules are not captured in the standard recommended configuration we extend above.
  rules: {
    // For our Mocha test files, the pattern is to have unnamed functions
    // https://eslint.org/docs/rules/func-names
    'func-names': 'off',

    // Hooks should only be declared inside test suites, as they would otherwise be run before or after every test or test suite of the project.
    // This can lead to very confusing and unwanted effects.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-top-level-hooks.md
    'mocha/no-top-level-hooks': 'error',

    // Disallow setup in describe blocks
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/1e32ad7bffb25c249cdd81ff3cb0d1a775d3dfe7/docs/rules/no-setup-in-describe.md
    // TODO: may be worth specifying an override for this rule for unit tests where we dynamically generate the test cases:
    // https://mochajs.org/#dynamically-generating-tests
    'mocha/no-setup-in-describe': 'error',

    /* DISABLED RULES */

    // Hooks allow code to be run before or after every or all tests which helps define a common setup or teardown process for every test.
    //The use of these hooks promotes the use of shared state between the tests, and defeats the purpose of having isolated unit tests.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-hooks.md
    // TODO: Maybe enable this rule for a `unit` subdirectory of the test directory.
    'mocha/no-hooks': 'off',

    // Reports when the function is async and returns a value.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-return-from-async.md
    'mocha/no-return-from-async': 'off',

    // Match suite descriptions against a pre-configured regular expression.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/valid-suite-description.md
    'mocha/valid-suite-description': 'off',

    // Match test descriptions against a pre-configured regular expression
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/valid-test-description.md
    'mocha/valid-test-description': 'off',

    // When writing tests for an asynchronous function, omitting the done callback or forgetting to return a promise can often lead to false-positive test cases.
    // This rule warns against the implicit synchronous feature, and should be combined with handle-done-callback for best results.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/master/docs/rules/no-synchronous-tests.md
    'mocha/no-synchronous-tests': 'off',
  },

  overrides: [
    {
      files: ['test/**/*.test.ts'],
      env: {
        mocha: true, // Global variables for mocha
      },
      rules: {
        // Require using arrow functions for callbacks.
        // This rule is a variation of the core eslint prefer-arrow-callback rule that is mocha-aware and does not flag non-arrow callbacks within mocha functions.
        // https://github.com/lo1tuma/eslint-plugin-mocha/blob/1e32ad7bffb25c249cdd81ff3cb0d1a775d3dfe7/docs/rules/prefer-arrow-callback.md
        'prefer-arrow-callback': 'off',
        'mocha/prefer-arrow-callback': 'error',

        // It's reasonable to have hooks for single cases for when the describe block grows and more tests get added to that case.
        // https://github.com/lo1tuma/eslint-plugin-mocha/blob/1e32ad7bffb25c249cdd81ff3cb0d1a775d3dfe7/docs/rules/no-hooks-for-single-case.md
        'mocha/no-hooks-for-single-case': 'off',
      },
    },
  ],
}
