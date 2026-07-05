---
repo: gunnertech/gunnerfy
url: 'https://github.com/gunnertech/gunnerfy'
homepage: null
starredAt: '2020-09-12T18:06:55Z'
createdAt: '2019-05-17T03:37:50Z'
updatedAt: '2021-04-24T01:16:23Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:34.266Z'
description: null
tags: []
---

# Description

Gunnerfy is a set of convenience commands that wrap the AWS (CLI, AppSync and Amplify), Serverless Framework, React and Expo and assist in the setup and workflow of a serverless platform in a multi-developer team, leveraging AWS best practices.

If you are not familiar with the above technology stack, Gunnerfy is not for you.

Setup is based off of [this starter template](https://github.com/gunnertech/aws-severless-react-template)

Please [check out our usage videos](https://www.youtube.com/watch?v=Vz0G3Lq3DdQ&list=PLQBYTfA46mzj4dYTB73J5QxZXu9MF5ZHy)

# Setup

## Prerequisites

Install the following

1. Brew: ``$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``
1. Python: ``$ brew install python; brew upgrade python``
1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html#install-tool-pip) or ``$ brew install awscli; brew upgrade awscli``
1. Setup your aws cli if you haven't: ``aws configure``
1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. [NVM](https://github.com/creationix/nvm#installation-and-update)
1. Node: ``nvm install 12``

## Installation
````
$ nvm use 12
$ npm install gunnerfy -g
````

## Create a new Platform
````
$ gunnerfy new <project-name> -o <organization-name>
````

### Examples

#### Fine Grained Access Control

Allow gunnerfy to create a new group for each environment.

This gives developers fine-grained access to the different environments, i.e., developers can only access their environment and not the staging, production environments.

````
$ gunnerfy new sample-project -o SampleClient
$ gunnerfy new sample-project -o SampleClient -s staging
$ gunnerfy new sample-project -o SampleClient -s production
````

#### Lax Access Control

If you only want one group created for all the environments in the project, pass a group name to the command.

This will create fewer groups, but each environment will be in one group, meaning a developer in the group will have access to all of the environments.

````
$ gunnerfy new sampleProject -o SampleClient -g sampleProjectGroup
$ gunnerfy new sampleProject -o SampleClient -s staging  -g sampleProjectGroup
$ gunnerfy new sampleProject -o SampleClient -s production  -g sampleProjectGroup
````

## Sentry

When you create the project in sentry, make sure you use the exact ``<project-name>`` as the project name

1. [Create a new project](https://sentry.io/organizations/gunner-technology/projects/new/)
2. Note the url (i.e. https://xxxxxxxxx@sentry.io/xxxxx)
3. ``gunnerfy set-var -n sentry-url -v <url>``



# Adding a Team Member
1. Dev requests access to ``<base-stage>`` from team lead (where pull requests are submitted, i.e. staging) with their IAM ``<user-name>``
1. If approved, team lead will add dev's IAM user to the IAM group with access to base-stage

````
$ gunnerfy users add -u <user-name> -s <base-stage>
````

2. The app will print the team lead a command to send to the new developer for them to run like this:
````
$ gunnerfy add-project <project-name> -s <baseStage>
````

# RDS Schema Migrations and Codegen (optional)

While DynamoDB is the default data store, Gunnerfy also allows teams to build a serverless datastore using MySQL on RDS.

````
$ cd <project-name>
$ gunnerfy generate migration -n <migration-name> -s <sql-statement>
$ gunnerfy migrate
$ amplify env checkout <stage>
$ amplify api add-graphql-datasource
````

# Workflow

## Running Locally

### Backend (ALWAYS RUN THIS)

````
$ gunnerfy develop
````

### React Client 

````
$ cd react-client
$ STAGE=<stage> npm run start
````

### React Native Client 

````
$ cd react-native-client
$ STAGE=<stage> npm run <simulator> (ios|android)
````

## Start of iteration
````
$ git checkout <base-stage (staging|prodution>; git pull; # this makes sure you have the latest code and hotfixes
$ git checkout <stage>; git merge <base-stage>
$ amplify env checkout <stage>
````

## Work on issues
````
$ git checkout -b <issue-number>
$ # work work work
$ gunnerfy deploy backend # if you need to make backend changes
$ git add .; git commit -am “closes #<issue-number>”
$ git checkout <stage>
$ git merge <issue-number>
$ git push
$ git branch -D <issue-number>
$ # Repeat on all issues assigned
````

## Submit pull request

Each developer on the project will submit a pull request at the end of the iteration

````
$  gunnerfy git-submit -i <iteration-end-date: (format: YYYYMMDD)> -t <target-stage>
````

## Approve pull requests

Team lead reviews and approves pull requests

````
$ gunnerfy git-approve -i <request-id> -s <stage> # gunnerfy git-approve -i 2 -s staging
$ # repeat above for all pull requests
$ gunnerfy git-tag -s <stage> -i <iteration-end-date (format: YYYYMMDD)>
````  


## Deploying


### Backend

````
$ gunnerfy deploy backend -s <stage>
````

### React Native Front End
````
$ gunnerfy deploy mobile -s <stage>
````
### React Front End

````
$ gunnerfy deploy web -s <stage>
````


# Recommended Training Material
1. [IAM Cross Account Access](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html)
1. [Amplify GraphQL](https://aws-amplify.github.io/docs/cli/graphql)
1. [Amplify Workflow](https://aws-amplify.github.io/docs/cli/multienv?sdk=js)
1. [Amplify VSCode Extension](https://github.com/aws-amplify/amplify-js/wiki/VS-Code-Snippet-Extension#full-code-block-snippet-documentation)
1. [Amplify with AppSync](https://aws-amplify.github.io/docs/js/api#aws-appsync-sdk)
5. [Serverless Framework Docs](https://services/base.com/framework/docs/providers/aws/guide/quick-start/)
1. [AWS CloudFormation Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html)
1. [AppSync with Aurora](https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-rds-resolvers.html#create-database-and-table)
1. [Expo Docs](https://docs.expo.io/versions/latest/)
1. [React Native Docs](https://facebook.github.io/react-native/docs/getting-started.html)
1. [React Docs](https://reactjs.org/docs/getting-started.html)
1. [Apollo Docs](https://www.apollographql.com/docs/react/)
1. [Ramda Docs](https://ramdajs.com/docs/)
1. [RxJS Docs](https://rxjs-dev.firebaseapp.com/guide/overview)
1. [AppSync Docs](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html)

## Accounts

If you want to delete an account, simply close the account.

However, you should also remove the IAM Group and IAM Policy in the main account as well

## Commands

See [gunnerfy.js](https://github.com/gunnertech/gunnerfy/blob/master/bin/gunnerfy.js) for full list of commands. Run ``$ gunnerfy <command> --help`` for more information

## Troubleshooting

1. [Git 403 error](https://docs.aws.amazon.com/codecommit/latest/userguide/troubleshooting-ch.html)
2. [error: uncaughtException: The security token included in the request is expired](https://github.com/aws-amplify/amplify-cli/issues/1980)

## TODOs

Please see the issues section on Github for a list of development and documentation items.

If you have an issue or question, please feel free to open a new issue.
