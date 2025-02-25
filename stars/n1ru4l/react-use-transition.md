---
repo: n1ru4l/react-use-transition
url: 'https://github.com/n1ru4l/react-use-transition'
homepage: null
starredAt: '2021-04-18T06:21:28Z'
createdAt: '2021-04-13T06:27:03Z'
updatedAt: '2023-03-11T12:21:42Z'
language: TypeScript
license: NA
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:49.956Z'
description: null
tags: []
---

# @n1ru4l/react-use-transition

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm](https://img.shields.io/npm/v/@n1ru4l/react-use-transition.svg)](https://www.npmjs.com/package/@n1ru4l/react-use-transition)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@n1ru4l/react-use-transition)](https://bundlephobia.com/result?p=@n1ru4l/react-use-transition)
[![Dependencies](https://img.shields.io/david/n1ru4l/react-use-transition)](https://www.npmjs.com/package/@n1ru4l/react-use-transition)
[![NPM](https://img.shields.io/npm/dm/@n1ru4l/react-use-transition.svg)](https://www.npmjs.com/package/@n1ru4l/react-use-transition)

Suspense like transitions without experimental react features today. For any fetching library.

## Why?

Ever experienced flashy transitions where content disappears after triggering navigation, a loading state shows up for like 10 milliseconds, disappears and a new page is rendered? Did you wonder why it was even necessary to show a loading page in the first place?

That is exactly what this micro library tries to solve. Cache the previous result in case a transition occurs and only show some kind of loading indicator after a certain threshold (by default 300ms) has been reached without the new data arriving.

The concept is taken from the experimental `React.useTransition` which is not stable as today and only available as an experimental build. This hook however works without React concurrent mode.

Use it together with your favorite GraphQL client such as `relay` or `urql` or any other data fetching library.

## Install

```bash
yarn install -E @n1ru4l/react-use-transition
```

## Usage

[Check out the code sandbox](https://codesandbox.io/s/usetransition-85v3c?file=/src/index.js)

```tsx
import * as React from "react";
import { unstable_batchedUpdates } from "react-dom"; // or react-native (your react reconciler)
import { createUseTransition } from "@n1ru4l/react-use-transition";

import { useQuery } from "your-fetching-library-of-choice";

const useTransition = createUseTransition(unstable_batchedUpdates);

const DataFetchingComponent = ({ postId }) => {
  const { data, isLoading } = useQuery("/foo/:postId", { postId });
  const [cachedData, showLoadingIndicator] = useTransition(data, isLoading);

  return (
    <>
      {showLoadingIndicator ? <Spinner /> : null}
      {cachedData ? (
        cachedData.error ? (
          <ErrorRenderer error={cachedData.error} />
        ) : (
          <PostRenderer post={cachedData.post} />
        )
      ) : null}
    </>
  );
};
```
