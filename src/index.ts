import * as core from '@actions/core';
import * as github from '@actions/github';
import { sumBy } from '@quotalab/utils';
import { sendMessage } from './utils/slack';
import { SUPPROTED_EVENTS } from './constants/github';
import { SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from './utils/input';
import { getAnyErrors } from './utils/lint';

const { eventName, payload } = github.context;

async function main() {
  core.info('🔥 Run.....');
  core.info(`eventName = ${eventName}`);
  core.info(`action = ${payload.action}`);
  core.info(`token = ${SLACK_BOT_TOKEN.length}`);

  if (!SUPPROTED_EVENTS.includes(eventName)) {
    core.warning(`현재 이 액션은 ${SUPPROTED_EVENTS.join(', ')} 이벤트만 지원합니다.`);
    return;
  }

  const results = await getAnyErrors();
  const anyCount = sumBy(results, ({ errorCount }) => errorCount);
  await sendMessage({
    channel: TARGET_SLACK_CHANNEL_ID,
    text: `총 ${results.length}개 파일에서 ${anyCount}개의 any 타입이 발견되었어요.`,
  });

  core.info('👋 Done');
}

try {
  main();
} catch (e: unknown) {
  if (e instanceof Error) {
    core.setFailed(e);
  }
}
