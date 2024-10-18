import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const tsConfig = tseslint.config(eslint.configs.recommended, ...tseslint.configs.strict);

const stylisticConfig = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  arrowParens: true,
});

export default [
  ...tsConfig,
  stylisticConfig,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'import': importPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
      'import/no-cycle': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/max-len': ['error', 120],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true },
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never',
        },
      ],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
      '@stylistic/array-element-newline': ['error', { consistent: true, multiline: true }],
      '@stylistic/array-bracket-newline': ['error', { multiline: true }],
      '@stylistic/padding-line-between-statements': [
        'error',

        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block-like', next: '*' },

        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },

        { blankLine: 'always', prev: '*', next: 'multiline-const' },
        { blankLine: 'always', prev: 'multiline-const', next: '*' },

        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'export' },

        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'never', prev: 'function', next: 'function' },
      ],
    },
    files: ['src/**/*.ts', '*.js'],
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['*.config.js'],
    rules: { 'import/no-default-export': 'off', '@stylistic/quote-props': ['error', 'consistent'] },
  },
];
