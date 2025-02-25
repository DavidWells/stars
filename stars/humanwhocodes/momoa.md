---
repo: humanwhocodes/momoa
url: 'https://github.com/humanwhocodes/momoa'
homepage: null
starredAt: '2019-06-13T05:44:35Z'
createdAt: '2019-06-11T17:39:59Z'
updatedAt: '2025-02-25T01:55:34Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 326
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:35.651Z'
description: 'A JSON parser, tokenizer, traverser, and printer.'
tags: []
---

# Momoa JSON

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## About

Momoa is a general purpose JSON utility toolkit for JavaScript and Rust. There are two different packages in this repository:

* `js` - the JavaScript package
* `rust` - the Rust crate

These two packages are not directly linked but they do produce the same AST and so they are kept in sync using a monorepo.

## Development

To work on Momoa, you'll need:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org)
* [Rust](https://rustup.rs)

Make sure all three are installed by visiting the links and following the instructions to install.

Now you're ready to clone the repository:

```bash
git clone https://github.com/humanwhocodes/momoa.git
```

Follow the instructions in the README in each directory for how to work on that package.

## Acknowledgements

This project takes inspiration (but not code) from a number of other projects:

* [`Esprima`](https://esprima.org) inspired the package interface and AST format.
* [`json-to-ast`](https://github.com/vtrushin/json-to-ast) inspired the AST format.
* [`parseJson.js`](https://gist.github.com/rgrove/5cc64db4b9ae8c946401b230ba9d2451) inspired me by showing writing a parser isn't all that hard.

## License

Apache 2.0
