---
repo: tschoffelen/macaw
url: 'https://github.com/tschoffelen/macaw'
homepage: 'https://includable.com/macaw/'
starredAt: '2021-01-02T04:58:11Z'
createdAt: '2020-02-14T21:37:13Z'
updatedAt: '2024-06-29T14:03:18Z'
language: JavaScript
license: MIT
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:11.574Z'
description: "\U0001F99C Scalable email templates for Node.js applications."
tags:
  - email
  - nodejs
  - templates
---

<p align=center><img src="https://schof.co/f/htn/logo.svg" alt="Macaw" /></p>

# Scalable email templates for node.js

[![Build Status](https://travis-ci.com/macaw-email/macaw.svg?branch=master)](https://travis-ci.com/macaw-email/macaw)
[![Codecov](https://codecov.io/gh/macaw-email/macaw/branch/master/graph/badge.svg)](https://codecov.io/gh/macaw-email/macaw)
[![NPM](https://img.shields.io/npm/v/macaw.svg)](https://npmjs.org/macaw)

Macaw is a suite of tools that helps you design and send transactional emails. It aims to solve the problems that usually occur at the intersection of design, copywriting and engineering.

**Macaw is:**

- A node.js package that helps you to use templates to send transactions emails
- A CLI tool that helps you structure and preview templates

**Macaw is _not_:**

- A Mailchimp-esque drag-and-drop email builder
- A email sending service

# Quick example

Some lines of code usually say more than any documentation could, so here's a simple example of how this library could be used:

```js
const macaw = require("macaw");
const sendgrid = require("@macaw-email/provider-sendgrid");

const mailer = macaw({
  provider: sendgrid({ apiKey: "aaaaa-bbbbbbb-ccccccc-ddddddd" })
});

const template = await mailer.template("monthly-newsletter", {
  customerName: "Example Business",
  greeting: "Hi, Thomas!"
});

await template.send({
  to: {
    name: "Thomas Schoffelen",
    email: "thomas@schof.co"
  }
});
```

# Getting started

Quickly get up and running by executing this command in your project's root directory:

```shell
npx macaw init
```

This will:

1. Create a `emails` directory with an example template and layout file.
2. Add `macaw` to your package.json file.

Take a look at the files created in the `emails` directory, and use the documentation links below to learn what's next.

# Documentation

- [Templates and layouts](docs/templating.md)
- [Email sending providers](docs/providers.md)
- [Template storage sources](docs/storage.md)
- [Custom provider implementations](docs/custom-provider.md)
- [API classes reference](docs/api.md)



<br /><br />

---

<div align="center">
	<b>
		<a href="https://schof.co/consulting/?utm_source=macaw-email/macaw">Get professional support for this package →</a>
	</b>
	<br>
	<sub>
		Custom consulting sessions availabe for implementation support and feature development.
	</sub>
</div>
