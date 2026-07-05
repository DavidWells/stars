---
repo: newjersey/navigator.business.nj.gov
url: 'https://github.com/newjersey/navigator.business.nj.gov'
homepage: 'https://business.nj.gov'
starredAt: '2025-02-25T22:21:32Z'
createdAt: '2018-12-21T22:28:09Z'
updatedAt: '2025-02-25T22:21:33Z'
language: TypeScript
license: NA
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T22:23:53.256Z'
description: >-
  NJ Office of Innovation is building a one-stop dashboard to better help New
  Jerseyans with starting and managing a business
tags: []
---

# navigator.business.nj.gov

This is the development repository for the work-in-progress business navigator
from the New Jersey Office of Innovation. For info on the existing
[Business.NJ.gov](https://business.nj.gov) site, please see the
[bottom of this document](https://github.com/newjersey/navigator.business.nj.gov#businessnjgov).

[![CircleCI build status](https://circleci.com/gh/newjersey/navigator.business.nj.gov/tree/main.svg?style=svg)](https://circleci.com/gh/newjersey/navigator.business.nj.gov/tree/main)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Architecture

Everything is written in **TypeScript** and runs on **Node.js**.

The frontend is **React** via **Next.js** and deployed in **Docker containers**
on an **AWS Elastic Container Service** cluster.

The backend is an **Express** app deployed as an **AWS Lambda** function using
**Serverless Framework**. It connects to an **AWS DynamoDB** instance that is
also configured through **Terraform**.

The app uses **AWS Cognito** (through **AWS Amplify**) to handle authentication
for registered users. Unregistered users are able to browse the site in guest
mode without saving their data to the DynamoDB database.

We deploy using
**[CircleCI](https://app.circleci.com/pipelines/github/newjersey/navigator.business.nj.gov)**
for CI/CD.

## Development

You will need Node.js (with Yarn installed via `npm` or `corepack`) installed
for primary development. Additionally, for running the server in local
development mode, you will need a Java runtime (for `serverless-dynamodb`) and
Python (for the AWS CLI and some of our scripts) installed (details below).

We recommend using WSL2 if developing on Windows.

For pair programming, we recommend Visual Studio Code with the Live Share
extension.

### Software requirements

- [Node.js 20.18.1 "Iron" LTS](https://nodejs.org/en/download/) (We recommend using
  [nvm](https://github.com/nvm-sh/nvm#readme) for managing Node.js versions. If
  installing via package manager, we suggest installing `corepack` if available
  separately.)
- [AWS CLI](https://aws.amazon.com/cli/)
- [JRE/JDK 17.x or newer](https://jdk.java.net/)
- [Python 3.13](https://www.python.org/downloads/)
- [yarn](https://yarnpkg.com/)
- [wget](https://www.gnu.org/software/wget/)

**Windows (non-WSL) only**:

- [Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)
  using "Visual C++ build tools" workload

### Pre-flight

You will then setup your AWS credentials:

```shell
aws configure
```

Clone the code and navigate to the root of this repository. There is an install
script that will install all `yarn` packages for both the frontend and backend.
It will also set up serverless's local DynamoDB.

```shell
./scripts/install.sh
```

### Local env

Before you can run locally, you will need to:

- create a `./web/.env` that includes all the values laid out in the
  `./web/.env-template` file.
- create a `./api/.env` that includes all the values laid out in the
  `./api/.env-template` file.
- create a `.venv` virtual environment and install requirements if working on
  Python
  ```shell
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  ```
- do an initial build
  ```shell
  yarn build
  ```

### Run tests

We use Jest for our TypeScript-based unit tests across our projects. Run all
tests with:

```shell
yarn test
```

We use Cypress for end-to-end (e2e) testing. You can run these tests locally
as follows. Since some Cypress tests only run in the CI environment, they require
running a local instance of the application to test against.

```shell
./scripts/local-feature-tests.sh
```

To run all tests with code coverage:

```shell
yarn test:coverage
```

We use Python's `unittest` for our Python tests. Run all Python unit tests with:

```shell
yarn test:python
```

### Running locally

Start the services:

```shell
yarn start:dev
```

#### Troubleshooting

If you get an error from serverless that looks like
`Inaccessible host: localhost at port 8000`, this is likely a permissions error.
To solve, grant the `./api/.dynamodb` folder write permissions on your machine.

### Deploying

Use `ship-it` to run prettier, linting, and tests before pushing:

```shell
./scripts/ship-it.sh
```

The CircleCI CI/CD (which is configured in `.circleci/config.yml`) will pick up
the job and deploy to the development environment for commits to the main
branch.

## Frontend deep-dive

The frontend code lives in `./web`.

When running locally, the `./scripts/start-web.sh` will execute `npm run dev`
for local hot-refreshing of Next.js. In production, we run `npm run build` which
will execute `next build` and `next export`. This allows Next.js to build all
our pages and pre-render what it can. The export puts the final files in
`./web/out` directory, which is served via a Docker Container.

### Styles

We depend on the compiled version of
[NJ Web Design Standards](https://github.com/newjersey/njwds), which is included
via `npm` and then imports these styles into our code (which is configured via a
line in `_app.tsx`).

### Environment variables

For Next.js, environment variables are inserted at build time. In
`./web/next.config.js`, the environment variables that the code will have access
to are set up for the Next.js framework by pulling them in from the `.env` file.
This works because the system that is building the Next.js code (via CircleCI
workflow) has access to these variables via environment variables set during
that build step.

**Important**: This means that any time you build the app, the system building
it (your local terminal, for example) needs to have these environment variables
set as well, or else they will not get set for the build app.

For Jest testing, the value that will be used for the environment variables is
set in `./web/setupTests.js`.

For running (and testing) the app locally in development mode, it needs
environment variables locally as well. These should be provided via a
`./web/.env` file which should _never_ be checked into source control. There
exists a file `./web/.env-template` which provides a blank template to show what
variables should be included. This _is_ checked into source control and should
be updated any time new frontend variables are added.

### Roadmaps

In the `./content/src/roadmaps` directory, we have JSON files containing the
static content defining tasks and steps for different roadmaps. Each industry
has its own roadmap definition, located in `./content/src/roadmaps/industries`.

### Authentication

Amazon Cognito has a way of tightly coupling itself to code dependencies, which
is not great. It's somewhat isolated right now:

- `/signin` page uses the AWS Cognito components to render a sign-in page.
- `AuthButton` makes use of Cognito's sign-out feature
- `sessionHelper' is a wrapper around most Cognito Auth features.

For the rest of the app, we use our domain representation of authentication to
abstract Cognito away from this:

- `AuthContext` provides the current user state to any component that requires
  it, and is the canonical representation of whether the app is signed-in or
  signed-out.
- `signinHelper` is an abstraction of the business logic for what happens when a
  user signs in (redirects, etc) and should be triggered after auth actions
  regardless of authentication provider.

We also configure Cognito authentication programmatically in the Cypress
`loginByCognitoApi` command.

### useSWR

We use the [useSWR](https://swr.vercel.app/) hook for handling userData fetching
from the API. This is nice because it has a built-in caching and revalidating
system that fetches data when it needs to, and serves cached data when we don't
need new data. It acts as a form of state management for React, and any
component that needs to access or update the `userData` state from storage
should make use of the `useUserData` wrapper around this hook.

## Backend deep-dive

The backend code lives in `./api`. It uses
[Serverless Framework](https://www.serverless.com/) for handling the integration
with AWS Lambdas.

We use Serverless Framework to deploy the backend app. If you do this locally,
your local `serverless` CLI needs to be configured with AWS credentials.

Locally, it uses `serverless-offline` and `serverless-dynamodb` to run and
simulate the AWS environment. Everything AWS and serverless is configured in
`./api/serverless.ts`.

The backend app itself is defined in `src/functions/migrate.ts` and is mostly a
regular Express app, except it wraps its export in `serverless` to become a
handler. Then, `src/functions/index.ts` defines the config structure that
proxies all routes through to be handled by the Express routing system.

The rest of the code is regular hexagonal Express structure. The `src/api`
folder contains route definitions and depends on abstractions and types defined
in `src/domain`. The `src/db` folder contains the DynamoDB-specific logical
implementation of the interfaces in the domain. The top-level Express app is
responsible for wiring the DynamoDB implementation into the router or anything
that has a database dependency. We use
[jest-dynalite](https://github.com/freshollie/jest-dynalite) as a testing helper
to mock out DynamoDB for testing.

### Database schema and migrations

DynamoDB isn't strongly schema'd, but we do expect objects of a certain
structure to be returned to the frontend when we request user data. Sometimes
we'll be changing the data structure and we need the database to be able to
account for and understand this.

We solve this by using **document versioning** and running **migrations** on
individual documents as we retrieve them from storage. The documents are stored
with a schema version number (which is stripped before sending to the frontend).
On a `GET` request for a document, if its version is out-of-date with the most
recent, we run a series of migrations on it to map the data to the current
structure. We then save that new document in the current version, and return it
to the frontend.

Reasons for this approach:

- zero-downtime for the database anytime we change document schema
- managed only in code, no need to handle AWS lambdas and streams to make a
  migration happen

Notes about this approach:

- in the database itself, various documents will be structured differently, as
  they will only be migrated when they are accessed. This isn't a concern if the
  documents are only ever accessed through the DB client layer, which performs
  the migrations as it accesses them

#### Adding a new migration

If you want to change the structure of the `UserData` object, there is a helper script
that creates and updates most of the relevant code at `./scripts/generate-new-migration.sh`.
It takes the following actions:

1. **Creates a new file** in `./api/src/db/migrations` and names it
   `v{X}_{migration_description}.ts` where `{X}` is replaced by the next
   successive version and `{migration_description}` is a snake-cased name
   describing the data being changed in the migration. The`{migration_description}`
   is prompted by the script and input by the user when running `generate-new-migration.sh`.

2. **Creates a new type** in the file and names it `v{X}UserData`, which defines the
   new structure of your new `UserData` type.

3. **Creates a migration function** in the file with type signature
   `(v{X-1}UserData) => v{X}UserData`, which defines the way that the
   previous version of the object should be mapped to the new structure.

   - **Note:** `generate-new-migration.sh` currently just copies the previous migration function.
     _You must write your own updated migration function_. You should also test it to verify transformations
     are executed properly.

4. **Adds the migration function to the list** of functions in
   `./api/src/db/migrations/migrations.ts`. This array should be ordered by ascending version number.

5. **Changes the types** in `types.ts` for `UserData` (and `factories` and
   anywhere else needed) to reflect the newest version of the type to the rest
   of the code.

## Ports

| service            | local dev & CI feature tests | local feature tests | unit tests |
| ------------------ | ---------------------------- | ------------------- | ---------- |
| Next.js frontend   | 3000                         | 3001                |            |
| Serverless backend | 5002                         | 5001                |            |
| DynamoDB           | 8000                         | 8001                |            |
| Lambda port        | 5050                         | 5051                |            |
| Dynalite local     |                              |                     | 8002       |

## Business.NJ.gov

[Business.NJ.gov](https://business.nj.gov) is being developed by the
[New Jersey State Office of Innovation](https://innovation.nj.gov),
[New Jersey Department of State's Business Action Center](https://nj.gov/state/bac/),
and the [New Jersey Economic Development Authority](https://www.njeda.gov) with
support from departments and agencies across the State.

This site and the Governor's _Business First Stop_ initiative are intended to
simplify and streamline access to the information, resources, and services that
aspiring entrepreneurs and business owners need to start, operate, and grow
their business in the Garden State.

We are launching Business.NJ.gov in beta and using real-time user input to
iteratively improve the site and services. The site is also being developed with
the support and input of business communities throughout the state.

### Built as open source

Business.NJ.gov is an open source project that is meant to serve as a base for
anyone who is looking to create an online resource for their own business
community. You can find full license details at
[Business.NJ.gov/license](https://business.nj.gov/license).

### Launch a copy of the website

We manage the website through Webflow. To launch your own copy of the site,
visit the Webflow showcase and click "Open in Webflow":
https://webflow.com/website/State-of-NJ-Business-One-Stop

### Repositories and code

A static export of the Business.NJ.gov website source code can be found at the
[NewJersey/open-business-portal Github Repository](https://github.com/newjersey/open-business-portal).

### Thank you

Business.NJ.gov is made possible by building on the work and creativity of the
Cities of San Francisco and Los Angeles as well as their technology partners,
whose Business Portal content and code base served as a foundation for the site.

### Suggestions, feedback, and contributions

Please reach out or leave feedback for us at
[Business.NJ.gov/feedback](https://business.nj.gov/feedback). You can also open
a GitHub pull request or issue. If you want to get in touch with the Office of
Innovation team, please email us at
[team@innovation.nj.gov](mailto:team@innovation.nj.gov).

### Join the Office of Innovation!

If you are excited to design and deliver modern policies and services to improve
the lives of all New Jerseyans, you should
[join us](https://innovation.nj.gov/join.html)!
