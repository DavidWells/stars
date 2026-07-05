---
repo: shoooe/derive
url: 'https://github.com/shoooe/derive'
homepage: 'https://www.npmjs.com/package/@shoooe/derive'
starredAt: '2022-10-30T17:51:37Z'
createdAt: '2022-10-16T10:07:49Z'
updatedAt: '2024-12-08T14:33:49Z'
language: TypeScript
license: MIT
branch: main
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:14.709Z'
description: Library to derive a TypeScript type from another.
tags:
  - derive
  - graphql
  - types
  - typescript
---

# Derive

[![npm version](https://badge.fury.io/js/@shoooe%2Fderive.svg)](https://badge.fury.io/js/@shoooe%2Fderive)

Utility type to generate a type from another with a special care for the DX.

You can see this tool as an _hardcode_ version of `Pick`.

Features:

- 😎 Type safe
- 🌱 Minimal & lightweight
- ⌨️​ Autocompletion for fields
- 💥 Automatically expands arrays and nullable/optional types
- 👀 Preview expanded types in intellisense
- 💫 Supports recursive & mutually recursive types
- ❓ Optional fields support
- 💋 Inspired by GraphQL

## Installation

```
yarn add @shoooe/derive
```

## Usage

### Basic usage

Let's say that we have a type `User` defined as:

```typescript
type User = {
  bestFriend: User | undefined;
  favoriteBook: Book | null;
  friends: User[] | undefined;
  id: number;
  name: string;
};

type Book = {
  author: User;
  isdn: number;
  synopsis: string | null;
  title: string | null | undefined;
  subtitle?: string | null;
};
```

We can derive a subset of its properties via:

```typescript
type Result = Derive<
  User,
  {
    id: true;
    name: true;

    // Automatically expands nullable & optional types, which means that `null`
    // and `undefined` will be added automatically to the resulting type if
    // they existed in the target type.
    bestFriend: {
      name: true;
    };

    // Automatically expands arrays as well
    friends: {
      name: true;

      // Supports mutually recursive types
      favoriteBook: {
        isdn: true;
        title: true;
        synopsis: true;
        author: {
          name: true;
        };
      };
    };
  }
>;
```

Which will result in:

```typescript
type Result = {
  id: number;
  name: string;
  bestFriend:
    | {
        name: string;
      }
    | undefined;
  friends:
    | {
        name: string;
        favoriteBook: {
          isdn: number;
          title: string | null | undefined;
          synopsis: string | null;
          author: {
            name: string;
          };
        } | null;
      }[]
    | undefined;
};
```

## Alternatives

- [ts-essentials](https://github.com/ts-essentials/ts-essentials): comprehensive library with a different style for `DeepPick` (it doesn't do automatic expansion)

## Credits

Special thanks to:

- [Perdoo](https://www.perdoo.com/) for sponsoring the initial research & implementation
- [Szaman](https://github.com/szamanr) for the initial code review
