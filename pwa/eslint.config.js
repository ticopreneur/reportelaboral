import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { parser: tsparser, globals: globals.browser },
    plugins: { '@typescript-eslint': tseslint },
    rules: { ...tseslint.configs.recommended.rules, '@typescript-eslint/no-explicit-any': 'off' }
  }
];
