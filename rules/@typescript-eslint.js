module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },

  plugins: ['@typescript-eslint'],
  extends: [
    // Disable core ESLint rules known to be checked by the TypeScript compiler
    'plugin:@typescript-eslint/eslint-recommended',
    // Enable recommended TypeScript-ESLint rules
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // Disable reporting on rules that Prettier will auto-fix
    'prettier/@typescript-eslint',
  ],

  // These rules are not captured in the standard recommended configuration we extend above.
  rules: {
    // This rule bans specific types and can suggest alternatives. It does not ban the corresponding runtime objects from being used.
    // It includes a default set of types that are probably mistakes, like using 'String' instead of 'string'.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': {
            message: "Use 'object' instead",
            fixWith: 'object',
          },
        },
        extendDefaults: true,
      },
    ],

    // This rule aims to standardize the use of type assertion style across the codebase.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
    // TODO: Make this less strict, use the default recommended settings?
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'never' },
    ],

    // Disallow usage of the any type
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
    // TODO: Make this less strict, using the default recommended settings? Or enable fix to unknown?
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: false,
        ignoreRestArgs: false,
      },
    ],

    // Disallows non-null assertions using the ! postfix operator
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Disallow empty functions
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    // TODO: Go through other options: https://github.com/eslint/eslint/blob/master/docs/rules/no-empty-function.md#options
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['protected-constructors', 'private-constructors'],
      },
    ],

    // Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.
    // Such variables take up space in the code and can lead to confusion by readers.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    // TODO: Make this an error?
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        // Allow unused parameters that start with an underscore.
        // This is the convention in TypeScript, to opt out of the "noUnusedParameters" compiler check.
        // This makes refactoring and building easier, as you can define stub functions that don't use all their arguments.
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        // Allow unused rest/destructuring parameters, since that's an easy way to remove properties from an object.
        ignoreRestSiblings: true,
        // Validate catch block arguments
        caughtErrors: 'all',
      },
    ],

    // Disallow unused variables and arguments (experimental, uses TypeScript type information.)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md
    // TODO: Should we use this experimental rule instead?
    '@typescript-eslint/no-unused-vars-experimental': 'warn',

    // Disallow the use of variables before they are defined.
    // For functions in particular, I generally like to define helper functions at the bottom of a file.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    // Flags unnecessary equality comparisons against boolean literals.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',

    // Prevents conditionals where the type is always truthy or always falsy.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      {
        checkArrayPredicates: true,
        // Allow using && and || for short-circuiting behavior
        ignoreRhs: true,
      },
    ],

    // Warns when a namespace qualifier is unnecessary.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
    '@typescript-eslint/no-unnecessary-qualifier': 'error',

    // Enforces that type arguments will not be used if not required.
    // Generic types / type parameters in TypeScript can specify a default type/value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',

    // Disallows calling (function calls) on an `any` type value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
    // TODO: Should this be error? Should this be off?
    '@typescript-eslint/no-unsafe-call': 'warn',

    // Disallows member access on an `any` type value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
    // TODO: Should this be error? Should this be off?
    '@typescript-eslint/no-unsafe-member-access': 'warn',

    // Disallows returning an `any` type value from a function.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
    // TODO: Should this be error? Should this be off?
    '@typescript-eslint/no-unsafe-return': 'warn',

    // Prefer usage of as const over literal type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
    '@typescript-eslint/prefer-as-const': 'warn',

    // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
    // TODO: Error?
    '@typescript-eslint/prefer-for-of': 'warn',

    // Prefer using concise optional chain expressions instead of chained logical ands.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Requires any function or method that returns a Promise to be marked async.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
    '@typescript-eslint/promise-function-async': ['error', { allowAny: false }],

    // Requires Array#sort calls to always provide a compareFunction.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
    '@typescript-eslint/require-array-sort-compare': 'warn',

    // Exhaustiveness checking in switch with union type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // Disallow duplicate class members
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    // Disallows invocation of require()
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
    '@typescript-eslint/no-require-imports': 'error',

    // Forbids the use of classes as namespaces.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
    '@typescript-eslint/no-extraneous-class': 'warn',

    // Requires that .toString() is only called on objects which provide useful information when stringified.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
    '@typescript-eslint/no-base-to-string': 'error',

    // Requires that private members are marked as readonly if they're never modified outside of the constructor.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
    '@typescript-eslint/prefer-readonly': 'warn',

    // Requires that function parameters are typed as readonly to prevent accidental mutation of inputs.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
    '@typescript-eslint/prefer-readonly-parameter-types': 'warn',

    // When adding two variables, operands must both be of type number or of type string.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      { checkCompoundAssignments: true },
    ],

    // Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
    '@typescript-eslint/unified-signatures': 'error',

    // This rule aims to eliminate unused expressions which have no effect on the state of the program.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      },
    ],

    // ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide an empty constructor or one that simply delegates into its parent class.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    // Bans // @ts-<directive> comments from being used
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
    '@typescript-eslint/ban-ts-comment': 'warn',

    // Consistent with object type definitions using either interface or type
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // Disallow the delete operator with computed key expressions (obj['a'] instead of obj.a)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
    '@typescript-eslint/no-dynamic-delete': 'warn',

    // Disallow the use of eval()-like methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    '@typescript-eslint/no-implied-eval': 'warn',

    // Disallows using a non-null assertion after an optional chain expression. It's just incorrect to do so.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Disallow extra non-null assertion.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
    '@typescript-eslint/no-extra-non-null-assertion': 'error',

    // Enforce default parameters to be last.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
    '@typescript-eslint/default-param-last': 'warn',

    // Disallow magic numbers.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreEnums: true,
        // A boolean to specify if numbers used as array indexes are considered okay.
        ignoreArrayIndexes: false,
        // A boolean to specify if we should check for the const keyword in variable declaration of numbers
        enforceConst: true,
        // A boolean to specify if we should detect numbers when setting object properties
        detectObjects: false,
      },
    ],

    // Enforces consistent returning of awaited values.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    // TODO: Disable this rule?
    '@typescript-eslint/return-await': 'warn',

    // Ensures that literals on classes are exposed in a consistent style.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md
    '@typescript-eslint/class-literal-property-style': 'warn',

    // Enforce the consistent use of either backticks, double, or single quotes
    // Usually, you don’t need this rule at all with Prettier. But there are two cases where it could be useful:
    // - To enforce the use of backticks rather than single or double quotes for strings.
    // - To forbid backticks where regular strings could have been used.
    // TODO: Might have to configure @typescript-eslint/quotes as well / instead.
    // https://eslint.org/docs/rules/quotes
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],

    // Enforce template literal expressions to be of string type.
    //https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
    '@typescript-eslint/restrict-template-expressions': [
      'warn',
      {
        // Allow numbers and booleans in template literal expressions
        allowNumber: true,
        allowBoolean: true,
        allowNullable: false,
      },
    ],

    // Restricts the types allowed in boolean expressions (ternary, if statements, &&, ||, ...)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
    '@typescript-eslint/strict-boolean-expressions': [
      'warn',
      {
        allowNullable: true,
        // allow non-falsy types (i.e. non string / number / boolean) in addition to boolean as a type of all boolean expressions
        // TODO: Should this be true?
        allowSafe: false,
        // Allow && and || to be used for short-circuiting behavior
        ignoreRhs: true,
      },
    ],

    // Require explicit return and argument types on exported functions' and classes' public class methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        // TODO: Should this be true?
        allowDirectConstAssertionInArrowFunctions: false,
      },
    ],

    // Requires Promise-like values to be handled appropriately.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
    '@typescript-eslint/no-floating-promises': [
      'warn',
      {
        ignoreVoid: false,
      },
    ],

    // Disallow throwing literals as exceptions.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    '@typescript-eslint/no-throw-literal': 'error',

    // Disallow the use of parameter properties in class constructors.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
    '@typescript-eslint/no-parameter-properties': 'warn',

    // Enforce the usage of the nullish coalescing operator instead of logical chaining.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
    // TODO: Should this be error?
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',

    // Enforces using a particular method signature syntax.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
    // TODO: Should this be error?
    '@typescript-eslint/method-signature-style': 'warn',

    // Requires using either T[] or Array<T> for arrays.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
    // TODO: Should this be error?
    '@typescript-eslint/array-type': 'warn',

    // Disallow the use of type aliases for some scenarios
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
    '@typescript-eslint/no-type-alias': [
      'warn',
      {
        allowAliases: 'always',
        // TODO: Should this be 'never'?
        allowConditionalTypes: 'always',
        // TODO: Should this be enabled?
        allowLiterals: 'in-unions-and-intersections',
        allowTupleTypes: 'always',
      },
    ],

    // Require explicit accessibility modifiers on class properties and methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        // TODO: Should this be 'no-public'?
        accessibility: 'explicit',
      },
    ],

    // Enforces naming conventions for everything across a codebase.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': [
      'warn',
      // TODO: Should we enforce strictCamelCase?
      // Default settings
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // Enforce that private members are prefixed with an underscore.
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      // Enforce that boolean variables are prefixed with an allowed verb.
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['camelCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      // Enforce that type parameters (generics) are prefixed with T
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      // TODO: Ban enums from ending with `s` (enums should be singular, for type theory reasons)
    ],

    // Require a consistent member declaration order
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
    '@typescript-eslint/member-ordering': 'warn',

    /* DISABLED RULES */

    // Use function types instead of interfaces with call signatures.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
    '@typescript-eslint/prefer-function-type': 'off',

    // Requires type annotations to exist.
    // Note: requiring type annotations unnecessarily can be cumbersome to maintain and generally reduces code readability.
    // TypeScript is often better at inferring types than easily written type annotations would allow.
    // Instead of enabling typedef, it is generally recommended to use the --noImplicitAny and/or --strictPropertyInitialization compiler options to enforce type annotations only when useful.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
    '@typescript-eslint/typedef': 'off',
  },

  overrides: [
    // {
    //   files: ['test/**/*.test.ts'],
    //   rules: {
    //     // For our Mocha test files, the pattern is to have unnamed functions
    //     // https://eslint.org/docs/rules/func-names
    //     'func-names': 'off',
    //     // Require using arrow functions for callbacks.
    //     // This rule is a variation of the core eslint prefer-arrow-callback rule that is mocha-aware and does not flag non-arrow callbacks within mocha functions.
    //     // TODO: I bet this rule conflicts with running Prettier through ESLint: https://github.com/prettier/eslint-config-prettier#arrow-body-style-and-prefer-arrow-callback
    //     // https://github.com/lo1tuma/eslint-plugin-mocha/blob/1e32ad7bffb25c249cdd81ff3cb0d1a775d3dfe7/docs/rules/prefer-arrow-callback.md
    //     'prefer-arrow-callback': 'off',
    //     'mocha/prefer-arrow-callback': 'off',
    //     // It's reasonable to have hooks for single cases for when the describe block grows and more tests get added to that case.
    //     // https://github.com/lo1tuma/eslint-plugin-mocha/blob/1e32ad7bffb25c249cdd81ff3cb0d1a775d3dfe7/docs/rules/no-hooks-for-single-case.md
    //     'mocha/no-hooks-for-single-case': 'off',
    //   },
    // },
  ],
}
