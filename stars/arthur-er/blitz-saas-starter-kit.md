---
repo: arthur-er/blitz-saas-starter-kit
url: 'https://github.com/arthur-er/blitz-saas-starter-kit'
homepage: null
starredAt: '2021-05-12T22:46:13Z'
createdAt: '2021-04-30T11:46:26Z'
updatedAt: '2024-06-25T23:10:15Z'
language: TypeScript
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: true
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:43.002Z'
description: Software as a Service starter kit. Made with Blitz
tags: []
---

<h1 align="center">
  Blitz SaaS Starter Kit
</h1>

<p align="center">
 <a href="#introduction">Introduction</a> •
 <a href="#features">Features</a> •
 <a href="#running-the-project">How to run it</a> •
 <a href="#author">Author</a> •
 <a href="#user-content-license">License</a>
</p>

## 📖 Introduction

This is a Software as a Service starter kit. Made with [Blitz](https://github.com/blitz-js/blitz). Inspired by [Wave](https://github.com/thedevdojo/wave) and [BulletTrain](bullettrain.co). Designed using DDD as described [here](https://zenn.dev/repomn/articles/2ecaebd9ef6bfa).

---

## 📦 Features

- [x] Authentication and Authorization
- [x] Multi-tenancy
- [ ] Subscriptions
- [ ] Subscription plans
- [x] User Roles
- [ ] Notifications
  - [ ] Email
  - [ ] Discord
  - [ ] Browser / in-app
- [ ] Admin Panel
- [ ] Announcements
- [x] Webhook calling on data events
- [x] Extended generators using [Plop](https://plopjs.com) (probably will be changed to Blitz templates when it comes out)

---

## Running the project

### Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/), [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/)

### Installation

First, you will need to clone the repository:

```bash
$ git clone https://github.com/arthur-er/blitz-sass.git project_name
```

Then follow these 3 steps:

#### **1. Copy the `.env.example` file**

Duplicate the file and rename it to .env.local, then replace the DATABASE_URL, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB with the correct data for your project

#### **2. Install the dependencies**

Simply run

```bash
$ yarn
```

#### **2. Run the migrations and seeds**

Simply run

```bash
$ yarn blitz prisma migrate dev
$ yarn blitz db seed
```

#### **3. Start the dev server**

Simply run

```bash
$ yarn dev
```

🎉 And that's it! You will now be able to visit your app at http://localhost:3000 and see your application up and running.

---

## Tech Stack

The following tools were used in the construction of the project:

- **[blitz](https://github.com/blitz-js/blitz)**

---

## Author

<a href="https://github.com/arthur-er">
  <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/47113350?v=4" width="100px;" alt="Arthur Emanuel"/>
  <br />
  <b>Arthur Emanuel</b>
</a>
 <br />

---

## License

This project is under the license [MIT](./LICENSE).

Made with ❤ by Arthur Emanuel 👋🏽 [Get in Touch!](mailto:arthur-er@pm.me)
