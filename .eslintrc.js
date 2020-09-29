const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended', // Disable base rules
    'plugin:@typescript-eslint/recommended', // Enable ts rules
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],

  plugins: ['prettier', '@typescript-eslint'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.ts'],
      },
    },
  },

  ignorePatterns: ['**/*.css', '**/*.png'],

  rules: {
    'prettier/prettier': [WARN],

    'no-use-before-define': [WARN, { functions: false }],
    'no-unused-expressions': OFF,

    '@typescript-eslint/no-unused-expressions': 'error',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': WARN,
    'import/prefer-default-export': WARN,
    'import/no-unresolved': OFF, // Using typescript resolver instead

    'react/jsx-filename-extension': OFF,
    'react/prop-types': OFF,
    'react/jsx-props-no-spreading': [
      WARN,
      {
        custom: 'ignore',
      },
    ],
  },
};
