module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'off'
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {
          version: 'detect'
        }
      },
      env: {
        browser: true,
        node: true,
        es6: true
      },

      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:@next/next/recommended'
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    }
  ]
};
