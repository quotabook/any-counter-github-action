"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLACK_BOT_SIGNING_SECRET = exports.TARGET_SLACK_CHANNEL_ID = exports.SLACK_BOT_TOKEN = void 0;
const tslib_1 = require("tslib");
const core = tslib_1.__importStar(require("@actions/core"));
exports.SLACK_BOT_TOKEN = core.getInput('slack-bot-token', { required: true });
exports.TARGET_SLACK_CHANNEL_ID = core.getInput('slack-channel-id', { required: true });
exports.SLACK_BOT_SIGNING_SECRET = core.getInput('slack-bot-signing-secret', { required: true });
