module.exports = {
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'class-methods-use-this': 'warn',
    'no-undef': 'off',
    camelcase: 'off',
    'no-use-before-define': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', {extensions: ['.tsx']}],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/function-component-definition': 'off'
  },
};
