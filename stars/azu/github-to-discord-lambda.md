---
repo: azu/github-to-discord-lambda
url: 'https://github.com/azu/github-to-discord-lambda'
homepage: ''
starredAt: '2022-01-24T06:40:13Z'
createdAt: '2016-05-21T06:43:34Z'
updatedAt: '2023-07-27T12:07:47Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.849Z'
description: Lambda bot that post your GitHub notifications/events to Discord
tags:
  - bot
  - discord
  - github
  - lambda
---

# github-to-discord lambda

Lambda bot that fetch own GitHub notifications/events and post to ~~Twitter~~ or [discord](https://github.com/azu/github-to-twitter-lambda/tree/master/functions/discord)

Note: [Drop Twitter support](https://github.com/azu/github-to-twitter-lambda/commit/b3fe3ab0b35fe860f4f3eaedace48e5ec336d9aa).

## Discord

See [github-to-discord](https://github.com/azu/github-to-twitter-lambda/tree/master/functions/discord)

## Discord

### Requirement

- AWS CLI
- GitHub token
- Discord webhook url

### Installation

    cd functions/discord
    corepack enable
    yarn install
    npm run init
    # create dynamodb table

#### Config

You need to following env to `.env`

```env
GITHUB_USER_NAME=you
GITHUB_TOKEN=ghp...
G2T_ENABLE_PRIVATE_REPOSITORY=false
DISCORD_WEBHOOK=https://...
POST_BODY_LENGTH=200
```

**environment**:

- `GITHUB_USER_NAME`: Your GitHub id
- `GITHUB_TOKEN`: Your GitHub access token
- `DISCORD_WEBHOOK`: Discord Webhook URL
- `G2T_ENABLE_PRIVATE_REPOSITORY`: If it is `"true"`, send event/notification of private repositories
    - Default: `"false"` (string)
- `POST_BODY_LENGTH`: Post body length
    - Default: `200` (number)
### Lambda role policy

Lambda(`role": "arn:aws:iam::xxxxxxxxxxxx"`) should have following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*",
        "lambda:*",
        "logs:*",
        "cloudwatch:*",
        "autoscaling:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

### Deploy

Use deploy.sh

    ./deploy.sh

You need to set up AWS CLI before deploy.

### Cron

lambda function run at once by default.
You can set cron to lambda using [Scheduled Events - AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduled-events.html "Using AWS Lambda with Scheduled Events - AWS Lambda").

I've setting to run this per 2 minutes.

![image](https://monosnap.com/file/lhJghW8bwKJmTZ3iDugi4B7eklRn5Z.png)

## Tests

Tests in local with dry-run.

    cd functions/notifications
    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
