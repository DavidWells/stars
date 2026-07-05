---
repo: reese/gatsby-plugin-stork
url: 'https://github.com/reese/gatsby-plugin-stork'
homepage: ''
starredAt: '2022-12-02T01:12:42Z'
createdAt: '2020-12-29T04:19:10Z'
updatedAt: '2023-05-14T17:52:00Z'
language: JavaScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:08.745Z'
description: A Gatsby plugin for generating Stork search indexes.
tags:
  - gatsby
  - gatsby-plugin
  - search
  - static-site
  - stork
---

![Build](https://github.com/reese/gatsby-plugin-stork/workflows/Build%20and%20Test/badge.svg)
[![npm version](https://badge.fury.io/js/gatsby-plugin-stork.svg)](https://badge.fury.io/js/gatsby-plugin-stork)
![npm](https://img.shields.io/npm/dt/gatsby-plugin-stork)

# gatsby-plugin-stork

This is a Gatsby plugin for generating a search engine using [Stork](https://github.com/jameslittle230/stork).
This plugin automatically generates a Stork search index from your site's content and includes it in your `public` directory.
This plugin also automatically mounts the Stork `script` tag to the end of your HTML files.

## Installation

To install, run `npm i gatsby-plugin-stork`.
Once installed, add the plugin to your `gatsby-config.js`.

```js
module.exports = {
    plugins: [
        "gatsby-plugin-stork",
    ]
}
```

You can also pass in additional options:

```js
module.exports = {
    plugins: [
        {
          resolve: "gatsby-plugin-stork",
          options: {
            indexes: [
              {
                resolvers: {
                  Mdx: {
                    contents: node => node.rawBody,
                    url: node => node.fields.slug,
                    title: node => node.frontmatter.title
                  },
                },
                filename: "firstIndex.st"
              }
            ],
            theme: "dark"
          }
        }
    ]
}
```

The search bar can be mounted using the `StorkInput` component:

```jsx
import React from 'react';
import { StorkInput } from 'gatsby-plugin-stork';

export const YourSearchComponent = () => {
  return (
    <StorkInput filename="firstIndex.st" placeholder="🔍" />
  );
}
```

## Configuration Options

### `indexes`

This is an array of objects where each represents a separate index file.
This object should have the following keys:

#### `resolvers`

`resolvers` is an object of node types, which in turn is a series of key-value pairs where each key is the name of a [configuration option](https://stork-search.net/docs/config-ref) and the value is a function that takes in a node and returns the value for that option.
For example, a common node type for blog posts is `MarkdownRemark`, and at a minimum, you must pass at least a `url`, `title`, and either a `path` or `contents`.
Such a set of resolvers would look like this:

```js
{
  resolvers: {
    MarkdownRemark: {
      contents: node => node.rawBody,
      url: node => node.fields.slug,
      title: node => node.frontmatter.title
    }
  },
  filename: "example.st",
}
```

#### `filename`

The name of the resulting index file.
By default, it is called `stork.st`, but you may wish to call it something else.

### `theme`

The name of the [Stork theme](https://stork-search.net/themes) to install.
Setting this option to `null` will not install a theme.

## Project Status

Note that this project is still pre-1.0, and minor version bumps may contain breaking changes. If you are still using this pre-1.0, I recommend [pinning to a minor version](https://docs.npmjs.com/cli/v6/using-npm/semver#tilde-ranges-123-12-1).

## Running During Automated Builds

If you use an automated build system as part of your site's deploy system, you'll need to have Stork installed as part of the build process for this plugin to run successfully.
The docs have some instructions on [setting Stork up with Netlify](https://stork-search.net/docs/stork-and-netlify), but similar steps can be applied to any static site build runner.

This plugin will by default run the `stork` executable, but you can also supply a path to the executable with the `GATSBY_STORK_EXECUTABLE_PATH` environment variable to run Stork from a different installation.
