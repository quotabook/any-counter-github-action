import { ChatPostMessageArguments } from '@slack/web-api';
import { App } from '@slack/bolt';
import { SLACK_BOT_SIGNING_SECRET, SLACK_BOT_TOKEN } from './input';

const slackClient = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_BOT_SIGNING_SECRET,
});

export function sendMessage(args: ChatPostMessageArguments) {
  return slackClient.client.chat.postMessage(args);
}
