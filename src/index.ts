import * as core from '@actions/core';
import * as github from '@actions/github';
import { sendAnyCountMessage } from './utils/slack';
import { SUPPROTED_EVENTS } from './constants/github';
import { SLACK_BOT_TOKEN } from './utils/input';

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

  await sendAnyCountMessage(github.context.payload);

  core.info('👋 Done');
}

try {
  main();
} catch (e: unknown) {
  if (e instanceof Error) {
    core.setFailed(e);
  }
}
