---
repo: Lucifier129/coproduct
url: 'https://github.com/Lucifier129/coproduct'
homepage: ''
starredAt: '2022-01-27T04:27:41Z'
createdAt: '2022-01-19T09:35:19Z'
updatedAt: '2023-08-05T21:50:38Z'
language: TypeScript
license: MIT
branch: main
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.604Z'
description: >-
  A small library aims to improve better tagged-unions/discriminated-unions
  supporting for TypeScript
tags: []
---

# coproduct

<p align="center">
  <img width="400" src="./resource/coproduct-logos/coproduct-logos.jpeg">
</p>

[![npm version](https://img.shields.io/npm/v/coproduct.svg?style=flat)](https://www.npmjs.com/package/coproduct)
![coproduct workflow](https://github.com/Lucifier129/coproduct/actions/workflows/main.yml/badge.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/Lucifier129/coproduct#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Lucifier129/coproduct/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Lucifier129/coproduct/blob/master/LICENSE)
[![Twitter: guyingjie129](https://img.shields.io/twitter/follow/guyingjie129.svg?style=social)](https://twitter.com/guyingjie129)

> A small library aims to improve better tagged-unions/discriminated-unions supporting for TypeScript

## Benefits

- Small bundled size(just 1kb)
- Easy to use with just a few apis to learn
- Improving **Type-Safety** for your TypeScript project via exhaustive pattern-matching

## Installation

```shell
yarn add coproduct
npm install --save coproduct
```

## Usage

For redux app

```typescript
// state type
type CounterState = {
  count: number;
};

// action type
type CounterAction =
  | {
      type: 'incre';
    }
  | {
      type: 'decre';
    }
  | {
      type: 'increBy';
      step: number;
    }
  | {
      type: 'decreBy';
      step: number;
    };

// reducer with match
const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  return match(action).case({
    incre: () => ({
      ...state,
      count: state.count + 1,
    }),
    decre: () => ({
      ...state,
      count: state.count - 1,
    }),
    increBy: ({ step }) => ({
      ...state,
      count: state.count + step,
    }),
    decreBy: ({ step }) => ({
      ...state,
      count: state.count - step,
    }),
  });
};

// reducer without match
const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  if (action.type === 'incre') {
    return {
      ...state,
      count: state.count + 1,
    };
  } else if (action.type === 'decre') {
    return {
      ...state,
      count: state.count - 1,
    };
  } else if (action.type === 'increBy') {
    return {
      ...state,
      count: state.count + action.step,
    };
  } else if (action.type === 'decreBy') {
    return {
      ...state,
      count: state.count - action.step,
    };
  }

  throw new Error(`Unexpected action: ${action}`);
};
```

Basic usage

```typescript
import { match } from 'coproduct';

export type Option<T> = {
  type: 'Some',
  value: T
} | {
  type: 'None'
}

export const None = {
  type: 'None' as const;
}
export const Some = <T>(value: T) => ({
  type: 'Some' as const,
  value,
});

const show = <T>(data: Option<T>) => {
  return match(data).case({
    Some: data => `some: ${data.value}`,
    None: () => 'none',
  });
};

const value0 = Some(1);
const value1 = None;

expect(show(value0)).toBe('some: 1');
expect(show(value1)).toBe('none');

// you can use if/else to match manually if you want
const show = <T>(data: Option<T>) => {
  if (data.type === 'Some') {
    return `some: ${data.some}`;
  } else if (data.type === 'None') {
    return 'none';
  }
  throw new Error(`Unexpected data: ${data}`);
};
```

You don't need to define your own `option type`, coproduct has built-in `Option` and `Result`.

```typescript
import { match, Option, Some, None, Result, Ok, Err } from 'coproduct';

const show = <T>(data: Option<T>) => {
  return match(data).case({
    Some: data => `some: ${data.value}`,
    None: () => 'none',
  });
};

expect(show(Some(1))).toBe('some: 1');
expect(show(None)).toBe('none');

const showResult = <T>(result: Result<T>) => {
  return match(result).case({
    Ok: data => `ok: ${data.value}`,
    Err: error => `err: ${error.info}`,
  });
};

expect(showResult(Ok(1))).toBe('ok: 1');
expect(showResult(Err('error'))).toBe('err: error');
```

## Api

### match(data).case(patterns)

`match(data).case(patterns)` perform `exhaustive pattern-matching` for data, every case in `data` should has its own visitor function.

**Note**: you can use `_: () => R` as default handler for unmatched case.

### createMatch(tagField) => match

You can create your own `match` function with `tagField` to match your data.

The default `match` of `coproduct` was created via `createMatch('type')`

```ts
const match = createMatch('tag');

type Data =
  | {
      tag: 'a';
      value: string;
    }
  | {
      tag: 'b';
      value: number;
    };

const handleData = (data: Data) => {
  return match(data).case({
    a: data => `a: ${data.value}`,
    b: data => `b: ${data.value}`,
  });
};

handleData({ tag: 'a', value: 'hello' }); // 'a: hello'
handleData({ tag: 'b', value: 1 }); // 'b: 1'
```

### Some(value)

`Some(value)` return the value with the `Some<T>` case of `Option Type`.

### None

`None` is the value with the `None` case of `Option Type`

### Ok(value)

`Ok(value)` return the value with the `Ok<T>` case of `Result Type`.

### Err(message)

`Err(message)` return the value with the `Err<E>` case of `Result Type`.

## Caveats

- The name `$tag` is reserved for `$tag` property of tagged object, it can't be used as a tag name.
- The symbol `_` can't be used as a tag name since it's a reserved filed in `coproduct` as placeholder for `default` case.

## Contribution Guide

```shell
# test
npm run test

# build
npm run build
```

## Author

👤 **Jade Gu**

- Twitter: [@guyingjie129](https://twitter.com/guyingjie129)
- Github: [@Lucifier129](https://github.com/Lucifier129)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Lucifier129/coproduct/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Jade Gu](https://github.com/Lucifier129).

This project is [MIT](https://github.com/Lucifier129/coproduct/blob/master/LICENSE) licensed.
