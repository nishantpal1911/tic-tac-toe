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
  plugins: ['react', 'react-hooks', 'sort-destructure-keys', 'no-relative-import-paths'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'smart'],
    'newline-before-return': 'error',
    'prefer-destructuring': 'error',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    // Plugins
    'import/newline-after-import': 'error',
    'import/first': ['error', 'absolute-first'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [{ pattern: 'src/**', group: 'internal' }],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        warnOnUnassignedImports: true,
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': 2,
    'no-relative-import-paths/no-relative-import-paths': 'error',
  },
};
