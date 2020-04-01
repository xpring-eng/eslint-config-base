// This is the ESLint file for _this_ package
// We don't need all the rules that

module.exports = {
  extends: './index.js',
  rules: {
    'import/unambiguous': 'off',
    'import/no-commonjs': 'off',
    'import/no-unused-modules': 'off',
  },
}
