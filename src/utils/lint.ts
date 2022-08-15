import { ESLint } from 'eslint';

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
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
});

export async function lintSourceCodes(path = './src') {
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
