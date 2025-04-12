---
repo: lmammino/org-formation-sso-import
url: 'https://github.com/lmammino/org-formation-sso-import'
homepage: 'https://loige.co'
starredAt: '2025-04-04T17:10:21Z'
createdAt: '2024-09-21T17:41:14Z'
updatedAt: '2025-04-04T17:10:22Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:06.991Z'
description: >-
  An experimental™️ script to import AWS SSO groups, permission sets and
  assignments into a OrgFormation workspace.
tags:
  - aws
  - cloudformation
  - import
  - node
  - nodejs
  - org-formation
  - script
  - sso
---

# org-formation-sso-import

[![build](https://github.com/lmammino/org-formation-sso-import/actions/workflows/build.yml/badge.svg)](https://github.com/lmammino/org-formation-sso-import/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/org-formation-sso-import)](https://www.npmjs.com/package/org-formation-sso-import)
[![release-please](https://badgen.net/static/release-please/%F0%9F%99%8F/green)](https://github.com/googleapis/release-please)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

An **experimental™️** script to import AWS SSO groups, permission sets and
assignments into a
[OrgFormation](https://github.com/org-formation/org-formation-cli) workspace.

> [!WARNING]\
> The **experimental™️** nature of this project is to be taken very seriously.
> This is still a new project which has been tested only against a limited
> number of use cases and configuration. It might not work 100% with your
> specific configuration. Please use it with caution and report any issues you
> might find. Even better, consider opening a PR to improve it if you find any
> bug or a missing feature! 😇

## The problem

If you have already bootstrapped your Landing Zone manually (or with some other
tool other than OrgFormation, e.g. Control Tower) and you want to start using
OrgFormation, you can easily import all your accounts and organizational units
with the `org-formation init` command. However, there is no simple way to import
all your SSO resources like Groups, Permission Sets, and Assignments.

This means that you generally have 3 options:

1. **Start from scratch**: Delete all your AWS SSO configuration and recreate
   everything as IaC in your OrgFormation template. Of course, this means that
   you might have some downtime where your users might not be able to access
   specific accounts or use specific profiles.
2. **Manage forward**: Leave your existing AWS SSO configuration as is and start
   managing new resources with OrgFormation. This is generally not recommended
   as it will lead to a split-brain configuration where some resources are
   managed by OrgFormation and some are managed manually.
3. **Manual import**: Manually import all your AWS SSO configuration into your
   OrgFormation template. This is probably the best approach because it allows
   to keep your existing resources and start managing them with OrgFormation.
   The problem is that this is a very manual and error-prone process. After all,
   [importing resources in an existing CloudFormation stack](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import-existing-stack.html)
   is like performing brain surgery with a spoon! 🧠😨 So, unless you are a
   CloudFormation ninja (or a brain surgeon), you should probably avoid this
   approach.

This script tries to provide a fourth option. It basically tries to automate
away all the complexity of a manual import by following a set of opinionated
steps. This script will create a new OrgFormation template in your workspace,
import Groups, Permission Sets and Assignments from AWS SSO and deploy them in a
new CloudFormation stack in your management account. All by running one simple
command!

## Installation

Installation is optional (you can run the script directly with `npx`), but if
you want to install it globally, you can run:

```bash
npm install -g org-formation-sso-import
```

## Requirements

- Node.js 20.x or later
- AWS CLI (configured with the right permissions - ideally an admin user in the
  management account)

## Usage

In your OrgFormation workspace, run the following command:

```bash
npx org-formation-sso-import
```

(or just `org-formation-sso-import` if you installed it globally)

> [!NOTE]\
> This command assumes that your `organization.yml` file is in the root of your
> workspace.

> [!IMPORTANT]\
> Your `organization.yml` file must have explicit `AccountId` properties for
> every account in your organization.

If all goes well, you should see 2 new files in your workspace:

- `organization-tasks.yml`: This file contains the OrgFormation tasks to manage
  your AWS SSO configuration.
- `templates/sso-assignments.yml`: The template you can edit to update your
  Groups, Permission Sets and Assignments.

After any change you can run:
`org-formation perform-tasks organization-tasks.yml` to deploy the changes.

### Configuration options

You can get the list of available options by running:

```bash
org-formation-sso-import --help
```

This will print something like:

```plain
  --stack-name <value>
  -s <value>
  Pass the name of the stack to be deployed (default: "SsoAssignments")

  --identity-store-id <value>
  -i <value>
  Pass the id of the identity store. If not provided will try to fetch for an existing one

  --managing-instance-arn <value>
  -m <value>
  Pass the arn of the managing instance. If not provided will try to fetch for an existing one

  --region <value>
  -r <value>
  Pass the region to be used. If not provided will use the value of the AWS_REGION environment variable.

  --verbose
  -v
  Enables verbose mode

  --help
  -h
  Prints this help
```

## How it works

This script will perform a number of actions to import your AWS SSO
configuration into your OrgFormation templates:

1. It will create a new CloudFormation stack in your management account with the
   name you provide (or `SsoAssignments` by default) and deploy it using
   OrgFormation.
2. It will query your AWS SSO configuration and retrieve groups, permission sets
   and assignments.
3. It will import all of these resources into the CloudFormation SSO stack
   managed by OrgFormation (this follows the steps described in
   [this AWS tutorial](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import-existing-stack.html)).
4. It will create a new OrgFormation template in your workspace with the
   resources imported from AWS SSO.

From this point on, you can manage your AWS SSO configuration as IaC with
OrgFormation and you wont' have to delete and recreate your groups, permission
sets and assignments just to be able to manage them in OrgFormation.

## Contributing

Everyone is very welcome to contribute to this project. You can contribute just
by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/org-formation-sso-import/issues).

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
