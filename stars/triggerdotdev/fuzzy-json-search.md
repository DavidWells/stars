---
repo: triggerdotdev/fuzzy-json-search
url: 'https://github.com/triggerdotdev/fuzzy-json-search'
homepage: null
starredAt: '2022-09-14T17:51:26Z'
createdAt: '2022-04-06T10:56:55Z'
updatedAt: '2024-11-10T11:29:35Z'
language: TypeScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:30.798Z'
description: 'Search a JSON document by path, content, and inferred content'
tags: []
---

# Fuzzy JSON Search

> VSCode style fuzzy search for JSON documents

<!-- ![Tests](https://github.com/jsonhero-io/fuzzy-json-search/actions/workflows/test.yml/badge.svg?branch=main) -->
<!-- [![Downloads](https://img.shields.io/npm/dm/%40jsonhero%2Ffuzzy-json-search.svg)](https://npmjs.com/@jsonhero/fuzzy-json-search) -->
<!-- [![Install size](https://packagephobia.com/badge?p=%40jsonhero%2Ffuzzy-json-search)](https://packagephobia.com/result?p=@jsonhero/fuzzy-json-search) -->

## 🚀 Features

- Use VSCode style fuzzy search on a JSON document
- Searches through key names, path, raw values and formatted values

## 💻 Usage

Install Fuzzy JSON Search

```bash
$ npm install --save @jsonhero/fuzzy-json-search
```

The simplest way to search is to create an instance of `JSONHeroSearch` and pass it a JSON object:

```typescript
const response = await fetch("https://jsonplaceholder.typicode.com/todos");
const json = await response.json();

const searcher = new JSONHeroSearch(json);

const results = searcher.search("user");
```

## API

### `JSONHeroSearch.search(query: string)`

Performs a fuzzy search against the entire document, ordering by score. Will only return results that score more than 0.

#### Returns `Array<SearchResult<string>>>`

`SearchResult<string>` has the following properties:

##### `item` is a `string` representing the path to the key

##### `score` is an `ItemScore`

##### `ItemScore` has the following properties

##### `score` is a number, the higher the score the better a match

##### `labelMatch` is an array of `Match` objects

##### `descriptionMatch` is an array of `Match` objects

##### `rawValueMatch` is an array of `Match` objects

##### `formattedValueMatch` is an array of `Match` objects

##### `Match` is type `{ start: number; end: number }`
