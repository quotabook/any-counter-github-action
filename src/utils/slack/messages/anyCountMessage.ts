import * as core from '@actions/core';
import { sumBy } from '@quotalab/utils';
import { getRepository } from '@quotalab/github-action';
import { WebhookPayload } from '@actions/github/lib/interfaces';
import { TARGET_SLACK_CHANNEL_ID } from '../../../utils/input';
import { getAnyErrors } from '../../../utils/lint';
import { getSentMessages, sendMessage } from '..';

export const messageTitle = 'Any 타입이 늘어났어요!' as const;

export async function getLastAnyCount() {
  const messages = await getSentMessages();

  if (messages == null) {
    return 0;
  }

  const lastMessageBlocks = messages[0].blocks?.map(({ text }) => text);
  const anyCountMessage = lastMessageBlocks?.find(block => block?.text?.includes('전체 Any 타입 개수'));
  const anyCount = anyCountMessage?.text?.replace(/전체 Any 타입 개수: \*?(\d+)개\*?/, '$1');

  return anyCount != null ? Number(anyCount) : 0;
}

export async function sendAnyCountMessage(payload: WebhookPayload) {
  const repository = getRepository(payload);
  core.info(`get repository => ${repository?.name}`);

  const results = await getAnyErrors();
  const newAnyCount = sumBy(results, ({ errorCount }) => errorCount);
  core.info(`get current any count => ${newAnyCount}`);

  const lastAnyCount = await getLastAnyCount();
  core.info(`get last any count => ${lastAnyCount}`);

  const isIncreasedAnyType = newAnyCount > lastAnyCount;
  core.info(`isIncreased? => ${isIncreasedAnyType}`);

  if (isIncreasedAnyType === false) {
    return;
  }

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${messageTitle} :typescript:`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${repository?.name}* < <${payload.pull_request?.html_url}|${payload.pull_request?.title}>`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `늘어난 Any 타입 개수: *${newAnyCount - lastAnyCount}개*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `전체 Any 타입 개수: *${newAnyCount}개*`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '찾으러가기 :mag:',
              emoji: true,
            },
            style: 'primary',
            url: payload.pull_request?.html_url,
          },
        ],
      },
    ],
  });
}
