import { sendAnyCountMessage } from '../src/utils/slack';

const main = async () => {
  try {
    await sendAnyCountMessage({});
  } catch (e) {
    throw e;
  }
};

main();
