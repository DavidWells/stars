---
repo: humanwhocodes/tweet
url: 'https://github.com/humanwhocodes/tweet'
homepage: null
starredAt: '2022-02-14T00:42:15Z'
createdAt: '2020-06-25T19:20:14Z'
updatedAt: '2024-12-30T17:19:10Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 28
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:23.754Z'
description: A CLI for posting to Twitter
tags: []
---

# Tweet CLI (Deprecated)

> [!IMPORTANT]
> This project is no longer being maintained. Please use [Crosspost](https://github.com/humanwhocodes.com/crosspost) instead.

## Description

A simple CLI for sending tweets. This is intended for use in CI systems such as GitHub actions in order to enable to Twitter notifications of important events.

## Usage

You must have Node.js to use this package.

To start, you must have a registered [Twitter application](https://developer.twitter.com/apps). 

Next, define four environment variables:

* `TWITTER_ACCESS_TOKEN_KEY` - your access token
* `TWITTER_ACCESS_TOKEN_SECRET` - your access token secret
* `TWITTER_CONSUMER_KEY` - your consumer API key
* `TWITTER_CONSUMER_SECRET` - your consumer API secret

The CLI will not work without these environment variables. All of these values come from your Twitter application.

Then, you can run the CLI and pass a message on the command line using `npx`:

```
$ npx @humanwhocodes/tweet "Hello from the command line!"
```

If successful, the CLI will output the response from Twitter.

### Setting Twitter API version

By default, Tweet uses v2 of the Twitter API. If you'd like to use v1.1 of the Twitter API instead, set the `TWITTER_API_VERSION` environment variable to `v1`.

### Testing with dotenv

If you'd like to test with [`dotenv`](https://npmjs.com/package/dotenv), define an additional environment variable `TWEET_DOTENV=1` before executing the CLI. This will cause a local `.env` file to be read before executing.

### Using in a GitHub Workflow

Be sure to set up [GitHub secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for each environment variable. Then, you can configure a job like this:

```yaml
jobs:
  tweet:
    name: Tweet Something
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: 'npx @humanwhocodes/tweet "Your tweet text"'
        env:
          TWITTER_CONSUMER_KEY: ${{ secrets.TWITTER_CONSUMER_KEY }}
          TWITTER_CONSUMER_SECRET: ${{ secrets.TWITTER_CONSUMER_SECRET }}
          TWITTER_ACCESS_TOKEN_KEY: ${{ secrets.TWITTER_ACCESS_TOKEN_KEY }}
          TWITTER_ACCESS_TOKEN_SECRET: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
```

### Developer Setup

1. Ensure you have [Node.js](https://nodejs.org) 12+ installed
2. Fork and clone this repository
3. Run `npm install`
4. Run `npm test` to run tests

## Troubleshooting

**Console says "Required environment variable 'TWITTER_ACCESS_TOKEN_KEY' is an empty string."**

You haven't setup the correct environment variables for Tweet CLI. Double check that you don't have any misspellings in your environment variable settings.

**GitHub Actions console says "Required environment variable 'TWITTER_ACCESS_TOKEN_KEY' is an empty string."**

You're probably trying to use the Tweet CLI during the `pull_request` event. This won't work because secrets are not available when a pull request is from a fork. Try using the `pull_request_target` event instead. ([More information](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#pull_request_target))

## License and Copyright

This code is licensed under the Apache 2.0 License (see LICENSE for details).

Copyright Human Who Codes LLC. All rights reserved.
