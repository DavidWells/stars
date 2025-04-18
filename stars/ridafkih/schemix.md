---
repo: ridafkih/schemix
url: 'https://github.com/ridafkih/schemix'
homepage: ''
starredAt: '2022-05-11T01:32:59Z'
createdAt: '2022-05-02T02:40:58Z'
updatedAt: '2025-02-18T07:42:37Z'
language: TypeScript
license: MIT
branch: main
stars: 486
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:46.775Z'
description: >-
  Schemix allows you to programmatically create Prisma schemas using TypeScript
  ⌨️
tags:
  - orm
  - prisma
---

<div align="center">
  <h1>Schemix</h1>
  <p>Easily create modular Prisma schemas.</p>
  <p>Welcome to Schemix. An easy-to-use TypeScript layer over designing Prisma schemas, allowing for modularization, mixins, and other added capabilities.</p>
  	<span>
		<a href="#installation">Installation</a>
		<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
		<a href="#setup">Setup</a>
		<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
		<a href="#usage">Usage</a>
		<span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
		<a href="#contribute">Contribute</a>
	</span>
</div>
<hr>

![example usage](https://user-images.githubusercontent.com/9158485/184518260-c6961cdd-e665-484c-ae83-e3896f604bd4.png)

## Installation

To install Schemix, simply use your favourite Node.js package manager.

```bash
yarn add schemix
```

```bash
npm install schemix
```

## Setup

You will need to create three folders that will contain your source files for your Prisma schema.

- `enums/`
- `mixins/`
- `models/`

Your resulting file structure for your project may end up looking like what follows.

```
project/
├── node_modules/
│   └── *
├── prisma/
│   ├── index.ts
│   ├── schema.prisma
│   ├── enums/
│   │   └── Status.enum.ts
│   ├── mixins/
│   │   ├── DateTime.mixin.ts
│   │   └── UUID.mixin.ts
│   └── models/
│       ├── Post.model.ts
│       └── User.model.ts
├── index.ts
├── tsconfig.json
└── package.json
```

Once that's set up, you can add a script to your `package.json` in your root directory for your project which runs the `prisma/index.ts` file, thus generating the `schema.prisma`. file. Any time you generate your `@prisma/client`, you should first re-run the schemix script.

## Usage

You can see an example usage in the [examples/](./examples) folder in this repository.

### Schema Index

```ts
// ./index.ts

import { createSchema } from "schemix";

createSchema({
  // basePath should be a path to the folder containing models/, enums/, and mixins/.
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "DATABASE_URL" },
  },
  generator: {
    provider: "prisma-client-js",
  },
}).export(__dirname, "schema");
```

### Model Structure

```ts
// ./models/User.model.ts

import { createModel } from "schemix";

import PostModel from "./Post.model";
import UUIDMixin from "../mixins/UUID.mixin";

export default createModel((UserModel) => {
  UserModel.mixin(UUIDMixin)
    .relation("friends", UserModel, { list: true, name: "friends" })
    .relation("friendsRelation", UserModel, { list: true, name: "friends" })
    .relation("posts", PostModel, { list: true });
});
```

As you can see, you can self-reference, and cross-reference relations, apply mixins, etc.

### Override Resulting Model Name

The model name will default to the name of the file, if you want to override this behaviour, simply pass it in as the first parameter in the `createModel` function.

```ts
// ./models/User.model.ts

import { createModel } from "schemix";

import PostModel from "./Post.model";
import UUIDMixin from "../mixins/UUID.mixin";

export default createModel("UserModel", (UserModel) => {
  UserModel.mixin(UUIDMixin)
    .relation("friends", UserModel, { list: true, name: "friends" })
    .relation("friendsRelation", UserModel, { list: true, name: "friends" })
    .relation("posts", PostModel, { list: true });
});
```

### Extending Models

Sometimes one model is derivative of another, and the extension feature can be quite useful for this.

If we want to extend the PostModel to create an ImagePostModel which has all its old properties but with an `imageUrl` string column, we can do so without having to re-write every single other attribute.

```ts
// ./models/ImagePost.model.ts

import { extendModel } from "schemix";

import PostModel from "./Post.model";

export default extendModel(PostModel, (ImagePostModel) => {
  ImagePostModel.string("imageUrl");
});
```

## Contribute

Feel free to contribute to the repository. Pull requests and issues with feature requests are _super_ welcome!
