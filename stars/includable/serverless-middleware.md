---
repo: includable/serverless-middleware
url: 'https://github.com/includable/serverless-middleware'
homepage: 'https://flexible.agency'
starredAt: '2024-04-17T01:12:29Z'
createdAt: '2021-06-18T12:30:39Z'
updatedAt: '2025-02-06T11:46:29Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:31.469Z'
description: Default serverless middleware for some of our projects.
tags:
  - aws-lambda
  - nodejs
  - serverless
---

# Serverless Middleware

A helper for writing APIs using AWS Lambda functions.

### Features

- Dependency injection for easy unit testing.
- Pretty JSON error output, with status codes automatically determined based on error message.
- Easy access to query strings and JSON body properties.
- Serverless warmup plugin support.
- OpenTelemetry support and additional span attributes, for use with [opentelemetry-lambda](https://github.com/open-telemetry/opentelemetry-lambda).

---

## Installation

```shell
yarn add @includable/serverless-middleware
```

## Example usage

```js
import { middleware, auth } from "@includable/serverless-middleware";

const dependencies = {
  // dependencies for the dependency injector
};

export const app = async (
  { query, path, body },
  { currentUser /* dependences */ },
) => {
  // if `auth` is included in the second param of `middleware`, currentUser
  // will be an object in the form of `{ id, groups, email, ... }`

  // your business logic goes here

  return {
    success: true,
    text: "Hello, world!",
  };
};

export const handler = middleware(app, [auth]).register(dependencies);
```

## Options

### Warmup support

Out of the box this middleware setup supports the [serverless-plugin-warmup](https://github.com/FidelLimited/serverless-plugin-warmup)
serverless plugin.

Simply install the serverless plugin, no other changes to your code necessary.
The middleware will automatically prevent code execution on warmup requests.

### OpenTelemetry span enrichment

If an active OpenTelemetry span is detected, event and response properties will automatically be added.

<br /><br />

---

<div align="center">
	<b>
		<a href="https://includable.com/consultancy/?utm_source=serverless-middleware">Get professional support for this package →</a>
	</b>
	<br>
	<sub>
		Custom consulting sessions availabe for implementation support and feature development.
	</sub>
</div>
