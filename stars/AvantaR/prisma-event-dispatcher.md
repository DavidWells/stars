---
repo: AvantaR/prisma-event-dispatcher
url: 'https://github.com/AvantaR/prisma-event-dispatcher'
homepage: null
starredAt: '2021-10-30T01:47:27Z'
createdAt: '2021-10-23T15:36:45Z'
updatedAt: '2025-01-22T16:16:02Z'
language: TypeScript
license: MIT
branch: main
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.318Z'
description: Event Dispatcher for Prisma Models
tags: []
---

# Prisma Event Dispatcher

![npm](https://img.shields.io/npm/v/prisma-event-dispatcher)
![](https://github.com/AvantaR/prisma-event-dispatcher/actions/workflows/unit.tests.yml/badge.svg)

Prisma Event Dispatcher is Prisma compatible middleware, which dispatches several types of events while working with Prisma models. It's EventEmitter agnostic and allows you to choose for what kind of models, actions and moment of lifecycle to emit the events.

## How to use it

You attach it to Prisma Middleware:

```Typescript
const eventEmitter = new EventEmitter();
const options: PrismaEventDispatcherOptions = {
  models: ['User', 'Post'],
  actions: ['create', 'update'],
  when: ['before', 'after'],
};

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  const prismaEventDisptacher = new PrismaEventDispatcher.(options, eventEmitter);
  return await prismaEventDisptacher.dispatch(params, next);
})
```

You can use static method `setup` as well:

```Typescript
const eventEmitter = new EventEmitter();
const options: PrismaEventDispatcherOptions = {
  models: ['User', 'Post'],
  actions: ['create', 'update'],
  when: ['before', 'after'],
};

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  return await PrismaEventDispatcher.setup(options, this.eventEmitter).dispatch(params, next);
})
```

Dispatch method requires `params` and `next` values from middleware and returns Prisma Client query response.

## Options

Passing options object allows to define for what kind of models, actions and when the event will be dispatched. When you don't pass any of the options fields, the dispatcher will treat it as 'all'.

```Typescript
export declare type PrismaEventDispatcherOptions = {
    models?: string[];
    actions?: PrismaAction[];
    when?: When[];
};
```

Available prisma actions:

- findUnique
- findMany
- findFirst
- create
- createMany
- update
- updateMany
- upsert
- delete
- deleteMany
- executeRaw
- queryRaw
- aggregate
- count

Available when parameters:

- before
- after

## Emitted events

Emitted events has string name in convention `Model.when.action`, for example – when you create new User, dispatcher will emit `User.before.create` and `User.after.create` event.

Each event comes with whole params object from Prisma Middleware. Additionally, `after` events have response from Prisma Client query.

Prisma Middleware Params Object example:

```Typescript
{
  args: { where: { id: 170 }, data: { name: 'Karol' } },
  dataPath: [],
  runInTransaction: false,
  action: 'update',
  model: 'User'
}
```

Example response from Prisma Client after updating User model:

```Typescript
{
  id: 170,
  name: 'Karol',
  createdAt: 2021-10-22T13:34:52.000Z
}
```

## How to use it with NestJS

Prisma Event Emitter works smoothly with [NestJS framework events module](https://docs.nestjs.com/techniques/events).

You need to inject EventEmitter2 to PrismaService, and pass it into PrismaEventDispatcher.

```Typescript
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { EventEmitter2 } from 'eventemitter2';
import { PrismaEventDispatcher } from 'prisma-event-dispatcher';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private eventEmmiter: EventEmitter2) {
    super();

    const options = {
      models: ['User']
    }

    this.$use(async (params, next) => {
      return await PrismaEventDispatcher.setup(options, this.eventEmmiter).dispatch(params, next);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

Then you can create event listeners as usual:

```Typescript
@OnEvent('User.before.update')
async testCreate(payload: any) {
  console.log('before');
}

@OnEvent('User.after.update')
async testUpdated(payload: any, response: any) {
  console.log('after');
}
```

## EventEmitter

Prisma Event Dispatcher is EventEmitter agnostic. It means you can use any NodeJS EventEmitter which implements `emit` method:

```Typescript
export interface EventEmitter {
    emit(event: symbol | string, ...values: any[]): boolean;
}
```

So it's compatible with NodeJS core API `EventEmitter` and e.g. `EventEmitter2` npm package.

## Contribution

Contributions more than welcome!
