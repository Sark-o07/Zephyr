// eslint.config.js
const airbnbBase = require('eslint-config-airbnb-base');
const jestPlugin = require('eslint-plugin-jest');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module"
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      semi: ["error", "always"],
      "prefer-const": "error",
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': [
        'error',
        'LabeledStatement',
        'WithStatement',
      ],
    }
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
        jest: jestPlugin
    },
    rules: {
        ...jestPlugin.configs.all.rules,
        "jest/require-hook": "off"
    },
    settings: {
        jest: {
            version: "^27.5.1"
        }
    }
  }
];
