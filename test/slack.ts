import { TARGET_SLACK_CHANNEL_ID } from '../src/utils/input';
import { messageTitle, sendMessage } from '../src/utils/slack';

const main = async () => {
  try {
    await sendMessage({
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
            text: `*quotabook-frontend* < <https://github.com/quotabook/quotabook-frontend/pull/2777|chore: any counter 일단 제거>`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '늘어난 Any 타입 개수: *0개*',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `전체 Any 타입 개수: *0개*`,
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
              url: 'https://github.com/quotabook/quotabook-frontend/pull/2777',
            },
          ],
        },
      ],
    });
  } catch (e) {
    throw e;
  }
};

main();
