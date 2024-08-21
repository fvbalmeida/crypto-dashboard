module.exports = {
  settings: {
    'import/resolver': {
      'typescript': {}
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: './',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'security', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended-legacy',
    'plugin:import/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ]
  },
};
