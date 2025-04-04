---
repo: bennybauer/serverless-python-sample
url: 'https://github.com/bennybauer/serverless-python-sample'
homepage: null
starredAt: '2016-12-12T05:18:31Z'
createdAt: '2016-09-21T19:01:11Z'
updatedAt: '2024-12-14T09:27:48Z'
language: Python
license: MIT
branch: master
stars: 76
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:51.621Z'
description: A simple serverless python sample with REST API endpoints and dependencies
tags:
  - python
  - serverless
  - serverless-framework
---

# Serverless Python Sample
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

A simple serverless python sample. The service is running on AWS Lambda using [Serverless Framework](https://github.com/serverless/serverless).

The service has a dependency on external package (`requests`) and it exposes 2 REST API endpoints:

| **Endpoint** |**Description**|
|-------|------|
| `GET /posts` | Retrieves a list of posts  |
| `GET /posts/{id}` | Retrieves a specific post (e.g. `GET /posts/5`) |


# Usage
## Setup
| **Step** | **Command** |**Description**|
|---|-------|------|
|  1. | `npm install -g serverless` | Install Serverless CLI  |
|  2. | `npm install` | Install Serverless dependencies  |
|  3. | Set up an AWS account with admin permissions | [Documentation](https://serverless.com/framework/docs/providers/aws/guide/credentials/)  |

## Development
| **Step** | **Command** |**Description**|
|---|-------|------|
|  1. | `mkvirtualenv posts` | Create virtual environment (using [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)) |
|  2. | `pip install -r requirements.txt` | Install dependencies|


## Deployment

	sls deploy

### Invocation

	curl <host>/posts
	curl <host>/posts/5

# Tips & Tricks

### `help` command
Just use it on anything:

	sls  help
or

	sls <command> --help

### `deploy function` command
Deploy only one function:

	sls deploy function -f <function-name>

### `logs` command
Tail the logs of a function:

	sls logs -f <function-name> -t

### `info` command
Information about the service (stage, region, endpoints, functions):

	sls info

### `invoke` command
Run a specific function with a provided input and get the logs

	sls invoke -f <function-name> -p event.json -l

# Credits
[JSONPlaceholder](https://jsonplaceholder.typicode.com) by [@typicode](https://github.com/typicode) is used for the posts backend.
