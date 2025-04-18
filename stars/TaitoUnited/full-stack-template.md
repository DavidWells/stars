---
repo: TaitoUnited/full-stack-template
url: 'https://github.com/TaitoUnited/full-stack-template'
homepage: 'https://taitounited.github.io/taito-cli/templates'
starredAt: '2021-09-24T21:48:24Z'
createdAt: '2017-08-12T14:24:12Z'
updatedAt: '2025-01-29T13:23:46Z'
language: TypeScript
license: MIT
branch: dev
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:45.042Z'
description: >-
  Template for cloud-native applications and microservices running as
  containers/functions on Kubernetes, Docker Compose, or cloud. You can choose
  the stack during project creation.
tags:
  - cloud-native
  - full-stack
  - kubernetes
  - nodejs
  - postgres
  - react
  - serverless
  - taito-template
  - template
---

> This page contains a short summary of the project itself, aimed mostly for developers. See [Wiki page of the project](docs/README.md) for more extensive resources, [DEVELOPMENT.md](scripts/taito/DEVELOPMENT.md) for common development conventions, and [CONFIGURATION.md](scripts/taito/CONFIGURATION.md) for common configuration conventions.

[//]: # "TEMPLATE NOTE START"

# full-stack-template

Template for cloud-native applications and microservices running on Kubernetes, Docker Compose, serverless (FaaS), or virtual machine. The template can be used with both public cloud and on-premise private cloud. DevOps is the main focus of this template, and thus, you can freely change the implementation that is running inside the containers. The example implementation is based on React, Node.js, PostgreSQL, and S3 compatible storage, but you can choose the stack during project creation from multiple alternatives, or just write the implementation from scratch.

You can create a new project from this template by running `taito project create full-stack-template`. Later you can upgrade your project to the latest version of the template by running `taito project upgrade`. To ensure flawless upgrade, do not modify files that have a **do-not-modify** note in them as they are designed to be reusable and easily configurable for various needs. In such case, improve the original files of the template instead, and then upgrade. See [Taito CLI](https://taitounited.github.io/taito-cli/) for more information.

You can also migrate an existing project that does not currently use Taito CLI by running `taito project migrate full-stack-template` in your project root folder.

You can use either monorepo or multirepo approach with this template. If you are going for multirepo, just create a separate project for each microservice based on this project template, and define common `taito_namespace` in scripts/taito/project.sh if you want them to share the same namespace. You can also place environment descriptions in a separate repository (see [CONFIGURATION.md](scripts/taito/CONFIGURATION.md#environment-descriptions-in-a-separate-repository)).

[//]: # "TEMPLATE NOTE END"

# Project title

Short description of the project: vision, purpose, company, etc.

Table of contents:

- [Links](#links)
- [Usage](#usage)
- [Manually configured settings](#manually-configured-settings)
- [Conventions](#conventions)
- [Architecture Overview](#architecture-overview)
- [Security](#security)

## Links

> Note: some general project links are to be found on the [Wiki page](docs/README.md) of the project.

Non-production basic auth credentials: `USERNAME` / `PASSWORD`

[//]: # "GENERATED LINKS START"

LINKS WILL BE GENERATED HERE

[//]: # "GENERATED LINKS END"

> You can update this section by configuring links in `scripts/taito/project.sh` and running `taito project generate`.

## Usage

> Some notes about testing and usage either here or in a separate document.

## Manually configured settings

> Try to keep all configurations in version control. However, if you have configured something manually, describe manually configured settings here.

## Conventions

> TODO: Project-specific conventions. E.g.: Git commit message conventions, naming conventions, pull request conventions, etc.

We are using [Taito version control conventions](https://taitounited.github.io/taito-cli/tutorial/03-version-control) for commit messages.

Pull requests should be reviewed by at least one other developer before merging, ideally by the main developer. The developer who created the pull request should merge it once it has been approved.

Each pull request should come with:

- A description of the changes
- Photos or videos of the changes (if useful)
- A link to the issue it is related to (if any)
- A link to the design (if any)
- Documentation changes related to the changes (if any)
- Tests related to the changes (if any)

## Architecture Overview

DIAGRAM: You can use [Gravizo](https://www.gravizo.com) for making a architecture diagram if the diagram does not contain any confidential information. Note that architecture diagram is not mandatory if the architecture is very simple.

### Integrations

- Client uses Google Maps
- Server uses system X for authorization (OAUTH)
- Server fetches products from system Y (REST/json)
- Server sends email using Sendgrid (REST/json)

### Processes

Only non-trivial processes need to be described here (e.g. scheduled batch processing), though it might be a good idea to describe one or two basic scenarios also. Architecture is the main focus here. User stories should be documented elsewhere (e.g. wiki).

#### Basic Scenario

1. User performs action on UI
2. Server authorizes action by system X
3. Server reads/updates database
4. Server returns value

#### Product Snapshots

1. User performs action on UI
2. Server adds message to queue
3. ...
4. ...
5. Server sends email

#### Scheduled Jobs

- ...
- ...

## Security

> Add security details either here or in a separate document. See the [security](https://taitounited.github.io/taito-cli/tutorial/d-security/) appendix of the [Taito CLI tutorial](https://taitounited.github.io/taito-cli/tutorial).
