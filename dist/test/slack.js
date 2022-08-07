"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("@quotalab/utils");
const lint_1 = require("../src/utils/lint");
const input_1 = require("../src/utils/input");
const slack_1 = require("../src/utils/slack");
const main = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield (0, lint_1.getAnyErrors)();
        const anyCount = (0, utils_1.sumBy)(results, ({ errorCount }) => errorCount);
        yield (0, slack_1.sendMessage)({
            channel: input_1.TARGET_SLACK_CHANNEL_ID,
            text: `총 ${results.length}개 파일에서 ${anyCount}개의 any 타입이 발견되었어요.`,
        });
    }
    catch (e) {
        throw e;
    }
});
main();
