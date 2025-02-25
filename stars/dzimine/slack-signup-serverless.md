---
repo: dzimine/slack-signup-serverless
url: 'https://github.com/dzimine/slack-signup-serverless'
homepage: >-
  https://medium.com/@dzimine/exploring-serverless-with-python-stepfunctions-and-web-front-end-8e0bf7203d4b
starredAt: '2018-09-15T22:11:19Z'
createdAt: '2017-06-05T11:55:13Z'
updatedAt: '2022-06-11T17:26:47Z'
language: Python
license: NA
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:14.462Z'
description: Serverless sign-up to Slack (and other services) with Serverless.com
tags:
  - aws
  - aws-lambda
  - aws-step-function
  - serverless
  - serverless-framework
  - workflow
---

# Community Signup Serverless Service with Lambda, Python, StepFunction and DynamoDB

[![Build Status](https://circleci.com/gh/dzimine/slack-signup-serverless/tree/master.svg?style=shield)](https://circleci.com/gh/dzimine/slack-signup-serverless)
![Python 2.7](https://img.shields.io/badge/python-2.7-blue.svg)

Blog post: [Exploring Serverless with Python, StepFunctions, and Web Front-end
Serverless](https://medium.com/@dzimine/exploring-serverless-with-python-stepfunctions-and-web-front-end-8e0bf7203d4b)

> This time, with [Serverless framework](https://serverless.com)

This is a 'take two' on [Slack Signup with AWS Lambda](https://github.com/dzimine/slack-signup-lambda).
It was simple and functional, but working with AWS raw is such a pain in the butt...

Here, I use 1) [serverless.com](https://serverless.com) to make working with lambda enjoyable and 2) AWS step-functions
for multi-step sign-up workflow that touches multiple services. In this particular example, the workflow does what [StackStorm](https://www.stackstorm.com) signtup needs:
* call Slack API to create an invitation with [Slack's undocumented API](https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.mdCode)
* add a user to [ActiveCampaign CRM](http://www.activecampaign.com) 
* record a user in DynamoDB

It is easy to modify to add your custom steps, have fun!

![Serverless application diagram](https://github.com/dzimine/slack-signup-serverless/raw/master/ServerlessApplication.png)


### Install, configure, deploy, test
1. Clone this repository.
2. Install [serverless framework](https://serverless.com/framework/docs), and the required plugins:

    ```
    npm install -g serverless
    npm install
    ```
    I use [serverless-stepfunction](https://github.com/horike37/serverless-step-functions) plugin to write stepfunction as YAML in serverless.yaml and expose it as an API endpoint,
    and [serverless-apig-s3](https://github.com/sdd/serverless-apig-s3) for convenient front-end deployment to the same URI (no CORS messing).

3. Configure credentials

    1. For AWS credentials, follow [setup docs](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
        I prefer using [AWS CLI with named profiles](http://docs.aws.amazon.com/cli/latest/userguide/
        cli-multiple-profiles.html). To use an AWS profile, `export AWS_DEFAULT_PROFILE="profileName"`. Test AWS CLI settings: `aws lambda list-functions`.

        To use an AWS profile in Serverless, `export AWS_PROFILE=$AWS_DEFAULT_PROFILE`, to match `aws` CLI profile and avoid confusion. You **MUST** also specify the AWS region in `AWS_REGION` for serverless, as it won't take it from AWS profile. So, three env vars in total:
        
        ```
        export AWS_DEFAULT_PROFILE="profileName"
        export AWS_PROFILE=$AWS_DEFAULT_PROFILE
        export AWS_REGION=us-west-2
        ```
        
        > NOTE: Till the [bug #3947](https://github.com/serverless/serverless/issues/3947) fixed,the way to set a region is by `--region` in `sls` CLI.
        
        Or use `--aws-profile profileName` when invoking `sls` CLI. Unfortunately there's no way
        to test it before you try to deploy.

        Create `./private.yml` file and set up the accountID and region there,
        see [`private.yml.example`](./private.yml.example). **Note** that region must match
    2. Slack and ActiveCampaign: place your credentials and config in `./env.yml`, use [env.yml.example](./env.yml.example). To find your Slack credentials for production or testing, 
    [use this hint from Stackstorm-Exchange](https://github.com/StackStorm-Exchange/stackstorm-slack#obtaining-auth-token).

4. Deploy

    1. Install Python dependencies:

        ```
        ./build.sh
        ```
    2. Deploy serverless stack

        ```
        sls deploy -v
        ```
    3. Deploy web client

        ```
        sls client deploy
        ```

5. Run, with `curl`:

    ```
    curl -X POST -H "Content-Type: application/json" -d '{"email":"your@email.com", "first_name":"Donald", "last_name":"Trump"}'  https://wqftmz3m97.execute-api.us-east-1.amazonaws.com/dev/signup
    ```
    
    Or, with `serverless`, for convenience: 
    
    ```
    sls invoke stepf --name signup --data '{"email":"your@email.com", "first_name":"Donald", "last_name":"Trump"}' 
    ```

### Unit testing and local development
1. Run `tox` (dah, `tox` and all your Python stack needs to be installed)

    ```
    virtualenv .venv
    source .venv/bin/activate
    pip install -r tests/test_requirements.txt
    ```

2. To run unit tests for local testing/development:

    ```
    # Activate virtualenv from tox
    source ./tox/py27/bin/activate
    # Run all tests
    python -m pytest
    # Run a single test and print the output ( -s flag ) 
    python -m pytest -s tests/invite_slack_test.py::InviteSlackTest::test_handler_ok 
    ```

### Tips and tricks

* Call individual lambda functions with serverless

    ```
    sls invoke -f RecordAC --data '{"email":"your@email.com", "first_name":"Donald", "last_name":"Trump"}' 
    ```
* Watch the logs:

    ```
    sls logs -f RecordAC
    ```
* On subsequent web client updates, just run `sls client deploy`. However when changes touch API Gateway settings, the full deploy is needed.
* Web updates doesn't [always, ever] deploy the API Gateway changes. Need to deploy manually (Console->Resources->Actions-Deploy API).
* Due to [apig-s3 bug](https://github.com/sdd/serverless-apig-s3/issues/11), remove the web s3 bucket manually when removing a stack.
    ```aws s3 rb s3://bucketname --force```
* Removing the stack does not remove the DynamoDB table. If you really want to start from scratch, delete it manually (export the data first):
    ```aws dynamodb delete-table --table-name slack-signup-dev```


