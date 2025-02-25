---
repo: neofinancial/awsx
url: 'https://github.com/neofinancial/awsx'
homepage: ''
starredAt: '2020-01-28T18:14:40Z'
createdAt: '2019-11-01T21:06:35Z'
updatedAt: '2025-01-27T20:18:27Z'
language: TypeScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:06.181Z'
description: AWS CLI profile switcher with MFA and Assume Role support
tags:
  - aws
  - aws-cli
  - cli
  - hack
  - hacktoberfest
  - mfa
  - squad-dx
  - typescript
---

# awsx

[![Build status](https://github.com/neofinancial/awsx/workflows/CI/badge.svg)](https://github.com/neofinancial/awsx/actions)
[![coverage](https://coverage.neotools.ca/api/badge/master/8LyR37NYnCX435oEgidAJ3)](https://coverage.neotools.ca/coverage/neofinancial/awsx)
[![codecov](https://codecov.io/gh/neofinancial/awsx/branch/master/graph/badge.svg)](https://codecov.io/gh/neofinancial/awsx)
![TypeScript 3.7.5](https://img.shields.io/badge/TypeScript-3.7.5-brightgreen.svg)

AWS CLI profile switcher with MFA support

## Usage

### Installation

```sh
// npm
npm install -g awsx

// yarn
yarn global add awsx
```

Add the following to your `.bash_profile` or `.bashrc`:

```sh
alias awsx="source _awsx"
```

Reload your profile by launching a new shell or running `source ~/.bash_profile`.

### Upgrading

```sh
// npm
npm install -g awsx

// yarn
yarn global upgrade awsx --latest
```

### Switching profiles

#### `awsx` or `awsx [profile]` or `awsx [profile] [assume-role-profile]`

If you don't specify a profile name (or an assume role profile name, if applicable) you will be prompted to choose from one of your existing profiles. If the selected profile has MFA enabled and you want to force a new MFA login use the `--force-mfa` flag.

### Adding a new profile

#### `awsx add-profile [profile] [access-key] [secret-key] [key-max-age] [default-region] [output-format] [mfa-arn] [mfa-expiry]`

> NOTE: If you don't provide inputs you will be prompted for them.

#### Finding your MFA ARN

You can find your MFA ARN by logging into the AWS Console, clicking on your name in the menu and then clicking on "My Security Credentials". Under the "Multi-factor authentication (MFA)" section there should be an "Assigned MFA device" heading. The string below that that starts with `arn:aws:iam::` is your MFA ARN.

If you don't have MFA set up on your AWS account you can enable it by following [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html).

### Adding MFA support to an existing profile

#### `awsx enable-mfa [profile]`

### Removing MFA support from an existing profile

#### `awsx disable-mfa [profile]`

### Removing a profile

#### `awsx remove-profile [profile]`

### Get current profile

#### `awsx current-profile`

### Adding an assume role profile

#### `awsx add-assume-role-profile [profile] [parent-profile] [role-arn] [default-region] [output-format]`

### Removing an assume role profile

#### `awsx remove-assume-role-profile [profile]`

### Show what AWS account and identity you're using

#### `awsx whoami` or `awsx status`

### Set access key maximum age

#### `awsx set-key-max-age [profile] [max-age]`

> NOTE: use 0 days for no maximum age

## Contributing

If you'd like to contribute to awsx we recommend that you first [open an issue](https://github.com/neofinancial/awsx/issues) to discuss your proposed change.

1. Fork this repo
1. Clone the forked repo
1. Install dependencies: `npm install`

### Development

#### `npm start`

### Building

#### `npm run build`

To clean the build directory run `npm run clean`

### Testing

#### `npm run test`

## Publishing

1. Update the version in `package.json`
1. Add a `CHANGELOG` entry
1. Commit your changes
1. Run `npm pack --dry-run` to see what will be published
1. Run `npm publish`
1. Create a release on GitHub. Use the version as the tag and release name. For example for version `1.0.0` the tag and release name would be `v1.0.0`.

## Credits

This project was inspired by [awsp](https://github.com/johnnyopao/awsp)
