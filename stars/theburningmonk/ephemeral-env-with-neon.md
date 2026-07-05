---
repo: theburningmonk/ephemeral-env-with-neon
url: 'https://github.com/theburningmonk/ephemeral-env-with-neon'
homepage: null
starredAt: '2025-05-03T00:35:45Z'
createdAt: '2025-04-02T17:21:24Z'
updatedAt: '2025-05-03T00:35:45Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-03T22:30:41.251Z'
description: How to use Neon Serverless Postgres for ephemeral environments
tags: []
---

# Serverless TODO API

A serverless TODO API built with the Serverless Framework, Node.js, and DynamoDB.

## Features

- Create, read, update, and delete todos
- DynamoDB for data storage
- Local development support with serverless-offline
- Comprehensive test coverage with Vitest

## Prerequisites

- Node.js 20.x
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Deploy the application:
```bash
npm run deploy
```

## Local Development

1. Start the local server:
```bash
npx serverless offline
```

2. The API will be available at `http://localhost:3000`

## API Endpoints

- `POST /todos` - Create a new todo
- `GET /todos` - Get all todos
- `GET /todos/{id}` - Get a specific todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
.
├── src/
│   ├── handlers/         # Lambda function handlers
│   │   └── __tests__/   # Handler tests
│   └── utils/           # Utility functions
├── serverless.yml       # Serverless Framework configuration
├── vitest.config.js     # Vitest configuration
└── package.json         # Project dependencies
```
