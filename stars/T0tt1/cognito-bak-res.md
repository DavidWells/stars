---
repo: T0tt1/cognito-bak-res
url: 'https://github.com/T0tt1/cognito-bak-res'
homepage: null
starredAt: '2021-05-15T21:55:27Z'
createdAt: '2020-03-31T15:18:58Z'
updatedAt: '2021-05-15T21:55:28Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:40.984Z'
description: null
tags: []
---

# cognito-bak-res
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

AIO Tool for backing up and restoring AWS Cognito User Pools

Amazon Cognito is awesome, but has its own set of limitations. Currently there is no backup option provided in case we need to take backup of users (to move to another service) or restore them to new Userpool.

`cognito-bak-res` tries to overcome this problem by providing a way to backup users from cognito pool(s) to json file and vice-versa.

> **Please Note:** *There is no way of getting passwords of the users in cognito, so you may need to ask them to make use of ForgotPassword to recover their account.*


## Requirements

Requires node 6.10 or newer

## Installation

`cognito-bak-res` is available as a package on [npm](https://www.npmjs.com/package/cognito-bak-res).

```shell
npm install -g cognito-bak-res
```

## Usage

`cognito-bak-res` can be used by importing it directly or via [CLI](#cli) (recommended).

### Imports

Make sure you have installed it locally `npm install --save cognito-bak-res`. Typings are available and included.

```typescript
import * as AWS from 'aws-sdk';
import {backupUsers, restoreUsers} from 'cognito-bak-res';

const cognitoISP = new AWS.CognitoIdentityServiceProvider();

// you may use async-await too
backupUsers(cognitoISP, <USERPOOL-ID>, <directory>)
  .then(() => console.log(`Backup completed`))
  .catch(console.error)

restoreUsers(cognitoISP, <USERPOOL-ID>, <JSON-File>, <Password?>)
  .then(() => console.log(`Restore completed`))
  .catch(console.error)
```

This is useful incase you want to write your own wrapper or script instead of using CLI.


### CLI
Run `cognito-bak-res` or `cbr` to use it. Make use of `-h` for help.

```shell
cbr <command> [options]
```

> Available options are:
>
> `--region` `-r`: The region to use. Overrides config/env settings
>
> `--userpool` `--pool`: The Cognito pool to use. Possible value of `all` is allowed in case of backup.
>
> `--profile` `-p`: Use a specific profile from the credential file. Key and Secret can be passed instead (see below).
>
> `--aws-access-key` `--key`: The AWS Access Key to use. Not to be passed when using `--profile`.
>
> `--aws-secret-key` `--secret`: The AWS Secret Key to use. Not to be passed when using `--profile`.
>
> `--sessionToken` `--st`: The AWS Session Token to use. Not to be passed when using `--profile`.
>
> `--delay`: delay in millis between alternate users batch(60) backup, to avoid rate limit error.


- **Backup**
  ```shell
  cbr backup
  cbr backup <options>
  ```
  <b>Example:</b><br> cognito-bak-res backup --pool <i>us-east-1_XXXxxxxX</i> --key <i>YourProgramaticKeyForAWS</i> --secret <i>YourProgramatciSecretForAWS</i> --r <i>us-east-1</i> --dir <i>.</i> --st <i>YourSessionToken</i> --delay <i>10000</i>
  ```
  `--directory` option is available to export json data to.


- **Restore**
  ```shell
  cbr restore
  cbr restore <options>
  ```
  <b>Example:</b><br> cognito-bak-res restore --pool <i>us-east-1_XXXxxxxX</i> --key <i>YourProgramaticKeyForAWS</i> --secret <i>YourProgramatciSecretForAWS</i> --r <i>us-east-1</i> --file <i>./us-east-1_YYyyyyyyyy.json</i> --st <i>YourSessionToken</i> --delay <i>10000</i>
  ```
  `--file` option is available to read the json file to import from.

  `--pwd` option is available to set TemporaryPassword of the users. If not provided, cognito generated password will be used and email will be sent to the users with One Time Password.

  `--pwdModule` option is available to make use of custom logic to generate password. If not provided, cognito generated password will be used and email will be sent to the users with One Time Password, unless `--pwd` is used. Make sure to pass absolute path of the file. Refer [this](https://github.com/rahulpsd18/cognito-bak-res/pull/1).


**In case any of the required option is missing, a interactive command line user interface kicks in to select from.**

## Todo

- [X] ~~Fine tune the backup process~~
- [X] ~~Implement Restore~~
- [X] ~~Write detailed Readme with examples~~
- [X] ~~Restore Users together with Groups where they were members of~~


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/yavorss"><img src="https://avatars1.githubusercontent.com/u/16567086?s=460&u=30627428758cbe90d2e5bc9169bbb9cf37fc44a0&v=4" width="100px;" alt=""/><br /><sub><b>Yavor Stoychev</b></sub></a><br /><a href="https://github.com/T0tt1/cognito-bak-res/commits?author=t0tt1" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/t0tt1"><img src="https://avatars2.githubusercontent.com/u/49184867?s=460&u=3727c81a011775d9479cd40e1ce7cbfcb36e19f6&v=4" width="100px;" alt=""/><br /><sub><b>Todor Todorov</b></sub></a><br /><a href="https://github.com/T0tt1/cognito-bak-res/commits?author=t0tt1" title="Documentation">📖</a> <a href="#ideas-totti" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
