import { TARGET_SLACK_CHANNEL_ID } from '../src/utils/input';
import { sendMessage } from '../src/utils/slack';

const main = async () => {
  try {
    await sendMessage({
      channel: TARGET_SLACK_CHANNEL_ID,
      text: '테스트입니다',
    });
  } catch (e) {
    throw e;
  }
};

main();
