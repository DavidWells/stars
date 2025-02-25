---
repo: mauricedb/use-abortable-fetch
url: 'https://github.com/mauricedb/use-abortable-fetch'
homepage: 'https://www.npmjs.com/package/use-abortable-fetch'
starredAt: '2022-02-18T08:03:22Z'
createdAt: '2018-11-06T11:45:07Z'
updatedAt: '2025-02-25T05:00:52Z'
language: TypeScript
license: MIT
branch: master
stars: 159
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:17.198Z'
description: >-
  React hook that does a fetch and aborts when the components is unloaded  or a
  different request is made
tags: []
---

# use-abortable-fetch

[![Build Status](https://travis-ci.org/mauricedb/use-abortable-fetch.svg?branch=master)](https://travis-ci.org/mauricedb/use-abortable-fetch) 

React hook that does a fetch and aborts when the components is unloaded or a new fetch request is started.

# Installation

`npm install use-abortable-fetch`
or
`yarn add use-abortable-fetch`

## Example usage:

```JavaScript
import React from 'react';
import useAbortableFetch from 'use-abortable-fetch';

const ChuckNorrisJoke = () => {
  const { data, loading, error, abort } = useAbortableFetch(
    '//api.icndb.com/jokes/random/?limitTo=[nerdy]&escape=javascript'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return <div>Joke: {data.value.joke}</div>;
};

export default ChuckNorrisJoke;
```

See this [CodeSandbox](https://codesandbox.io/s/n5q6xmwwq0) for a running example.
