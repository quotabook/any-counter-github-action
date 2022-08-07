import { sumBy } from '@quotalab/utils';
import { getRepository } from '@quotalab/github-action';
import { WebhookPayload } from '@actions/github/lib/interfaces';
import { TARGET_SLACK_CHANNEL_ID } from '../../../utils/input';
import { getAnyErrors } from '../../../utils/lint';
import { sendMessage } from '..';

export async function sendAnyCountMessage(payload: WebhookPayload) {
  const repository = getRepository(payload);
  const results = await getAnyErrors();
  const anyCount = sumBy(results, ({ errorCount }) => errorCount);

  return sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Any를 발견했어요! :typescript:',
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
          text: `총 ${results.length}개의 파일에서 ${anyCount}개의 any 타입이 발견되었어요.`,
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
