"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
const github = tslib_1.__importStar(require("@actions/github"));
const utils_1 = require("@quotalab/utils");
const slack_1 = require("./utils/slack");
const github_1 = require("./constants/github");
const input_1 = require("./utils/input");
const lint_1 = require("./utils/lint");
const { eventName, payload } = github.context;
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        core.info('🔥 Run.....');
        core.info(`eventName = ${eventName}`);
        core.info(`action = ${payload.action}`);
        core.info(`token = ${input_1.SLACK_BOT_TOKEN.length}`);
        if (!github_1.SUPPROTED_EVENTS.includes(eventName)) {
            core.warning(`현재 이 액션은 ${github_1.SUPPROTED_EVENTS.join(', ')} 이벤트만 지원합니다.`);
            return;
        }
        const results = yield (0, lint_1.getAnyErrors)();
        const anyCount = (0, utils_1.sumBy)(results, ({ errorCount }) => errorCount);
        yield (0, slack_1.sendMessage)({
            channel: input_1.TARGET_SLACK_CHANNEL_ID,
            text: `총 ${results.length}개 파일에서 ${anyCount}개의 any 타입이 발견되었어요.`,
        });
        core.info('👋 Done');
    });
}
try {
    main();
}
catch (e) {
    if (e instanceof Error) {
        core.setFailed(e);
    }
}
