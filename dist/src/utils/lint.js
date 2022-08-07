"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnyErrors = exports.lintSourceCodes = void 0;
const tslib_1 = require("tslib");
const eslint_1 = require("eslint");
const eslint = new eslint_1.ESLint({
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
        extends: ['plugin:@typescript-eslint/recommended'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
});
function lintSourceCodes(path = './src') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return eslint.lintFiles([`${path}/**/*.ts`]);
    });
}
exports.lintSourceCodes = lintSourceCodes;
function getAnyErrors(path = './src') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const results = yield lintSourceCodes(path);
        const anyErrors = results
            .filter(({ errorCount }) => errorCount > 0)
            .filter(({ messages }) => {
            return messages.filter(({ ruleId }) => ruleId === '@typescript-eslint/no-explicit-any');
        });
        return anyErrors;
    });
}
exports.getAnyErrors = getAnyErrors;
