---
repo: fourTheorem/dsql-example
url: 'https://github.com/fourTheorem/dsql-example'
homepage: null
starredAt: '2025-06-29T22:03:36Z'
createdAt: '2025-06-23T13:16:07Z'
updatedAt: '2025-06-29T22:03:37Z'
language: TypeScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:53.124Z'
description: null
tags: []
---

# DSQL Example

An example API backend using Amazon Aurora DSQL ✨.

This repo provides everything you need to deploy and load-test an API using a Amazon DSQL PostgreSQL backend.

<!-- toc -->

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)
- [Creating the Database Schema](#creating-the-database-schema)
- [OpenAPI specification](#openapi-specification)
- [Running a Load Test](#running-a-load-test)
- [Exploring the Database using `psql`](#exploring-the-database-using-psql)
- [Exploring Costs 💰](#exploring-costs-%F0%9F%92%B0)
- [Running the API locally](#running-the-api-locally)

<!-- tocstop -->

## Features

- [Fastify](https://fastify.dev/) API backend using AWS Lambda and [Drizzle ORM](https://drizzle.team)
- API Gateway REST API
- OpenAPI specification
- Load test script
- CDK Infrastructure

## Prerequisites

- A recent [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) version that supports DSQL (`aws dsql`).
- Node.js 22 or later
- (Optional) - A PostgreSQL `psql` client - https://www.postgresql.org/download/.

## Deployment

The CDK application provides two stacks:

- [DsqlExampleStack](./cdk/stacks/dsql-example-stack.ts) - provisions the DSQL cluster
- [ApplicationStack](./cdk/stacks/application-stack.ts) - provisions the API and Lambda backend

```shell
cd cdk
npm install
npx cdk deploy --all
```

The application should deploy and print the **stack outputs**, including `ApplicationStack.apiEndpoint`.
Set this to `BASE_URL` in your shell environment. We'll use it later when you run load tests!

```shell
export BASE_URL=https://<REST_API_ID>.execute-api.<REGION>.amazonaws.com/prod
```

## Creating the Database Schema

To create the database schema, we are going to use [Drizzle Kit](https://orm.drizzle.team/docs/kit-overview).
DSQL does not support the `SERIAL` data type used for incremental Drizzle migrations, so we'll just use the `push` command to create the entire schema.

```shell
npm install
cd packages/db

# Set the PostgreSQL connection string
export DATABASE_URL=$(npx tsx ./packages/cli/cli.ts)

npx drizzle-kit push
```

## OpenAPI specification

You can access the API specification at `${BASE_URL}/openapi.json`.

The API provides CRUD endpoints for lists of items.
Each resource is very simple, containing just an ID (UUID v4) and a name.

Explore it with the Redocly CLI like this:

```shell
npx @redocly/cli preview-docs ${BASE_URL}/openapi.json
```

## Running a Load Test

An excellent way of generating API load is using [k6](https://k6.io/).
You will need to follow the instructions to install `k6` locally.
Once that's done, you can run the default load test which simulates 100 virtual users (VUs) over a period of one minute.

✋ Make sure you have set `DATABASE_URL` in your shell as we mentioned above.

```shell
k6 run ./test/load/full-api-test.js
```


If you are feeling more ambitious and don't mind spending a bit more on Lambda, API Gateway, Data Transfer, X-Ray or DSQL cost, you can increase the number of virtual users like this.

1,000 virtual users over two minutes:
```shell
k6 run ./test/load/full-api-test.js --vus 1000 --duration 2m
```

## Exploring the Database using `psql`

One option to connect to your database is to use AWS Cloudshell. For instructions on how to do this, and other connection examples, see https://docs.aws.amazon.com/aurora-dsql/latest/userguide/getting-started.html.

A helper script used by CloudShell is also provided here so you can connect using `psql`. It uses the AWS CLI to generate an IAM auth token for your connection.

```shell
./bin/dsql-connect --hostname DSQL_HOST --region eu-west-1 --database postgres --username admin
```
You'll need to replace `DSQL_HOST` with your cluster endpoint address. This is printed as a CloudFormation output (`DsqlExampleStack.endpoint`) when you run `cdk deploy` as instructed above.

## Exploring Costs 💰

Thanks to [Alessandro Volpicella's Amazon Aurora DSQL Pricing Guide](https://awsfundamentals.com/blog/amazon-dsql-pricing-guide), we discovered a handy script for
calculating cost based on DSQL usage, we discovered [Marc Bowes' guide and script](https://marc-bowes.com/dsql-how-to-spend-a-dollar.html) which we include [here](./fetch_dpus.sh).

```shell
./fetch_dpus.sh <DSQL_CLUSTER_ID>
```

## Running the API locally

If you want to dive deeper into this architecture, make changes and iterate quickly, you can run the API locally.

You can either run your local API against DSQL or a local PostgreSQL
by setting `DB_ENDPOINT` to `localhost` or your cluster endpoint domain name.

```sh
npx tsx ./packages/api/api.ts
```
