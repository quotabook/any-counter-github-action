# Any Counter Action

## Usage

다음과 같은 깃헙 액션을 `.github/workflows` 디렉토리에 생성해주세요. 액션 이름을 입력할 때는 현재 버전을 잘 보고 `quotabook/any-counter-github-action@{최신버전}`의 포맷으로 입력해주세요.

```yaml
name: Sample Action
on: [pull_request, pull_request_review]

jobs:
  create-pr:
    runs-on: ubuntu-latest
    name: Notification
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Any Counter
        uses: quotabook/any-counter-github-action@v1.0.0
        with:
          slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
          slack-channel-id: ${{ secrets.SLACK_CHANNEL_ID }}
          slack-bot-signing-secret: ${{ secrets.SLACK_SIGNING_SECRET }}
```

## Configuration

| 이름                       | 설명                          |
| -------------------------- | ----------------------------- |
| `slack-bot-token`          | 메세지를 보낼 슬랙봇 토큰.    |
| `slack-channel-id`         | 노티를 쏘고 싶은 슬랙 채널 ID |
| `slack-bot-signing-secret` | 슬랙봇 Signing Secret         |

## Permissions

Any Counter는 슬랙봇과 연동되어 슬랙에 노티피케이션을 발송합니다. Any Counter와 연동되는 슬랙봇은 다음 퍼미션들을 가지고 있어야 합니다.

`channels:history`, `channels:read`, `chat:write`, `chat:write.public`, `groups:history`, `groups:read`, `im:history`, `im:read`, `mpim:history`, `mpim:read`
