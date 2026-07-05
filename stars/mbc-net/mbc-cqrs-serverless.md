---
repo: mbc-net/mbc-cqrs-serverless
url: 'https://github.com/mbc-net/mbc-cqrs-serverless'
homepage: ''
starredAt: '2025-08-25T19:05:51Z'
createdAt: '2023-12-21T07:49:42Z'
updatedAt: '2025-10-15T12:55:32Z'
language: TypeScript
license: MIT
branch: develop
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-10-18T22:29:48.664Z'
description: 'serverless applications with CQRS on AWS, NestJS and local development'
tags:
  - aws
  - cqrs
  - event-driven
  - framework
  - localdevelopment
  - nestjs
  - serverless
  - typescript
---

![MBC CQRS serverless framework](https://mbc-cqrs-serverless.mbc-net.com/img/mbc-cqrs-serverless.png)

# MBC CQRS serverless framework

Unleash the power of scalable, resilient serverless applications with CQRS on AWS, the magic of NestJS and the convenience of local development workflows! ✨

## Overview

This package provides core functionalities for implementing the Command Query Responsibility Segregation (CQRS) pattern within AWS serverless architectures, powered by the incredible NestJS framework. It simplifies the development of highly scalable and decoupled systems that can handle complex business logic and high-volume data processing.

## Documentation

Visit https://mbc-cqrs-serverless.mbc-net.com/ to view the full documentation.

## Features

- **CQRS framework for AWS serverless**:
  - Structured approach for separating commands and queries
  - Integration with AWS services like Cognito, API Gateway, Lambda, DynamoDB, SNS, and SQS, StepFuction, RDS ⚡
- **Event-driven architecture**:
  - Leverages event sourcing and messaging for asynchronous communication
  - Enables loose coupling and independent scaling of components
- **Command and query handlers**:
  - Provides abstractions for handling commands and queries
  - Facilitates business logic implementation and data persistence
- **Asynchronous communication**:
  - Supports event publishing and message passing for inter-component communication
- **Data consistency and integrity**:
  - Ensures data consistency through event sourcing and optimistic locking
  - Enforces data integrity with validation and constraints
- **Experience a harmonious symphony of CQRS and NestJS:**
  - **Modular structure**: Organize CQRS components with NestJS's elegant modularity
  - **Dependency injection**: Simplify dependency management and embrace loose coupling with NestJS's DI system
  - **TypeScript support**: Write type-safe, crystal-clear code with built-in TypeScript
  - **Testing and error handling**: Build confidence with comprehensive testing and robust error handling, courtesy of NestJS
  - **Ecosystem compatibility**: Tap into the vast NestJS universe of modules and libraries to expand possibilities

## Local Development Symphony

- **Embrace agility**: Experience rapid iteration and experimentation in a local environment, without the need for constant cloud deployment.
- **Debugging bliss**: Debug with ease using your favorite tools and techniques, gaining deeper insights into your application's behavior.
- **Cost-effective exploration**: Explore and refine your CQRS implementation locally, without incurring AWS costs during development.

## Installation

### Latest Stable Release
```bash
$ npm i -g @mbc-cqrs-serverless/cli
```

### Beta Release
```bash
$ npm i -g @mbc-cqrs-serverless/cli@beta
```

### Specific Version
```bash
$ npm i -g @mbc-cqrs-serverless/cli@1.0.0
```

## Usage

- Create a new application

```bash
$ mbc new YOUR_PROJECT_NAME
```

## Examples

- [Check here](https://github.com/mbc-net/mbc-cqrs-serveless-samples)

## Architecture

- TODO

## Development & Release Process

### Branch Strategy
- `develop`: Development branch for new features and bug fixes
- `beta`: Beta releases for testing and validation
- `main`: Stable production releases

### Release Workflow

#### 1. Beta Release
```bash
# Merge develop to beta
git checkout beta
git merge develop

# Create beta tag
git tag v1.0.0-beta.1
git push origin --tags
```

#### 2. Production Release
```bash
# Merge beta to main
git checkout main
git merge beta

# Create release tag
git tag v1.0.0
git push origin --tags
```

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- `v1.0.0` - Production release
- `v1.0.0-beta.1` - Beta release
- `v1.0.0-alpha.1` - Alpha release

### Automated Publishing
GitHub Actions automatically publishes packages to npm when tags are pushed:
- Beta tags (`*-beta.*`) → `npm publish --tag beta`
- Release tags (`v*.*.*`) → `npm publish --tag latest`

## How to guide

- Japanese: https://www.mbc-net.com/tag/mbc-cqrs-serverless/

## Contributing

We welcome contributions! Please follow our development workflow:

### Development Setup
1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Write tests and ensure they pass
5. Submit a pull request to `develop`

### Adding New Packages
```bash
$ npm init --scope mbc-cqrs-serverless -w ./packages/{PACKAGE_NAME}
```

### Build and Test
```bash
# Build all packages
$ npm run build

# Run tests
$ npm test

# Run linting
$ npm run lint
```

### Release Process
- Releases are automated via GitHub Actions
- Manual publishing (for maintainers only):
```bash
$ npm run release
```

### Pull Request Guidelines
- Target the `develop` branch
- Include tests for new features
- Follow existing code style
- Update documentation as needed
- Ensure CI checks pass

## References

- Lerna: https://lerna.js.org/docs/introduction
- NPM workspace: https://docs.npmjs.com/cli/v7/using-npm/workspaces
- Nestjs: https://docs.nestjs.com/
- Serverless framework: https://www.serverless.com/framework/docs

## License

Copyright &copy; 2024, Murakami Business Consulting, Inc. https://www.mbc-net.com/  
This project and sub projects are under the MIT License.
