---
repo: azu/gmail-npm-publish-digest
url: 'https://github.com/azu/gmail-npm-publish-digest'
homepage: ''
starredAt: '2021-11-21T22:42:42Z'
createdAt: '2020-06-28T06:17:00Z'
updatedAt: '2021-11-21T23:12:52Z'
language: TypeScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.471Z'
description: >-
  Google App Scripts create digest mail of npm's "Successfully published"
  notification from your Gmail read mails.
tags:
  - gmail
  - npm
  - publish
---

# gmail-npm-publish-digest

This Google App Scripts create digest mail of npm's "Successfully published" notification from your Gmail read mails.

## Motivation

npm's Successfully published notification mail is noisy.
Specially, on monorepo like [HonKit](https://github.com/HonKit/HonKit).

```
Successfully published honkit@3.4.0
Hi azu!

A new version of the package honkit (3.4.0) was published at 2020-06-27T08:30:56.245Z from
xxx.xxx.xx.xxx. The shasum of this package was XXXXXXXXXX.

If you have questions or security concerns, you can reply to this message or
email support@npmjs.com.

npm loves you.
```

This [Google Apps Script](https://developers.google.com/gsuite/aspects/appsscript) create summary mail every X hours.

## Installation

Use [clasp](https://github.com/google/clasp).

```
npm install --global clasp
clasp login
```

Create own Google App Script

```
git clone https://github.com/azu/gmail-npm-publish-digest
cd gmail-npm-publish-digest
# create .clasp.json
clasp create --type standalone --title "gmail-npm-publish-digest"
# Install Dependencies
yarn install
# Update script
clasp push
# Open script editor
clasp open
```

### Send Digest mail

1. open script editor: `clasp open`
2. Run `main` function on script editor

### Set Trigger

1. open script editor: `clasp open`
2. Run `createTimeTrigger` function on script editor

It will set cron job for the script

## Configuration

- `FETCH_INTERVAL_HOURS`: Run `main` function every X hours
    - Default: `6`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
