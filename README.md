# `@xrplf/eslint-config-base`

[![npm version](https://img.shields.io/npm/v/@xrplf/eslint-config-base.svg)](https://www.npmjs.com/package/@xrplf/eslint-config-base)
[![Downloads/month](https://img.shields.io/npm/dm/@xrplf/eslint-config-base.svg)](http://www.npmtrends.com/@xrplf/eslint-config-base)

A super-strict TypeScript linting configuration for enforcing best practices.

### Installation

First, install the needed development dependencies:

```sh
# Ensure TypeScript and the TS ESLint parser are installed
npm install --save-dev typescript @typescript-eslint/parser
# Ensure ESLint & Prettier are installed
npm install --save-dev eslint prettier
# Install plugins used by @xrplf/eslint-config-base
npm install --save-dev @typescript-eslint/eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-jsdoc eslint-plugin-tsdoc eslint-plugin-array-func eslint-plugin-eslint-comments eslint-plugin-node

# Install the Xpring ESLint config
npm install --save-dev @xrplf/eslint-config-base
```

### Usage

Then, configure your ESLint to use the Xpring configuration. An example ESLint configuration is provided below:

```js
module.exports = {
  root: true,

  // Make ESLint compatible with TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Enable linting rules with type information from our tsconfig
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],

    // Allow the use of imports / ES modules
    sourceType: 'module',

    ecmaFeatures: {
      // Enable global strict mode
      impliedStrict: true,
    },
  },

  // Specify global variables that are predefined
  env: {
    node: true, // Enable node global variables & Node.js scoping
    es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
  },

  plugins: [],
  extends: ['@xrplf'],
  rules: {},
  overrides: [],
}
```

#### Non-React Version

If your project doesn't use React, you can use our base configuration by
extending `@xrplf/eslint-config/base` instead of extending just `@xrplf`.

#### Prettier

You may also use our `prettier` config. The below example uses the `prettier`
key within `package.json` as opposed to a `.prettierrc` file.

```json
"prettier": "@xrplf/eslint-config/prettier.config"
```

### Recommended Configs

We provide four different configurations.

1) The main configuration is strict and assumes that the project you're
linting uses React. This is `@xrplf/eslint-config`, or `@xrplf` for short.

2) If you're not using React but still want strict checking you can use
`@xrplf/eslint-config/base`.

3) If you need a looser rule set for the purpose of transitioning onto the
strict rules and are using React you can use `@xrplf/eslint-config/loose`.

4) Finally, if you need the looser rule set and are not using react you can
use `@xrplf/eslint-config/loose-base`.

#### Loose Config

The looser configuration differs in the following ways:

- Longer line length limitation for functions
- More import statements allowed per file
- More parameters allowed per function
- The very strict `no-unsafe-*` rules from `@typescript-eslint` are disabled
- Type assertions are allowed
