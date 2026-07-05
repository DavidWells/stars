---
repo: ajmnz/swagger-jsdoc-indent
url: 'https://github.com/ajmnz/swagger-jsdoc-indent'
homepage: 'https://marketplace.visualstudio.com/items?itemName=ajmnz.swagger-jsdoc-indent'
starredAt: '2022-03-30T21:29:39Z'
createdAt: '2021-08-14T17:03:19Z'
updatedAt: '2023-08-17T16:29:11Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:53.136Z'
description: 'Write indentable OpenApi/Swagger jsDoc comments '
tags:
  - swagger
  - swagger-jsdoc
  - swagger-jsdoc-indent
  - vscode-extension
---


<h1 align="center">Swagger jsDoc indent</h1>
<p align="center">Write indentable OpenApi/Swagger jsDoc comments.</p>

---

# Table of contents
- [Table of contents](#table-of-contents)
- [Description](#description)
- [Usage](#usage)
    - [Installation](#installation)
    - [Formatting comment blocks](#formatting-comment-blocks)
      - [Example](#example)
    - [Unformatting](#unformatting)
- [License](#license)
# Description

This VSCode extension targets [this](https://stackoverflow.com/questions/58186804/vscode-indent-in-swagger-jsdoc) issue on StackOverflow. Basically,
when writing your API spec in YAML with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/), it is impossible to get automatic indentation and formatting
inside the comment blocks. Thus, you end up either writing it in JSON or manually adding spaces/tabs for each line, which is _really tedious_.

The extension allows you to write your spec inside comment blocks and then format it so [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/) can parse it
and generate your spec.

> VSCode enables automatic indentation when there's no preceding asterisk (`*`).

```ts
/**
 * You won't be able to get automatic indentation here
 * or here
 * 
but you'll
  get it here,
  when there's no asterisk
    preceding the line
 */
```

# Usage

### Installation

Install the extension from the [installation page](https://marketplace.visualstudio.com/items?itemName=ajmnz.swagger-jsdoc-indent).

### Formatting comment blocks

For the extension to correctly parse your comment block, it should follow the following guidelines:

- The spec has to start with either `@swagger` or `@openapi`
- The comment should start with `/**`
- No line (of the spec only) should start with an asterisk (`*`)
- It can contain regular comments preceded by an asterisk before the spec
- **Before running the extension you must place your cursor within the comment block**

#### Example

Write your spec

```ts
/**
 * Spec for the route /auth/register.
 *
@openapi
/auth/register:
  post:
    summary: Register as user
    tags:
      - Auth
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required:
              - name
              - email
              - password
            properties:
              name:
                type: string
              email:
                type: string
                format: email
                description: Must be unique
              password:
                type: string
                format: password
                minLength: 8
                description: At least one number and one letter
 */
router.post("/auth/register", authMiddleware.validate, authController.register);
```

Place your cursor within the comment block, press `cmd + shift + P` (MacOS) or `ctrl + shift + P` (Windows) and search for `Swagger jsDoc: Format spec`.

The extension will:

- Run [prettier](https://prettier.io/) to fix/catch indentation errors
- Add an asterisk at the start of each line
- Replace your comment block with the formatted one
- Respect any indentation of your block

```ts
/**
 * Spec for the route /auth/register.
 *
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *
 *
 * More regular comments here
 */
router.post("/auth/register", authMiddleware.validate, authController.register);
```

Optionally run [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc/) to generate your spec.

```sh
$ yarn swagger-jsdoc -d docs/api/definition.yml src/api/routes/v1/**.ts -o docs/api/specification.yml
```

### Unformatting

It is possible to undo the formatting for easy editing (thanks @doctorfred).
Works the same as formatting, but instead removes the asterisks so you can edit the spec while being able
to indent it.

Place your cursor within the comment block, press `cmd + shift + P` (MacOS) or `ctrl + shift + P` (Windows) and search for `Swagger jsDoc: Unformat spec`.

Then you can just [format](#formatting-comment-blocks) it again.

# License

MIT
