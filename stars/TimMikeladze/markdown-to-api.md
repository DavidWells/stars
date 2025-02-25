---
repo: TimMikeladze/markdown-to-api
url: 'https://github.com/TimMikeladze/markdown-to-api'
homepage: 'https://markdown-to-api-example.vercel.app'
starredAt: '2025-02-05T04:53:27Z'
createdAt: '2022-08-12T23:39:33Z'
updatedAt: '2025-02-06T06:33:21Z'
language: TypeScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:08.484Z'
description: "\U0001F4D1 Generates a minisearch powered GraphQL API from a directory of markdown files. Additional metadata like tags or descriptions can be added to the files in the form of YAML front matter, which will then be indexed and available to search by."
tags:
  - graphql
  - markdown
  - markdown-api
  - markdown-graphql
  - nextjs
  - static-site-generator
---

# Markdown To API

This package generates a GraphQL API from a directory of Markdown files. Additional metadata like tags, descriptions, or custom fields can be added to the Markdown files in the form of YAML front matter, a simple schema at the top of each file. These fields will be indexed and available to query and filter by in the GraphQL API.

## Installation

```shell
npm install markdown-to-api --save
# or
yarn add markdown-to-api
# or
pnpm add markdown-to-api
```

## Example

This [example repository](https://github.com/TimMikeladze/markdown-to-api-example) shows how `markdown-to-api` is used in conjunction with NextJS's Static Generation and Server-side Rendering features to create a searchable site with all the content residing in markdown files. The deployed example can be seen at [https://markdown-to-api-example.vercel.app](https://markdown-to-api-example.vercel.app).

## Usage

### Initialize

```typescript
import { MarkdownAPI } from 'markdown-to-api'

const mdapi = new MarkdownAPI({
  directory: `./markdown`,
  // In development mode a minisearch index file will be generated.
  writeIndex: process.env.NODE_ENV !== 'production',
  // In production mode, if a minisearch index file is found, it will be used.
  useIndex: process.env.NODE_ENV === 'production',
  // This field is optional, but if provided minisearch will be instantiated with these options. See [minisearch](https://github.com/lucaong/minisearch) to learn more. This is helpful to adjust how your files are indexed and searched.
  miniSearchOptions: {},
});
```

### Content and Configuration

#### Markdown files

Each markdown file can contain an optional YAML front matter schema.

Below is markdown file showcasing such a schema.

```markdown
---
title: About Tigers
description: The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera.
tags:
- cat
- tiger
genus: Panthera
---

# About Tigers

The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera.

It is most recognisable for its dark vertical stripes on orange fur with a white underside. An apex predator, it primarily preys on ungulates, such as deer and wild boar.

```

The following keys are special in the context of `markdown-to-api`. They will be indexed and available to query and filter by in the generated API.

- `id`: A unique identifier for the markdown file. (Optional, if not provided it will be generated based off of the file path and title.)
- `title`: The title of the markdown file. (Optional, will be generated from the filename if not provided.)
- `description`: The description of the markdown file. (Optional)
- `tags`: An array of tag ids for the markdown file. (Optional). If a `config.yml` file exists than these tag ids must correspond to the tags defined in `config.yml`
- `createdAt`: An ISO 8601 formatted date string. (Optional)

#### Config file

In the root of the directory where the markdown files are located, a `config.yml` file can be used to define tags and other metadata such as making certain fields required.

In the example below we define a list of tags pertaining to felines, make the `tags` field required and define a new field `genus` marked as required. Now each markdown file we define must include `tags` field and a `genus` field.

```yaml
tags:
  cat:
    description: Fits into any box.
  puma:
    name: cougar / puma
    description: Puma is a large cat, also known as a mountain lion.
  tiger:
    description: Tiger is a very large cat.
  lion:
    description: Lions have manes.
fields:
  tags:
    required: true
  genus:
    required: true
```

### CLI

`markdown-to-api` generates an `index.json` file used for searching through the markdown files. During development this file will be generated automatically, however when running via CI/CD or as part of your build process it is useful to generate this file via a script.

```shell
node node_modules/markdown-to-api/dist/cli.mjs -d markdown
```

This command can be added to the `scripts` section of your `package.json` file. See the [example repository](https://github.com/TimMikeladze/markdown-to-api-example) to see how this works in action.


### Searching

```typescript
// Search all files for the term `cat`.
mdapi.getIndex().search('tiger');

// Search only tags field for the term `tiger`.
mdapi.getIndex().search('tiger', { fields: ['tags'] });
```

Additional options can be passed to the search method. This is an options object which is passed to [minisearch](https://github.com/lucaong/minisearch).

### GraphQL API

### GraphQL Module

A GraphQL Module is included in this package which encapsulates the schema and resolvers provided by `markdown-to-api`. The example below shows how you can instantiate a new module which can then be consumed by your GraphQL server of choice.

```typescript
import { createApplication } from 'graphql-modules';
import createMarkdownAPIModule } from 'markdown-to-api';

const markdownAPIModule = createMarkdownAPIModule({
  directory: `./markdown`,
  // In development mode a minisearch index file will be generated.
  writeIndex: process.env.NODE_ENV !== 'production',
  // In production mode, if a minisearch index file is found, it will be used.
  useIndex: process.env.NODE_ENV === 'production',
});

const app = createApplication({
  modules: [markdownAPIModule],
});
```

#### Example queries

```graphql
query SearchMarkdownFiles {
  searchMarkdownFiles(text: "tigers") {
    count
    results {
      id
      title
      description
      createdAt
      tags {
        id
        name
        description
      }
      markdownFile {
        content
      }
    }
  }
}
```

```graphql
query SearchTags {
  searchMarkdownFiles(text: "lion", options: { fields: ["tags"] }) {
    count
    results {
      id
      title
      description
      createdAt
      tags {
        id
        name
        description
      }
      markdownFile {
         content
      }
    }
  }
}
```

```graphql
query AllFilesAndTags {
  countMarkdownFiles
  markdownFiles {
    id
    title
    content
    tags {
      id
      name
      description
    }
  }
  markdownFileTags {
    id
    name
    description
  }
}

```

#### Generate schema

```graphql
type Query {
  countMarkdownFiles: Int
  markdownFile(id: ID!): MarkdownFile!
  markdownFiles(direction: MarkdownFilesSortDirection, limit: Int, offset: Int): [MarkdownFile!]!
  searchMarkdownFiles(text: String!, options: MarkdownFileSearchOptions, limit: Int, offset: Int): MarkdownFileSearchResults!
  autoSuggestMarkdownFileSearch(text: String!, options: MarkdownFileSearchOptions): MarkdownFileAutoSuggestResults!
  markdownFileTags: [MarkdownFileTag!]!
}

type MarkdownFile {
  content: String!
  strippedContent: String!
  id: ID!
  path: String!
  slug: String!
  tags: [MarkdownFileTag!]!
  title: String!
  description: String
  createdAt: String!
}

type MarkdownFileSearchResults {
  count: Int!
  results: [MarkdownFileSearchResult!]!
}

type MarkdownFileSearchResult {
  id: ID!
  description: String
  score: Float!
  terms: [String!]
  title: String!
  slug: String!
  path: String!
  tags: [MarkdownFileTag!]!
  createdAt: String!
  markdownFile: MarkdownFile!
}

type MarkdownFileTag {
  id: ID!
  name: String!
  description: String
}

input MarkdownFileSearchOptions {
  fields: [String!]
  weights: MarkdownFileSearchOptionsWeights
  prefix: Boolean
  fuzzy: Boolean
  maxFuzzy: Int
  combineWith: MarkdownFileSearchOptionsCombineWith
}

type MarkdownFileAutoSuggestResults {
  count: Int!
  results: [MarkdownFileAutoSuggestResult!]!
}

type MarkdownFileAutoSuggestResult {
  suggestion: String!
  terms: [String!]!
  score: Float!
}

enum MarkdownFileSearchOptionsCombineWith {
  AND
  OR
}

input MarkdownFileSearchOptionsWeights {
  fuzzy: Float!
  exact: Float!
}

enum MarkdownFilesSortDirection {
  asc
  desc
}

enum MarkdownFilesSortBy {
  title
  createdAt
}
```
