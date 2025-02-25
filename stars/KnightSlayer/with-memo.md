---
repo: KnightSlayer/with-memo
url: 'https://github.com/KnightSlayer/with-memo'
homepage: null
starredAt: '2023-05-08T17:16:10Z'
createdAt: '2023-02-10T20:55:07Z'
updatedAt: '2023-05-08T20:51:43Z'
language: TypeScript
license: NA
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:50.588Z'
description: null
tags: []
---

# Higher Order Function withMemo
This library is result of this article: [english](https://medium.com/better-programming/learn-javascript-by-implementing-memoization-394274485547), [русский](https://habr.com/ru/articles/720594/)

`withMemo` is a dependency-free JavaScript library for memoizing functions. It is designed to improve the performance of expensive function calls by caching and reusing results for repeated calls with the same arguments. It supports various configuration options, such as custom cache keys, time-to-live (TTL) settings, and cache replacement policies.

## Installation

```shell
$ npm install @eabgaryan/with-memo
# or with yarn
$ yarn add @eabgaryan/with-memo
# or with pnpm
$ pnpm add @eabgaryan/with-memo
```

| Option                  | Default value   | Description                                                                                                                                                                                                                                                                 |
|-------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getKey                  | (arg) => arg    | A custom function for generating cache keys. Specifies how the arguments will be compared with each other. Will be called for each argument separately                                                                                                                      |
| getContextKey           | undefined       | Same as `getKey` but for context. If doesn't provided then context ignored.                                                                                                                                                                                                 |
| getCacheStore           | () => new Map() | The function should return an object with the same interface as `Map`. That structure will store the cache in tree form.                                                                                                                                                    |
| cacheRejectedPromise    | false           | If `false` then rejected promises will not be cached.                                                                                                                                                                                                                       |
| ttl                     | undefined       | Time to live (in milliseconds) for the cache entries. If not specified, cache entries will not expire.                                                                                                                                                                      |
| transformArgs           | (args) => args  | A function to transform the input arguments before they are passed to `getKey` function                                                                                                                                                                                     |
| cacheReplacementPolicy  | undefined       | An object with the following properties: `maxSize` (Number, required): The maximum number of cache entries. `strategy` (Function, required): The cache replacement strategy function. It takes an array of all cache entries and returns an array of cache entries to evict |

## Usage
### Basic Usage
```javascript
const expensiveOperation = (a, b) => {
  // Some expensive computation here...
  return a * b;
};

const memoizedExpensiveOperation = withMemo(expensiveOperation);

console.log(memoizedExpensiveOperation(2, 3)); // 6
console.log(memoizedExpensiveOperation(2, 3)); // 6 (cached result)
```
### Advanced Usage
#### Custom Cache Key Function

```javascript
const expensiveOperation = ({x, y}) => {
  // Some expensive computation here...
  return Math.sqrt(x**2 + y**2)
};

const memoizedExpensiveOperation = withMemo(expensiveOperation, {
  getKey: JSON.stringify,
});

console.log(memoizedExpensiveOperation({x: 2, y: 3})); // 5
console.log(memoizedExpensiveOperation({x: 2, y: 3})); // 5 (cached result)
```
#### TTL (Time to Live) Example
```javascript
const randomNumber = () => Math.random();

const memoizedRandomNumber = withMemo(randomNumber, { ttl: 1000 });

const firstCall = memoizedRandomNumber();
console.log(firstCall);

setTimeout(() => {
  console.log(memoizedRandomNumber()); // Same as firstCall (cached result)
}, 500);

setTimeout(() => {
  console.log(memoizedRandomNumber()); // Different number (cache expired)
}, 1500);
```

## License
MIT
