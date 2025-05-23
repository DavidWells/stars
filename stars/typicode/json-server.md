---
repo: typicode/json-server
url: 'https://github.com/typicode/json-server'
homepage: ''
starredAt: '2021-11-08T05:38:55Z'
createdAt: '2013-11-27T13:21:13Z'
updatedAt: '2025-02-25T15:01:25Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 73700
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.031Z'
description: Get a full fake REST API with zero coding in less than 30 seconds (seriously)
tags: []
---

# json-server

[![Node.js CI](https://github.com/typicode/json-server/actions/workflows/node.js.yml/badge.svg)](https://github.com/typicode/json-server/actions/workflows/node.js.yml)

> [!IMPORTANT]
> Viewing beta v1 documentation – usable but expect breaking changes. For stable version, see [here](https://github.com/typicode/json-server/tree/v0)

👋 _Hey! Using React, Vue or Astro? Check my new project [MistCSS](https://github.com/typicode/mistcss) to write 50% less code._

## Install

```shell
npm install json-server
```

## Usage

Create a `db.json` or `db.json5` file

```json
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

<details>

<summary>View db.json5 example</summary>

```json5
{
  posts: [
    { id: '1', title: 'a title', views: 100 },
    { id: '2', title: 'another title', views: 200 },
  ],
  comments: [
    { id: '1', text: 'a comment about post 1', postId: '1' },
    { id: '2', text: 'another comment about post 1', postId: '1' },
  ],
  profile: {
    name: 'typicode',
  },
}
```

You can read more about JSON5 format [here](https://github.com/json5/json5).

</details>

Pass it to JSON Server CLI

```shell
$ npx json-server db.json
```

Get a REST API

```shell
$ curl http://localhost:3000/posts/1
{
  "id": "1",
  "title": "a title",
  "views": 100
}
```

Run `json-server --help` for a list of options

## Sponsors ✨

| Sponsors |
| :---: |
| <a href="https://mockend.com/" target="_blank"><img src="https://jsonplaceholder.typicode.com/mockend.svg" height="100px"></a> |
| <a href="https://zuplo.link/json-server-gh"><img src="https://github.com/typicode/json-server/assets/5502029/928b7526-0fdf-46ae-80d9-27fa0ef5f430"></a> |

| Sponsors |
| :---: |
| <a href="https://konghq.com/products/kong-konnect?utm_medium=referral&utm_source=github&utm_campaign=platform&utm_content=json-server"><img src="https://github.com/typicode/json-server/assets/5502029/e8d8ecb2-3c45-4f60-92d0-a060b820fa7f" height="75px"></a> |

| Sponsors | |
| :---: | :---: |
| <a href="https://www.storyblok.com/" target="_blank"><img src="https://github.com/typicode/json-server/assets/5502029/c6b10674-4ada-4616-91b8-59d30046b45a" height="35px"></a> | <a href="https://betterstack.com/" target="_blank"><img src="https://github.com/typicode/json-server/assets/5502029/44679f8f-9671-470d-b77e-26d90b90cbdc" height="35px"></a> |
| <a href="https://route4me.com"><img src="https://github.com/user-attachments/assets/4eab0bac-119e-4b27-8183-8b136190b776" height="35px" alt="Delivery Routing Software and Route Optimization Software"></a> | <a href="https://www.speechanddebate.org"><img src="https://github.com/user-attachments/assets/cc7980e4-2147-4499-8de4-4d0c265d0c07" height="35px"></a> |


[Become a sponsor and have your company logo here](https://github.com/users/typicode/sponsorship)

## Sponsorware

> [!NOTE]
> This project uses the [Fair Source License](https://fair.io/). Only organizations with 3+ users are kindly asked to contribute a small amount through sponsorship [sponsor](https://github.com/sponsors/typicode) for usage. __This license helps keep the project sustainable and healthy, benefiting everyone.__
>
> For more information, FAQs, and the rationale behind this, visit [https://fair.io/](https://fair.io/).

## Routes

Based on the example `db.json`, you'll get the following routes:

```
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
PATCH  /posts/:id
DELETE /posts/:id

# Same for comments
```

```
GET   /profile
PUT   /profile
PATCH /profile
```

## Params

### Conditions

- ` ` → `==`
- `lt` → `<`
- `lte` → `<=`
- `gt` → `>`
- `gte` → `>=`
- `ne` → `!=`

```
GET /posts?views_gt=9000
```

### Range

- `start`
- `end`
- `limit`

```
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate

- `page`
- `per_page` (default = 10)

```
GET /posts?_page=1&_per_page=25
```

### Sort

- `_sort=f1,f2`

```
GET /posts?_sort=id,-views
```

### Nested and array fields

- `x.y.z...`
- `x.y.z[i]...`

```
GET /foo?a.b=bar
GET /foo?x.y_lt=100
GET /foo?arr[0]=bar
```

### Embed

```
GET /posts?_embed=comments
GET /comments?_embed=post
```

## Delete

```
DELETE /posts/1
DELETE /posts/1?_dependent=comments
```

## Serving static files

If you create a `./public` directory, JSON Server will serve its content in addition to the REST API.

You can also add custom directories using `-s/--static` option.

```sh
json-server -s ./static
json-server -s ./static -s ./node_modules
```

## Notable differences with v0.17

- `id` is always a string and will be generated for you if missing
- use `_per_page` with `_page` instead of `_limit`for pagination
- use Chrome's `Network tab > throtling` to delay requests instead of `--delay` CLI option
