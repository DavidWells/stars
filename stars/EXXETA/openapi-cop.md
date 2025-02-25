---
repo: EXXETA/openapi-cop
url: 'https://github.com/EXXETA/openapi-cop'
homepage: ''
starredAt: '2020-03-03T03:57:03Z'
createdAt: '2020-02-19T10:30:10Z'
updatedAt: '2025-01-27T12:17:42Z'
language: TypeScript
license: MIT
branch: main
stars: 371
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:04.071Z'
description: >-
  A proxy that validates responses and requests against an OpenAPI document.
  https://www.npmjs.com/package/openapi-cop
  https://hub.docker.com/r/lxlu/openapi-cop
tags:
  - contract-testing
  - data-validation
  - openapi
  - proxy
  - swagger
  - validation
---

<h1 align="center">openapi-cop</h1>
<p align="center">
  OpenAPI <b>Co</b>mpliance <b>P</b>roxy that validates requests and responses against an OpenAPI document
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/EXXETA/openapi-cop" alt="License">
  <a href="https://github.com/EXXETA/openapi-cop/actions/workflows/nodejs.yml"><img src="https://github.com/EXXETA/openapi-cop/actions/workflows/nodejs.yml/badge.svg" alt="CI status"></a>
  <a href="https://www.npmjs.com/package/openapi-cop"><img src="https://img.shields.io/npm/v/openapi-cop" alt="NPM version"></a>
  <a href="https://hub.docker.com/r/lxlu/openapi-cop"><img src="https://img.shields.io/docker/v/lxlu/openapi-cop?label=Docker%20image&sort=semver" alt="Docker Image Version (latest semver)"></a>
</p>

<p align="justify">
The idea is to place the proxy between a client (e.g. a frontend app) and a web server to catch invalid requests or responses during development. Use this proxy locally or set it up in your development server. In production environments, set the _silent_ flag to forward unmodified response bodies. In any case, validation headers are set that allow to trace down violations to your OpenAPI definition.
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/resources/diagram-dark.png">
    <img src="docs/resources/diagram.png" alt="Proxy Diagram" width="770">
  </picture>
</p>

## Requirements

We run all tests with Node.js versions 10 and 12. Higher versions could possibly work but are not currently
supported.

## Installation

To install the CLI globally:

```npm install -g openapi-cop```

To install the package locally (inside an existing NPM package) and run the proxy programatically:

```npm install openapi-cop```

## Usage

There are three ways to run openapi-cop:

1. Start it with the CLI ([1](#cli-usage)).
2. Run it programatically inside Node.js ([2](#module-usage)).
3. Start a container based on the Docker image ([3](#docker-image-usage)).

### CLI Usage

The *openapi-cop* node package installs itself as an executable linked as `openapi-cop`. Run the command with
the `--help` flag to get information about the CLI:

```txt
Usage: openapi-cop [options]

Options:
  -s, --file <file>                       path to the OpenAPI definition file
  -h, --host <host>                       the host of the proxy server (default: "localhost")
  -p, --port <port>                       port number on which to run the proxy (default: 8888)
  -t, --target <target>                   full base path of the target API (format: http(s)://host:port/basePath)
  --default-forbid-additional-properties  disallow additional properties when not explicitly specified
  --silent                                do not send responses with validation errors, just set validation headers
  -w, --watch [watchLocation]             watch for changes in a file or directory (falls back to the OpenAPI file)
                                             and restart server accordingly
  -v, --verbose                           show verbose output
  -V, --version                           output the version number
  -h, --help                              output usage information
```

The proxy validates the requests and responses in the communication with a target server. By default, the proxy will
respond with a 500 status code when the validation fails.

<details><summary>Sample validation failure response</summary>

```json
{
  "error": {
    "message": "openapi-cop Proxy validation failed",
    "request": {
      "method": "POST",
      "path": "/pets",
      "headers": {
        "host": "localhost:8888",
        "user-agent": "curl/7.59.0",
        "accept": "*/*",
        "content-type": "application/json",
        "content-length": "16"
      },
      "query": {},
      "body": {
        "data": "sent"
      }
    },
    "response": {
      "statusCode": 201,
      "body": "{}",
      "headers": {
        "x-powered-by": "Express",
        "openapi-cop-openapi-file": "7-petstore.yaml",
        "content-type": "application/json; charset=utf-8",
        "content-length": "2",
        "etag": "W/\"2-vyGp6PvFo4RvsFtPoIWeCReyIC8\"",
        "date": "Thu, 25 Jul 2019 13:39:58 GMT",
        "connection": "close"
      },
      "request": {
        "uri": {
          "protocol": "http:",
          "slashes": true,
          "auth": null,
          "host": "localhost:8889",
          "port": "8889",
          "hostname": "localhost",
          "hash": null,
          "search": null,
          "query": null,
          "pathname": "/pets",
          "path": "/pets",
          "href": "http://localhost:8889/pets"
        },
        "method": "POST",
        "headers": {
          "host": "localhost:8888",
          "user-agent": "curl/7.59.0",
          "accept": "*/*",
          "content-type": "application/json",
          "content-length": "16",
          "accept-encoding": "gzip, deflate"
        }
      }
    },
    "validationResults": {
      "request": {
        "valid": true,
        "errors": null
      },
      "response": {
        "valid": false,
        "errors": [
          {
            "keyword": "required",
            "dataPath": "",
            "schemaPath": "#/required",
            "params": {
              "missingProperty": "code"
            },
            "message": "should have required property 'code'"
          }
        ]
      },
      "responseHeaders": {
        "valid": true,
        "errors": null
      }
    }
  }
}
```

</details>

Two headers are added to the response:

- `openapi-cop-validation-result`: contains the validation results as JSON.
  <details><summary>Interface</summary>

  ```ts
  {
      request: {
        valid: boolean;
        errors?: Ajv.ErrorObject[] | null;
      },
      response: {
        valid: boolean;
        errors?: Ajv.ErrorObject[] | null;
      },
      responseHeaders: {
        valid: boolean;
        errors?: Ajv.ErrorObject[] | null;
      }
  }
  ```

  </details>

- `openapi-cop-source-request`: contains a simplified version of the original request sent by the client as JSON.

  <details><summary>Interface</summary>

  ```ts
  {
    method: string;
    path: string;
    headers: {
      [key: string]: string | string[];
    };
    query?: {
      [key: string]: string | string[];
    } | string;
    body?: any;
  }
  ```

  </details>

See the references of [OpenAPI Backend](https://github.com/anttiviljami/openapi-backend/blob/main/DOCS.md)
and [Ajv](https://ajv.js.org/) for more information.

When the `--silent` is provided, the proxy will forward the server's response body without modification. In this case,
the validation headers are still added.

### Module Usage

To run the proxy programatically use `runProxy`, which returns a `Promise<http.Server>`:

```ts
import {runProxy} from 'openapi-cop';

const server = await runProxy({
  port: 8888,
  host: 'proxyhost',
  targetUrl: 'http://targethost:8989',
  apiDocPath: '/path/to/openapi-file.yaml',
  defaultForbidAdditionalProperties: false,
  silent: false
});
```

### Docker Image Usage

We publish a Docker image [lxlu/openapi-cop](https://hub.docker.com/r/lxlu/openapi-cop) that you can use for your
convenience. This means you can also run openapi-cop with
something like

```docker run --rm -p 8888:8888 --env TARGET=https://some-host-name:1234 --env FILE=some-openapi-document.json lxlu/openapi-cop```

Read more information about the usage [here](./docker/README.md).

## FAQ

<details>
  <summary>Can I use this in production?</summary>
  This tool was originally meant for development scenarios. You can use this in production but we cannot give you any security guarantees. Also running the JSON schema validation is quite CPU-expensive and you likely do not want to validate in both directions in production because of that overhead.
</details>

<details>
  <summary>Do I need this if I already generate my client from the OpenAPI?</summary>
  In case your client and server code is generated from the OpenAPI spec, you might still want to use this proxy. Generated code does usually only provide typing information, but JSON Schema defines much more than that. For example you might define a string property to match a given RegEx and start with the letter "C". This will not be ensured by your generated code at compile time, but will be caught by openapi-cop.
</details>

<details>
  <summary>Can I use this with other programming languages?</summary>
  Yes. This is a proxy and not a middleware. You can use it between whatever HTTP-endpoints you have in your architecture.
</details>

## Contributing

If you want to contribute to openapi-cop, be sure to check the [Contributing guidelines](CONTRIBUTING.md) and
the [Contributing](https://github.com/EXXETA/openapi-cop/wiki/Contributing) wiki page.

* * *

<br />

<h3 align="center">
  Made By
  <br />
  <a href="https://github.com/LexLuengas">Alexis</a> and <a href="https://github.com/pubkey">Daniel</a>
  <br />
  <br />
  at
  <br />
  <br />
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/resources/exxeta-logo_dark.svg">
    <img src="docs/resources/exxeta-logo.svg" alt="Exxeta" width="250">
  </picture>
  <br />
  <br />
  <a href="https://exxeta.com/">Join us now!</a>
</h3>

<br />
<br />
