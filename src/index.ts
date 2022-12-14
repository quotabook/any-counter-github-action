import * as core from '@actions/core';
import * as github from '@actions/github';
import { GithubActionEventName, parseGithubEvent } from '@quotalab/github-action';
import { sendAnyCountMessage } from './utils/slack';
import { SUPPROTED_EVENTS } from './constants/github';
import { SLACK_BOT_SIGNING_SECRET, SLACK_BOT_TOKEN, TARGET_SLACK_CHANNEL_ID } from './utils/input';

const { eventName, payload } = github.context;

async function main() {
  core.info('π₯ Run.....');
  core.info(`eventName = ${eventName}`);
  core.info(`action = ${payload.action}`);
  core.info(`token = ${SLACK_BOT_TOKEN.length}`);
  core.info(`signingSecret = ${SLACK_BOT_SIGNING_SECRET.length}`);
  core.info(`targetChannel = ${TARGET_SLACK_CHANNEL_ID}`);

  if (!SUPPROTED_EVENTS.includes(eventName)) {
    core.warning(`νμ¬ μ΄ μ‘μμ ${SUPPROTED_EVENTS.join(', ')} μ΄λ²€νΈλ§ μ§μν©λλ€.`);
    return;
  }

  const event = parseGithubEvent(github.context);
  core.info(`Event = ${event}`);
  if (event?.type === GithubActionEventName.PRμ΄λ¦Ό) {
    await sendAnyCountMessage(github.context.payload);
  }

  core.info('π Done');
}

try {
  main();
} catch (e: unknown) {
  if (e instanceof Error) {
    core.setFailed(e);
  }
}
