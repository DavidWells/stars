---
repo: concordant/c-markdown-editor
url: 'https://github.com/concordant/c-markdown-editor'
homepage: 'https://concordant.io'
starredAt: '2022-11-04T22:20:20Z'
createdAt: '2021-02-23T16:49:13Z'
updatedAt: '2024-01-26T18:10:11Z'
language: TypeScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:13.005Z'
description: A CRDT based collaborative markdown editor.
tags:
  - concordant
  - conflict-free
  - crdt
  - crdt-implementations
  - crdts
  - replicated-data-types
---

# Concordant Markdown Editor

The Concordant markdown editor is a collaborative markdown editor React
component build on top of the MDEditor React component. This initial component
has become collaborative thanks to features provided by the Concordant
platform.

## Requirements (versions)

This project has been tested
on [Node.js](https://nodejs.org/en/download/) v14.15.0+
using NPM v6.14.8+.
It might work with older Node and NPM versions.

## Use as a React component

Install the package:

```shell
npm i @concordant/c-markdown-editor
```

Import the c-client and the component in your project:

```typescript
import { client } from "@concordant/c-client";
import CMDEd from "@concordant/c-markdown-editor";
```

Open a session and a collection (replace with your database name, the url of your c-service and credentials):

```typescript
let session = client.Session.Companion.connect(<dbName>, <serviceUrl>, <credentials>);
let collection = session.openCollection("mdeditor", false);
```

Use the Markdown Editor component:

```typescript
<CMDEd session={session} collection={collection} />
```

> You can provide the name of the document with docName parameter (optional).

## Standalone editor

A demo standalone application is included in the editor source repository.

### Install Project dependencies

Clone the Git repository, and run inside:

```shell
npm install
```

This will install all dependencies.

### Configuration

Some parameters are configurable and stored in the file `src/config.json`:

- _serverUrl_: is the url of the c-service that should be used;
- _dbName_: is the name of the database you want to store your content in.

### Run the application

Go to project root directory and:

```shell
npm start
```

This will run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

To make a production build with the updated configuration, run:

```shell
npm run build
```

This will build the app for production to the `build` folder. It correctly
bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes. Your app is ready
to be deployed!
