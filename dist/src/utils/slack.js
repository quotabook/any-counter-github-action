"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const bolt_1 = require("@slack/bolt");
const input_1 = require("./input");
const slackClient = new bolt_1.App({
    token: input_1.SLACK_BOT_TOKEN,
    signingSecret: input_1.SLACK_BOT_SIGNING_SECRET,
});
function sendMessage(args) {
    return slackClient.client.chat.postMessage(args);
}
exports.sendMessage = sendMessage;
