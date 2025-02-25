---
repo: bdombro/aws-serverless-fullstack
url: 'https://github.com/bdombro/aws-serverless-fullstack'
homepage: ''
starredAt: '2021-06-19T20:51:51Z'
createdAt: '2021-04-18T01:24:19Z'
updatedAt: '2021-09-16T00:57:18Z'
language: TypeScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:33.525Z'
description: >-
  A template to create a low-management, autoscaling NodeJS api + database on
  AWS.
tags: []
---

<h1> ☠️ AWS-SERVERLESS-FULLSTACK ☠️</h1>

...is a template to create a low-management, autoscaling NodeJS api + database on AWS

What makes it cool:

1. 100% serverless full-stack with Static frontend, NodeJS api and MySQL db
1. Easy deploy management with AWS SAM + Cloudformation
1. Run locally, AWS, or anywhere with generic file and db connectors
1. All Javascript/Typescript
1. Uses Fastify framework, which is mucho faster than Express
2. DB ORM and schema management via Typeorm
3. Type-strict

<h2> Table of Contents 🌍</h2>

- [Running locally 🏎](#running-locally-)
- [API ☁](#api-)
- [DB Schema Management 🗂](#db-schema-management-)
- [Deploying to AWS as Cloudformation Stack 🏁](#deploying-to-aws-as-cloudformation-stack-)
- [Known Issues 🐞](#known-issues-)
- [References and Special Thanks 😘](#references-and-special-thanks-)

## Running locally 🏎

To run locally, ensure you have docker running and node v14.

```bash
npm i
npm run db # Start the database in Docker as a daemon
npm run dev # Start the API on https://0.0.0.0:3000
```

## API ☁

<h4>GET /</h4>

Serves static website in src/html

```bash
curl https://0.0.0.0:3000
```

<h4>GET /api/dbtime</h4>

Gets the current time from DB

```bash
curl https://0.0.0.0:3000/api/dbtime
```

<h4>POST /files/:id</h4>

Uploads a file

```bash
curl -X POST https://0.0.0.0:3000/files/1234 --form file=@image.jpg
```

<h4>GET /files/:id</h4>

Returns a file

```bash
curl https://0.0.0.0:3000/files/1234
```

<h4>GET /files/:id/meta</h4>

Returns a file's metadata

```bash
curl https://0.0.0.0:3000/files/1234/meta -H 'accept: application/json'
```

<h4>POST /api/users</h4>

Creates a user

```bash
curl -X POST \
  --url https://0.0.0.0:3000/api/users \
  --header 'Content-Type: application/json' \
  --data '{
		"email": "editor3@example.com",
		"roles": [1],
		"givenName": "Sally",
		"surname": "Editor",
		"password": "Yousuck8"
	}'
```

<h4>GET /api/users</h4>

Gets users

```bash
curl https://0.0.0.0:3000/api/users
```

## DB Schema Management 🗂

You needs in the database change over time, and it's crazy error-prone to do it manually. Have you ever added a column to a dev environment just to forget to add it to production? This can easily take down your whole app. There must be a better way, right? Yes, thanks to "migration" tooling.

> A migration is just a single file with sql queries to update a database schema and apply new changes to an existing database.

Another part challenge/frustration for developers is avoiding mistakes when accessing the database. Instead of manually updating every SQL query string that may reference the column you just changes, wouldn't it be nice if your tooling did that automatically? That's where Object-Relational-Mappers (ORMs) help. ORMs allow your code to access the database without writing SQL strings.

> ORMs provide abstracted interfaces to the database, which allow you to describe the database schema in one place and have it apply globally.

|_Object_| A table in the database|
|_Relational_| A relationship between tables (i.e. Users have Blog Posts))|
|_Mapping_| Glue code that translates (aka _maps_) coding features to SQL query strings based on configuration (aka _model_)|

For example, this snippet models a user table, gets a user object from the database, update a column, then save it.

```typescript
@Entity()
export default class UserEntity extends BaseEntity {
	@PrimaryColumn('varchar', {length: 30})
	id: string

	@Column('varchar', {unique: true, length: 30}) 
	email: string

	@Column('varchar', {length: 30}) 
	name: string
}

const user = await UserEntity.findOne({ where: { email: 'foo@bar.com' } })
user.name = 'Shirley'
await user.save()
```

That code actually works, too! It and this project use an ORM called [TypeORM](typeorm.io). Additionally, TypeORM provides type-safety and schema migration tooling (!!!).

Thanks to TypeORM's Typescript features, `user.phone = '+1222222222'` will throw an error, because there is no phoneNumber field in the model.

> But whatabout migrations???

TypeORM has two workflows for database schema management: `synchronize` and `migration`.

|_synchronize_|TypeORM will immediately and greedily generate and apply SQL migrations on the fly. So if you changed the name of column in your code, TypeORM will drop the old column and create a new one, destroying any data that was in the old column.|
|_migration_|You manage the migrations in code, and they are ran automatically.|

The `synchronize` mode is more convenient, but is obviously too dangerous for a published application. Therefore, this application uses `synchronize` for local development and `migration` for production. __It's up to you as a developer to ensure that you create and test the needed migration files before you deploy(!)__. Luckily for you, TypeORM can to generate migration files for you, and these are usually good-enough.

To generate a migration file for what's currently in code vs. database:
```bash
npm run typeorm:migration-gen -- NameOfSnapshot
```

## Deploying to AWS as Cloudformation Stack 🏁

Deploy assumes you have already
- [set up an AWS account](http://docs.aws.amazon.com/AmazonSimpleDB/latest/DeveloperGuide/AboutAWSAccounts.html)
- have the latest version of the [AWS CLI](https://aws.amazon.com/cli/) installed
- have the latest version of the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) installed

1. Update the `samconfig.toml` file with your choices
1. Run `npm i` - this installs the node dependencies
1. Deploy to AWS using `sam build && sam deploy`
1. View your stacks online at [CloudFormation](https://console.aws.amazon.com/cloudformation/home), or open your API at the URL from the deploy output.

To delete your stack, run:
```bash
aws cloudformation delete-stack --stack-name (name of your stack) --region us-east-1
```

If your stack is tied to CloudFront, you can bust CloudFront caches by:
```bash
aws cloudfront list-distributions | grep Id
aws cloudfront create-invalidation --distribution-id <id> --paths "/static/*"
```

<h4>Connecting to a custom domain</h4>

1. If you haven't, [create an ACM certificate for your domain](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/). Even if your domain isn't in Route53, it's easy. You'll just need to add a DNS TXT record to your domain to confirm your ownership.
1. Add your custom domain to [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/main/publish/domain-names) and connect it to your lambda
1. Create a CloudFront app with your custom domain name that pulls from your API Gateway. CloudFront basically acts as a reverse proxy with caching.

## Known Issues 🐞

When configured to sleep, API calls may timeout (28s) before the database finishes waking up. To tolerate this, the web application needs to retry API calls that fail due to database failures. Here is the expected `503` response from the API on failure:

```json
{"message":"Service Unavailable"}
```


## References and Special Thanks 😘

- [Typeorm 3rd Party Docs](https://orkhan.gitbook.io/typeorm/)
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
- https://github.com/vendia/serverless-express
- https://github.com/claudiajs/claudia

