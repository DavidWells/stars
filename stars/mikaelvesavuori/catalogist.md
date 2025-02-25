---
repo: mikaelvesavuori/catalogist
url: 'https://github.com/mikaelvesavuori/catalogist'
homepage: 'https://catalogist.pages.dev'
starredAt: '2025-01-14T07:26:53Z'
createdAt: '2022-01-12T10:30:22Z'
updatedAt: '2025-01-14T07:26:53Z'
language: TypeScript
license: MIT
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.736Z'
description: >-
  Catalogist is the easy way to catalog and make your software and
  (micro)services visible to your organization in a lightweight and
  developer-friendly way.
tags:
  - discoverability
  - discovery
  - discovery-service
  - observability
  - service-catalog
  - service-landscape
  - software-catalog
  - software-discovery
  - software-landscape
  - software-observability
---

# Catalogist 📚 📓 📒 📖 🔖

![Build Status](https://github.com/mikaelvesavuori/catalogist/workflows/catalogist/badge.svg) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fcatalogist.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fcatalogist?ref=badge_shield) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_catalogist&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mikaelvesavuori_catalogist) [![CodeScene Code Health](https://codescene.io/projects/22501/status-badges/code-health)](https://codescene.io/projects/22501) [![CodeScene System Mastery](https://codescene.io/projects/22501/status-badges/system-mastery)](https://codescene.io/projects/22501) [![codecov](https://codecov.io/gh/mikaelvesavuori/catalogist/branch/main/graph/badge.svg?token=AIV06YBT8U)](https://codecov.io/gh/mikaelvesavuori/catalogist) [![Maintainability](https://api.codeclimate.com/v1/badges/1a609622737c6c48225c/maintainability)](https://codeclimate.com/github/mikaelvesavuori/catalogist/maintainability)

## The easy way to catalog and make your software and (micro)services visible to your organization through an API.

**You were a person on a mission: To have a total bird's eye view on your entire software estate. You tried to win the hearts and minds of developers with microservices, and after many battles you are now finally churning out itty-bitty services, but find yourself in a quagmire without the faintest clue about what's going on anymore. Like [Fox Mulder](https://en.wikipedia.org/wiki/Fox_Mulder), you become disillusioned with what sad excuse of a "truth" is _actually_ out there.** 😭😭😭

!["Big ball of mud"](images/servicemap.jpeg)

_From [Mario Fusco's Twitter post](https://twitter.com/mariofusco/status/1112332826861547520/photo/1)_

Catalogist helps you make sense of that, in a lightweight and developer-friendly way, without having to break the bank to purchase six-figure enterprise architecture software or going all-in on [Backstage](https://backstage.io).

### How it works

Simple: Write a bit of metadata description (a _manifest_ file) for every service/software in a standardized format and send it to a central service, making it available to read through an API. With no more that that, we can mitigate the lack of visibility and nomenclature around how we express the attributes of our software or services.

When the manifest reaches the actual database/persistence layer, it is called a _record_ while it's there, laying dormant.

An implementer will interact with Catalogist in one of two typical ways:

- **Custom software (e.g. your own microservices)**: Create a _manifest_ file in the root of the application, and make a POST request to the Catalogist service during the CI stage. This is ideal since it enforces an always-up-to-date version of the solution's manifest.
- **Manually, for example for non-custom (e.g. commercial-off-the-shelf") software**: The Catalogist service can be called manually or as an integrated part of a "dashboard" that you build yourself. An operations team could also do infrequent updates based on a ticketing system.

### Diagram

_As it stands currently, Catalogist is implemented in an AWS-slanted direction. This should be fairly easy to modify so it works with other cloud platforms and with other persistence technologies. If there is sufficient demand, I might add extended support. Or you do it! Just make a PR and I'll see how we can proceed._

On the surface Catalogist is a relatively simple Node.js-based serverless application that exposes an API Gateway with three microservices behind it: an optional authorizer, one for creating a record, and the last one for getting records. Records are persisted in DynamoDB. When deployed, the standard implementation—as provided—results in a complete solution with an (optional) authorizer function, the backend functions, and all required infrastructure resources.

![Catalogist diagram](images/catalogist-diagram.png)

Please see the [generated documentation site](https://catalogist.pages.dev) for more detailed information.

---

## Prerequisites

- Amazon Web Services (AWS) account with sufficient permissions so that you can deploy infrastructure. A naive but simple policy would be full rights for CloudWatch, Lambda, API Gateway, DynamoDB, X-Ray, and S3.

## Installation

Clone or fork the repo as you normally would. Run `npm install --force`.

## Commands

The below commands are the most critical ones. See package.json for more commands!

- `npm start`: Runs Serverless Framework in offline mode
- `npm test`: Tests code
- `npm run deploy`: Deploys code with Serverless Framework
- `npm run build`: Package and build the code with Serverless Framework
- `npm run teardown`: Removes the deployed stack

## Configuration

1. You will need to configure your own AWS account number in `serverless.yml`.
2. You should enter a self-defined API key in `serverless.yml` under `custom.config.apiKey`; otherwise a default key will be used (the value is seen in the mentioned location).

## Running Catalogist

Run `npm start`.

## Deployment

First make sure that you have a fallback value for your AWS account number in `serverless.yml`, for example: `awsAccountNumber: ${opt:awsAccountNumber, '123412341234'}` or that you set the deployment script to use the flag, for example `npx sls deploy --awsAccountNumber 123412341234`.

Then you can deploy with `npm run deploy`.

## Setting up for CI and automation

In your CI tool, just call the API, passing in your manifest file and your (self-defined) API key:

```bash
curl -X POST ${ENDPOINT}/record -d "@manifest.json" -H "Authorization: ${API_KEY}"
```

## Manifest

The manifest file is a simple JSON file or a JSON payload that describes your solution, system, or service.

The below gives an overview of what data can be described. See the example and interface specification further down.

### Required top-level keys/fields/properties

#### `spec`

Fundamental information about your solution. **Note that only the `repo`, `name`, and `description` fields are required, all other properties are optional.**

### Optional top-level keys/fields/properties

#### `relations`

Named relations this component has to other components.

#### `support`

Support information for the component.

#### `slo`

Array of SLO items. An SLO item represents Service Level Objective (SLO) information. Max 20 items allowed.

#### `api`

Array of API items. An API item represents the name of any API connected to this solution. The value should ideally point to a (local or remote) schema or definition. Max 20 items allowed.

#### `metadata`

Any optional metadata. Accepts custom-defined keys with string values.

#### `links`

Array of Link items. A Link item represents a link to external resources. Max 20 items allowed.

### Full example

The below gives you an idea of how a "full-scale" manifest might look.

```json
{
  "spec": {
    "repo": "someorg/somerepo",
    "name": "my-api",
    "description": "My API",
    "kind": "api",
    "lifecycleStage": "production",
    "version": "1.0.0",
    "responsible": "Someguy Someguyson",
    "team": "ThatAwesomeTeam",
    "system": "some-system",
    "domain": "some-domain",
    "dataSensitivity": "public",
    "tags": ["typescript", "backend"]
  },
  "relations": ["my-other-service"],
  "support": {
    "resolverGroup": "ThatAwesomeTeam"
  },
  "slo": [
    {
      "description": "Max latency must be 350ms for the 90th percentile",
      "type": "latency",
      "implementation": "(sum:trace.aws.lambda.hits.by_http_status{http.status_class:2xx AND service IN (demoservice-user,demoservice-greet)} by {service}.as_count() - sum:trace.aws.lambda.errors.by_http_status{http.status_class:5xx AND service IN (demoservice-user,demoservice-greet)} by {service}.as_count()) / (sum:trace.aws.lambda.hits{service IN (demoservice-user,demoservice-greet)} by {service}.as_count())",
      "target": "350ms",
      "period": 30
    }
  ],
  "api": [
    {
      "name": "My API",
      "schemaPath": "./api/schema.yml"
    }
  ],
  "metadata": {},
  "links": [
    {
      "url": "https://my-confluence.atlassian.net/wiki/spaces/DEV/pages/123456789/",
      "title": "Confluence documentation",
      "icon": "documentation"
    }
  ]
}
```

### Specification

Please find a more exact description in `src/interfaces/Manifest.ts`.

## Validation and sanitization

Input data is processed when Catalogist attempts to form input data into a Manifest internally. During that step we coerce the input into a new object (stringify, then parse as a new object), drop unknown keys, check the size of the remaining object, and also check for missing information. See `src/domain/valueObjects/Manifest.ts`.

Because there is a bit of customization allowed, Catalogist will only drop unknown keys from the root object and from within the `spec` object.

### Rules and limits

- All POST request input is sanitized.
- Regex matching will be used to discard a wide degree of less common characters. Less aggressive replacement is enforced on `spec.description` and `slo[].implementation` fields.
- Custom key names (in the `support` and/or `metadata` fields) may be 50 characters long.
- Custom values (in the `support` and/or `metadata` fields) may be 500 characters long.
- The maximum ingoing payload size must be less than 20000 characters when stringified.
- You are allowed to use a maximum of 20 items in the `api`, `slo` and `links` arrays.
- You are allowed to use a maximum of 50 items in the `relations` array.

---

## Example API calls

- [Create a record](#create-a-record)
- [Get exact record](#get-exact-record)
- [Get records in given Git repository](#get-records-in-given-git-repository)

**Note that `GET` requests will always return an array, even if the result set is empty.**

### Create a record

This is the most minimal, valid example you can create a record with.

#### Example request

**POST** `{{BASE_URL}}/record`

```json
{
  "spec": {
    "repo": "someorg/somerepo",
    "name": "my-api",
    "description": "My API"
  }
}
```

#### Example response

`204 No Content`

### Get exact record

To get an exact record yoy will need to call the API with the `repo` and `service` parameters.

#### Example request

**GET** `{{BASE_URL}}/record?repo=someorg/somerepo&service=my-api`

#### Example response

```json
[
  {
    "spec": {
      "repo": "someorg/somerepo",
      "name": "my-api",
      "description": "My API",
      "kind": "api",
      "lifecycleStage": "somelifecycle",
      "version": "1.0.0",
      "responsible": "Someguy Someguyson",
      "team": "ThatAwesomeTeam",
      "system": "some-system",
      "domain": "some-domain",
      "dataSensitivity": "public",
      "tags": ["typescript", "backend"]
    },
    "relations": ["my-other-service"],
    "support": {
      "resolverGroup": "ThatAwesomeTeam"
    },
    "api": [
      {
        "name": "My API",
        "schemaPath": "./api/schema.yml"
      }
    ],
    "slo": [
      {
        "description": "Max latency must be 350ms for the 90th percentile",
        "type": "latency",
        "implementation": "(sum:trace.aws.lambda.hits.by_http_status{http.status_class:2xx AND service IN (demoservice-user,demoservice-greet)} by {service}.as_count() - sum:trace.aws.lambda.errors.by_http_status{http.status_class:5xx AND service IN (demoservice-user,demoservice-greet)} by {service}.as_count()) / (sum:trace.aws.lambda.hits{service IN (demoservice-user,demoservice-greet)} by {service}.as_count())",
        "target": "350ms",
        "period": 30
      }
    ],
    "links": [
      {
        "url": "https://my-confluence.atlassian.net/wiki/spaces/DEV/pages/123456789/",
        "title": "Confluence documentation",
        "icon": "documentation"
      }
    ],
    "timestamp": 1679155957000
  }
]
```

### Get records in given Git repository

Note that it's possible to get multiple responses in a GET call if you are only providing the `repo` parameter, as you might have several services referring to the same Git repository.

#### Example request

**GET** `{{BASE_URL}}/record?repo=someorg/somerepo`

#### Example response

```json
[
  {
    "spec": {
      "repo": "someorg/somerepo",
      "name": "my-api",
      "description": "My API",
      "kind": "api",
      "lifecycleStage": "somelifecycle",
      "version": "1.0.0",
      "responsible": "Someguy Someguyson",
      "team": "ThatAwesomeTeam",
      "system": "some-system",
      "domain": "some-domain",
      "dataSensitivity": "public",
      "tags": ["typescript", "backend"]
    },
    "relations": ["my-other-service"],
    "support": {
      "resolverGroup": "ThatAwesomeTeam"
    },
    "api": [
      {
        "name": "My API",
        "schemaPath": "./api/schema.yml"
      }
    ],
    "slo": [
      {
        "description": "Max latency must be 350ms for the 90th percentile",
        "type": "latency",
        "implementation": "(sum:trace.aws.lambda.hits.by_http_status{http.status_class:2xx AND service IN (demoservice-user,demoservice-greet)} by {service}.as_count() - sum:trace.aws.lambda.errors.by_http_status{http.status_class:5xx AND service IN (demoservice-user,demoservice-greet)} by {service}.as_count()) / (sum:trace.aws.lambda.hits{service IN (demoservice-user,demoservice-greet)} by {service}.as_count())",
        "target": "350ms",
        "period": 30
      }
    ],
    "links": [
      {
        "url": "https://my-confluence.atlassian.net/wiki/spaces/DEV/pages/123456789/",
        "title": "Confluence documentation",
        "icon": "documentation"
      }
    ],
    "timestamp": 1679155957000
  },
  {
    "spec": {
      "repo": "someorg/somerepo",
      "name": "my-other-api",
      "description": "My Other API"
    },
    "timestamp": 1679155958000
  }
]
```
