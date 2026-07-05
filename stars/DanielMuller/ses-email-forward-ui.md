---
repo: DanielMuller/ses-email-forward-ui
url: 'https://github.com/DanielMuller/ses-email-forward-ui'
homepage: null
starredAt: '2022-02-13T23:37:40Z'
createdAt: '2020-10-03T14:10:46Z'
updatedAt: '2022-02-13T23:37:40Z'
language: Vue
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:24.052Z'
description: UI for managing SES Email Forwards
tags: []
---

# Email Alias Manager (ses-email-forward-ui)

UI to manage [ses-email-forward](https://github.com/DanielMuller/ses-email-forward).

Built with [Quasar](https://quasar.dev/) and [AWS-Amplify](https://docs.amplify.aws/).

## Host & Run
### Prerequisites
* [ses-email-forward](https://github.com/DanielMuller/ses-email-forward) setup
* AWS Amplify: `npm -g @aws-amplify/cli`
* A clone of this repo

### Setup Amplify console
* Connect a new app using your clone
* Use _main_ branch
* Set environment variables:
  * LOCALE: _fr_ or _en-us_
  * TABLE_PREFIX: as defined by _ses-email-forward_
  * TABLE_REGION: as defined by _ses-email-forward_
* Configure a domain (if you don't want the default amplifyapp.com domain)
* Create a user in Cognito
* Add via CLI the domains he can manage:
  ```bash
  aws --profile <myProfile> --region <myRegion> \
  cognito-idp admin-update-user-attributes \
  --user-pool-id  <userPoolId> \
  --username <username> \
  --user-attributes Name="custom:domains",Value="domain1.com,domain2.com,domain3.com"
  ```

## Local development
### Prerequisites
* [ses-email-forward](https://github.com/DanielMuller/ses-email-forward) setup
* AWS Amplify: `npm -g @aws-amplify/cli`
* Quasar: `nom -g @quasar/cli`

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
LOCALE=en-us TABLE_PREFIX=email-forward TABLE_REGION=eu-west-1 quasar dev
```

### Build the app for production
```bash
LOCALE=en-us TABLE_PREFIX=email-forward TABLE_REGION=eu-west-1 quasar build
```
