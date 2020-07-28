module.exports = {
  parserOptions: {
    sourceType: 'module', // Allow the use of imports / ES modules
    ecmaFeatures: {
      impliedStrict: true, // Enable global strict mode
    },
  },

  // Specify global variables that are predefined
  env: {
    node: true, // Enable node global variables & Node.js scoping
    es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
  },

  extends: [
    // TODO: Can the eslint directory just export a index.js?
    './rules/eslint-core/errors',
    './rules/eslint-core/best-practices',
    './rules/eslint-core/strict',
    './rules/eslint-core/variables',
    './rules/eslint-core/style',
    './rules/eslint-core/es6',
    './rules/eslint-comments',
    './rules/@typescript-eslint',
    './rules/jsdoc',
    './rules/tsdoc',
    './rules/node',
    './rules/import',
    './rules/array-func',
    './rules/prettier',
  ].map(require.resolve),
  rules: {},

  reportUnusedDisableDirectives: true,
}
