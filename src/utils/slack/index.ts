import { ChatPostMessageArguments } from '@slack/web-api';
import { App } from '@slack/bolt';
import { SLACK_BOT_SIGNING_SECRET, SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from '../input';
// import { messageTitle } from './messages/anyCountMessage';

const slackClient = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_BOT_SIGNING_SECRET,
});

export function sendMessage(args: ChatPostMessageArguments) {
  return slackClient.client.chat.postMessage(args);
}

function getChannelMessages() {
  return slackClient.client.conversations.history({
    channel: TARGET_SLACK_CHANNEL_ID,
  });
}

export async function getSentMessages() {
  const { messages } = await getChannelMessages();
  return messages
    ?.filter(({ bot_id }) => bot_id != null)
    .filter(({ type }) => type === 'message')
    .filter(({ text }) => text === `This content can't be displayed.`)
    .filter(({ blocks }) => blocks != null);
}

export * from './messages/anyCountMessage';
