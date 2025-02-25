---
repo: csstools/create-postcss-plugin
url: 'https://github.com/csstools/create-postcss-plugin'
homepage: ''
starredAt: '2016-01-12T21:08:57Z'
createdAt: '2015-07-07T12:37:58Z'
updatedAt: '2024-09-29T10:05:39Z'
language: JavaScript
license: NA
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:35.045Z'
description: Quickly create new PostCSS plugins
tags: []
---

# Create PostCSS Plugin [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Gitter Chat][git-img]][git-url]

[Create PostCSS Plugin] lets you quickly create new [PostCSS] plugins with
documentation, tests, and built-in compiling for supported Node environments.

```sh
npm init postcss-plugin YOUR_DESTINATION
```

Alternatively, you can use the `npx` command:

```sh
npx create-postcss-plugin YOUR_DESTINATION
```

After completing the instructions, write your plugin to `src/index.js` and
update `README.md` with further details outlining your plugin functionality.

## Usage

By default, **Create PostCSS Plugin** provides you the following prompts:

```
Plugin Name: [TITLE]
Keywords: [KEYWORDS]
```

Once completed, you will see the following message:

```
Success! Created PostCSS [TITLE] at [DIRECTORY]

We suggest that you begin by typing:
  cd [DIRECTORY]
  npm test

Happy PostCSS-ing!
```

To skip all prompts, you must at least provide a title and keywords.

```sh
create-postcss-plugin --title Stuff --keywords comma,separated,keywords
```

If your system cannot access git user information from `.gitconfig`, you must
also provide an author, email, and user.

```sh
create-postcss-plugin --title Stuff --author "Cee S Esse" --email "postcss@postcss.org" --user ceesesse --keywords comma,separated,keywords
```

## Options

You can pass options into postcss-plugin to automate plugin creation.

### to

The `to` argument defines the destination of the new project. The first
undefined argument will also determine this value.

```sh
npm init postcss-plugin --to path/to/plugin
```

### title

The `title` argument defines the formal name of the project.

```sh
npm init postcss-plugin --title Stuff
```

```sh
npm init postcss-plugin --title "Awesome Blossom"
```

### id

The `id` argument defines the id used by the project package.json and
repository.

```sh
npm init postcss-plugin --id awes-blos
```

### desc

The `desc` or `description` argument defines the description used by the
project README.md and package.json.

```sh
# becomes "Use exciting new functions" and "Awesome Blossom lets you create new functions in CSS."
npm init postcss-plugin --desc "use exciting new functions"
```

```sh
# becomes "Use exciting new functions" and "Awesome Blossom lets you create new functions in CSS."
npm init postcss-plugin --description "use exciting new functions"
```

### author

The `author` argument defines the author used by the project package.json.

```sh
npm init postcss-plugin --author "Cee S Esse"
```

### email

The `email` argument defines the email used by the project package.json.

```sh
npm init postcss-plugin --email "postcss@postcss.org"
```

### user

The `user` argument defines the user or organization hosting the project.

```sh
npm init postcss-plugin --user "postcss"
```

### keywords

The `keywords` argument defines the keywords used by the project package.json.

```sh
npm init postcss-plugin --keywords "awesome,blossom"
```

### no-install

The `no-install` argument instructs the project to not automatically install
dependencies.

```sh
npm init postcss-plugin --no-install
```

[Create PostCSS Plugin]: https://github.com/csstools/create-postcss-plugin
[PostCSS]: https://github.com/postcss/postcss

[cli-img]: https://img.shields.io/travis/csstools/create-postcss-plugin/master.svg
[cli-url]: https://travis-ci.org/csstools/create-postcss-plugin
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/create-postcss-plugin.svg
[npm-url]: https://www.npmjs.com/package/create-postcss-plugin
