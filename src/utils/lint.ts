import { ESLint } from 'eslint';
import { clearCaches } from '@typescript-eslint/parser';
import { configs } from '@typescript-eslint/eslint-plugin';
import '@typescript-eslint/scope-manager';
import '@typescript-eslint/type-utils';
import '@typescript-eslint/types';
import '@typescript-eslint/typescript-estree';
import '@typescript-eslint/utils';
import '@typescript-eslint/visitor-keys';

const eslint = new ESLint({
  useEslintrc: false,
  baseConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any':
        configs.recommended?.rules?.['@typescript-eslint/no-explicit-any'] ?? 'error',
    },
  },
});

export async function lintSourceCodes(path = './src') {
  clearCaches();
  return eslint.lintFiles([`${path}/**/*.ts`]);
}

export async function getAnyErrors(path = './src') {
  const results = await lintSourceCodes(path);
  const anyErrors = results
    .filter(({ errorCount }) => errorCount > 0)
    .filter(({ messages }) => {
      return messages.filter(({ ruleId }) => ruleId === '@typescript-eslint/no-explicit-any');
    });

  return anyErrors;
}
