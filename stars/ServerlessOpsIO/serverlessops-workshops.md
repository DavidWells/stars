---
repo: ServerlessOpsIO/serverlessops-workshops
url: 'https://github.com/ServerlessOpsIO/serverlessops-workshops'
homepage: null
starredAt: '2019-02-09T18:14:36Z'
createdAt: '2018-08-16T21:22:51Z'
updatedAt: '2022-09-12T00:58:32Z'
language: null
license: Apache-2.0
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:46.155Z'
description: null
tags: []
---

# Serverless Workshops

[![Join the chat at https://gitter.im/ServerlessOpsIO/serverlessops-workshops](https://badges.gitter.im/ServerlessOpsIO/serverlessops-workshops.svg)](https://gitter.im/ServerlessOpsIO/serverlessops-workshops?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This repository contains the ServerlessOps training workshops. These workshops focus on providing the learner with the core skills to build serverless systems and applications.

The workshops in this repository are:

1) [Serverless Up And Running](./01-up-and-running/)
1) [Serverless Architecture](./02-architecture)
1) [Serverless Reliability And Operations](./03-operations)
1) [Serverless Security](./04-security)
1) Serverless Testing And CI/CD (coming)


## Requirements
* _An AWS Account._ This may be provided for you when training is delivered by ServerlessOps.
* _Docker (optional)._ ServerlessOps provides a [Docker container](https://github.com/ServerlessOpsIO/serverlessops-training-docker) with all necessary tools installed.
* _Command-line familiarity._ The majority of steps in these workshops will require use of the command line.
* _Code familiarity._ The ability to read and understand code is necessary. Most of the code examples are written in Python and the code is kept as simple as possible to make it understandable.

## Getting Started
To prepare for these workshops, chooses from one of the options below for setting up your development environment.

* Docker Based Setup (Recommended)
* Manual Setup

### Docker Based Setup (Recommended)

#### 1. Download and Install Docker.

Download and install Docker CE from the following site if you do not already currently have it.

* https://docs.docker.com/install/

#### 2. Pull workshop container image.

Execute the following command to pull the workshop container which has a fully configured environment.

```
docker pull serverlessops/training:latest
```

#### 3. Start And Configure Container.

To start the container, run the following command
```
docker run -ti --rm serverlessops/training:latest
```

_Note: If launching this in a tmux or screen session, then pass in your environment’s TERM setting so certain keys behave as expected._
```
docker run -ti -e “TERM=${TERM}” --rm serverlessops/training:latest
```

After you've started the container you'll be asked to fill in some workshop setup information. Enter a username for the stage name, along with your AWS access and secret keys. (If you're doing this as a part of a class you will have been provided these.)

```
Stage name: user0
AWS Access Key ID [None]: |ACCESS_KEY_ID|
AWS Secret Access Key [None]: |SECRET_ACCESS_KEY|
Default region name [us-east-1]:
Default output format [json]:
```

Run the following command and ensure you get back a similar response as below. This indicates your credentials are properly configured.

```
$ aws sts get-caller-identity
{
    "UserId": "AROAI4AIGYLQKD6SGBBIE:botocore-session-1526934883",
    "Account": "144121712529",
    "Arn": "arn:aws:sts::144121712529:assumed-role/OrganizationAccountAccessUserRole/botocore-session-1526934883"
}
```

#### 4. Working In The Container

After configuration has been completed you will be placed in the `/workshop` directory inside the container. All tools needed to complete the workshop are configured and provided. Two editors are available for you to view and edit files.

* nano
* vim

You're now ready to start the workshop!

### Manual Setup
This section covers manually setting up your development environment. This should only be used if installing Docker is not possible or to understand configuring your own development environment for continuing to explore serverless after this workshop is completed.

<details>
<summary><strong>Manual Setup (expand for details)</strong></summary><p>

#### __NodeJS / NPM__
Our chosen tool for managing serverless systems is written in JavaScript so you will need a Node.JS runtime and package manager. Please install by using one of the methods below.

* Mac / Homebrew:
```
brew update && brew install node
```
* Windows / Linux / Generic: Install the latest stable or LTS release located here: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

#### __Serverless Framework__
[Serverless Framework](https://serverless.com/framework/) is our chosen tool for managing deployment of serverless systems.

* All OSes:
```
$ npm install -g serverless
```

#### __Python:__
Our application platform is written in Python 3.6 and we will need a Python runtime installed.
<!--
__FIXME:__ Need Pyenv too; remember to set `python3.6` as python executable. `pyenv virtualenv -p python3.6 3.6`
-->
* Mac / Homebrew:
```
brew update && brew install node
```
* Windows / Generic: Install the latest version of Python 3.6 located here: [https://www.python.org/downloads/](https://www.python.org/downloads/)

In addition, you may find [pyenv](https://github.com/pyenv/pyenv) useful for managing Python virtual environments.

* Mac / Homebrew:
```
brew update && brew install pyenv
```
* Windows / Linux / Generic
```
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

### AWS Account Setup

Configure AWS credentials by creating the following files if they do not exist for you already, and add the following contents to them. You'll be given an AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY at the start of class to fill in below.

_~/.aws/config_
```
[profile training-prime]
region = us-east-1
output = json

[profile training-dev]
region = us-east-1
output = json

[profile training-prod]
region = us-east-1
output = json
```

_~/.aws/credentials_
```
[training-prime]
aws_access_key_id = %%AWS_ACCESS_KEY_ID%%
aws_secret_access_key = %%AWS_SECRET_ACCESS_KEY%%

[training-dev]
source_profile = training-prime
role_arn = arn:aws:iam::144121712529:role/OrganizationAccountAccessUserRole

[training-prod]
source_profile = training-prime
role_arn = arn:aws:iam::820506766567:role/OrganizationAccountAccessUserRole

```

Lastly, set the following variables in your shell environment. You'll be given a USERNAME when assigned your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

```
$ export SLS_STAGE=%%USERNAME%%
$ export AWS_DEFAULT_PROFILE=training-dev
```

### Clone this Github repository

Finally, clone this Github repository and initialize the git submodules.

```
$ git clone https://github.com/ServerlessOpsIO/aws-serverless-workshops.git
$ cd aws-serverless-workshops
$ git submodule init
```

</p></details>


