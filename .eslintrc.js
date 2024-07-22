module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'smart'],
    'newline-before-return': 'error',
    'prefer-destructuring': 'error',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'import/newline-after-import': 'error',
    'import/first': ['error', 'absolute-first'],
    'import/order': ['error', { 'newlines-between': 'always' }],
  },
};
