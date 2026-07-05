---
repo: ThinkAM/typeairtable
url: 'https://github.com/ThinkAM/typeairtable'
homepage: null
starredAt: '2022-09-08T16:28:36Z'
createdAt: '2022-08-19T03:45:58Z'
updatedAt: '2024-12-26T19:47:21Z'
language: TypeScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:32.962Z'
description: >-
  Airtable for TypeScript and JavaScript (ES7, ES6, ES5). Supports Airtable
  database. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.
tags: []
---

<div align="center">
    <img src="https://github.com/thinkam/typeairtable/raw/main/resources/logo_big.png" width="492" height="228">
  <br>
  <br>
	<a href="https://discord.gg/5uKxsrVTMR">
		<img src="https://img.shields.io/discord/542463140646879272">
	</a>
  <br>
  <br>
</div>

TypeAirtable is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)
that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms
and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
Its goal is to always support the latest JavaScript features and provide additional features
that help you to develop any kind of application that uses airtable database - from
small applications with a few tables to large scale enterprise applications
with multiple airtable databases.

TypeAirtable is highly influenced by other ORMs, such as [TypeORM](https://typeorm.io/) and [Entity Framework](https://www.asp.net/entity-framework).

## Features

- Entities and columns.
- Database-specific column types.
- Repositories and custom repositories.
- Using multiple database instances.
- Elegant-syntax and flexible.
- Supports Airtable.
- Works in NodeJS / Browser / Ionic / Cordova / React Native / NativeScript / Expo / Electron platforms / ReactJS / Angular / VueJS.
- TypeScript and JavaScript support.
- ESM and CommonJS support.
- Produced code is performant, flexible, clean and maintainable.
- Follows all possible best practices.

And more...

With TypeAirtable your find look like this:

```typescript
import { AirTableConfig } from '@thinkam/typeairtable';

const config = new AirTableConfig();

const instance = config.configure({
  baseUrl: 'https://api.airtable.com/v0/your_url',
  apiKey: 'your_api_key',
});

const repository = instance.getRepository({
  tableName: 'your_table',
  columns: {
    name: 'singleText',
    isActived: 'checkBox',
  },
});

const result = await repository.find({
  select: ['name'],
  where: { name: 'blah' },
});
```

And your create looks like this:

```typescript
await repository.create({
  name: 'your_name',
  isActived: true,
});
```

If you prefer update, you can use it as well:

```typescript
await repository.update('your_id', {
  name: 'other_name',
  isActived: false,
});
```

And your delete will look this way:

```typescript
await repository.destroy('your_id');
```

## Installation

1. Install the npm package:

   `npm install @thinkam/typeairtable --save`

## Contributing

Learn about contribution [here](https://github.com/thinkam/typeairtable/blob/main/CONTRIBUTING.md) and how to setup your development environment [here](https://github.com/thinkam/typeairtable/blob/main/DEVELOPER.md).
