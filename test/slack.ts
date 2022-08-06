import { sumBy } from '@quotalab/utils';
import { getAnyErrors } from '../src/utils/lint';
import { TARGET_SLACK_CHANNEL_ID } from '../src/utils/input';
import { sendMessage } from '../src/utils/slack';

const main = async () => {
  try {
    const results = await getAnyErrors();
    const anyCount = sumBy(results, ({ errorCount }) => errorCount);
    await sendMessage({
      channel: TARGET_SLACK_CHANNEL_ID,
      text: `총 ${results.length}개 파일에서 ${anyCount}개의 any 타입이 발견되었어요.`,
    });
  } catch (e) {
    throw e;
  }
};

main();
