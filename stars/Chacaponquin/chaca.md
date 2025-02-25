---
repo: Chacaponquin/chaca
url: 'https://github.com/Chacaponquin/chaca'
homepage: 'https://chaca.vercel.app'
starredAt: '2023-02-14T18:54:15Z'
createdAt: '2022-10-02T04:58:03Z'
updatedAt: '2025-01-28T20:32:56Z'
language: TypeScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:55.985Z'
description: "\U0001F31A A library to create and export mock data with your rules."
tags:
  - chaca
  - datasets
  - fake-data
  - fake-data-generator
  - fakedata
  - faker
  - mock-data
---

<p align="center"><img align="center" width="200" src="https://res.cloudinary.com/chaca-sa/image/upload/v1681924431/Logopit_1681682634889_hywzcu.png" style="max-width: 100%"/></p>

<h2 align="center">🌚 Think your data and let Chaca create it.</h1>

## 😀 Intro

Welcome to Chaca, a powerful Nodejs library that revolutionizes mock data generation for testing and development processes. With Chaca, you can effortlessly generate realistic and diverse fake data to simulate different scenarios for your application.

## 📦 Installation

```shell
npm install chaca
```

## 📘 Documentation

Visit our website to read the documentation. [Chaca Docs](https://chaca-doc.vercel.app/)

## 😎 Usage

```ts
import { chaca, modules } from "chaca";

const movieSchema = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  authors: {
    type: () => modules.person.fullName({ language: "es" }),
    isArray: { min: 1, max: 3 },
  },
  image: () => modules.image.film(),
  likes: () => modules.datatype.int({ min: 0, max: 500000 }),
  category: chaca.enum(["Horror", "War", "History", "Comedy"]),
  adultMovie: ({ currentFields: docFields }) => {
    return (
      docFields.category === "Horror" ||
      docFields.category === "War" ||
      docFields.category === "Action"
    );
  },
});

// Generate 20 objects with the defined schema
const docs = movieSchema.array(20);

/*
[
  {
    id: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
    authors: ["Olivia Gonzalez Gomez", "Santiago Torres Gil"],
    image: "https://loremflickr.com/480/480/film",
    likes: 21456,
    category: "Horror",
    adultMovie: true,
  },
  ...rest, // 19 more documents
];
*/

// Generate 20 objects and export them in a json file
await movieSchema.export(20, {
  filename: "movies",
  format: "json",
  location: "./folder",
});
```

## 🕹️ CLI

See [CLI guide](https://chaca-doc.vercel.app/docs/guide/command-line)

## 🌐 Try our REST API

If you don't want to use our npm package you can use our [REST API](https://chaca-doc.vercel.app/docs/api-rest/overview) to create your mock data

## 🗂️ Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/Chacaponquin/chaca/blob/main/CHANGELOG.md).

## Contributing

The Chaca project welcomes all constructive contributions. Contributions take many forms, from code for bug fixes and enhancements, to additions and fixes to documentation, additional tests, triaging incoming pull requests and issues, and more!. [See CONTRIBUTING.md](https://github.com/Chacaponquin/chaca/blob/main/CONTRIBUTING.md)

## License

MIT
