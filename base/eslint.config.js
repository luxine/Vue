import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import autoImportGlobals from './.eslintrc-auto-import.json' with { type: 'json' };

const commonSettings = {
  'import/resolver': {
    typescript: {
      project: './tsconfig.json',
      alwaysTryTypes: true
    },
  },
}

const commonRules = {
  'prettier/prettier': 'error',
  eqeqeq: ['error', 'always'],
  'no-var': 'error',
  'prefer-const': ['error', { destructuring: 'all' }],
  'no-param-reassign': ['error', { props: false }],
  'import/no-unresolved': 'error',
  'import/no-cycle': ['error', { maxDepth: 1 }],
  'no-console': 'warn',
  semi: ['error', 'always'],
  ...tsPlugin.configs.recommended.rules,
};

export default defineConfig([
  globalIgnores([
    'dist/',
    'node_modules/',
    'public/',
    'src/cores/',
    'build/',
    'generated/**',
    'vite.config.ts',
    'eslint.config.js',
  ]),
  {
    files: ['src/**/*.{js,ts}'],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin,
    },
    settings: commonSettings,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals,
      },
    },
    rules: commonRules,
  },

  {
    files: ['src/**/*.vue'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.eslint.json',
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    settings: commonSettings,
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: process.cwd(),
        extraFileExtensions: ['.vue'],
        parser: tsParser,
      },
      globals: {
        ...globals.browser,
        ...autoImportGlobals.globals,
      },
    },
    rules: {
      ...commonRules,
      ...vuePlugin.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  },

]);
