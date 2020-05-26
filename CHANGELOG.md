# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [Unreleased]

## 0.3.1 - May 26, 2020

- Change config for `@typescript-eslint/array-type`
  - Use `Array<T>` for complex types like unions / intersections

## 0.3.0 - May 26, 2020

- Upgrade `@typescript-eslint` to 3.0.1
  - Update corresponding rules and options
- Fix bug introduced by using StrictPascalCase for enum members
- Change severity of TS rules to match `@typescript-eslint` recommendations

## 0.2.3 - May 21, 2020

- Bump `eslint-plugin-tsdoc` from 0.2.4 to 0.2.5
  - Add support for the `@see` tag!
- Increase cyclomatic `complexity` threshold from 8 to 10
  - Seems to be the typical standard

## 0.2.2 - May 19, 2020

- Upgrade to `@typescript-eslint v2.34.0`
- Disallow `snake_case` property names
- Add rule for `lines-between-class-members`
- Disallow `@ts-ignore` comments in test files.

## 0.2.1 - May 18, 2020

- Allow `@types/**/*.d.ts` files to exist without warning.
- Upgrade `eslint-plugin-mocha` to 7.0.0

## 0.2.0 - May 11, 2020

- Bump required version of ESLint to 7.0.0
- Add new rules and options from ESLint 7.0.0
  - `default-case-last`
  - `no-void`
  - `no-useless-backreference`
  - `no-restricted-exports`

## 0.1.2 - May 8, 2020

- Disable `@ts-*` comment errors for `*.test.ts` files, where it's reasonable to pass null on purpose
- Allow src/index.ts to export things that are not used
  - needed for libraries we build that exports functionality.
- Report on unused ESLint disable directives
- Fix bug in boolean variable naming-convention

## 0.1.1 - May 5, 2020

Literally no changes, just redeployed to NPM.

## 0.1.0 - May 5, 2020

### Features

- Add rule definitions for the core ESLint rules
- Add rule definitions for the `@typescript-eslint` plugin
- Add rule definitions for the `import` plugin
- Add rule definitions for the `mocha` plugin
- Add rule definitions for the `prettier` plugin
- Add rule definitions for the `tsdoc` plugin
- Add `eslint-config-base/loose` that loosens some of the various rules defined in the base ruleset
