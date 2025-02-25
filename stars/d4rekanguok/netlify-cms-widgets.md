---
repo: d4rekanguok/netlify-cms-widgets
url: 'https://github.com/d4rekanguok/netlify-cms-widgets'
homepage: 'https://custom-widgets.netlify.com'
starredAt: '2022-10-18T03:32:17Z'
createdAt: '2019-07-18T12:34:29Z'
updatedAt: '2024-12-21T08:10:42Z'
language: TypeScript
license: MIT
branch: master
stars: 91
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:20.956Z'
description: A collection of custom widgets for netlify-cms
tags:
  - cms
  - custom-widgets
  - netlify-cms
  - netlify-cms-widgets
  - widgets
---

> Hi! If you are here for the file relation widget, NetlifyCMS now supported [this feature out of the box](https://www.netlifycms.org/docs/widgets/#relation). Docs is a bit spare, feel free to open an issue if you get stuck (a) using this new feature or (b) migrating away from `ncw-file-relation`. 


<h1 align="center">NetlifyCMS Custom Widgets</h1>

<p align="center">A collection of custom widgets for <a href="https://www.netlifycms.org/">netlify-cms</a></p>

---

<p align="center">⚠ Unstable: Under active development</p>

---

## What's inside

npm package | description | docs
---|---|---
@ncwidgets/id | Generate a unique ID for new entries in a folder collection | 
@ncwidgets/file-relation | Dropdown select widget for a field inside a file collection (the default relation widget only works for folder collections) | [docs](packages/widget-file-relation/readme.md)
@ncwidgets/reorder | Drag & drop to order entries in a folder collection | [docs](packages/widget-reorder/readme.md)
@ncwidgets/netlify-cms | Custom netlify-cms build with file-relation & id built in | see [here](#drop-in)


## How to use

```js
import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'
import { Widget as ReorderWidget } from '@ncwidgets/reorder'
import { Widget as FileRelationWidget } from '@ncwidgets/file-relation'

cms.registerWidget(IdWidget)
cms.registerWidget(ReorderWidget)
cms.registerWidget(FileRelationWidget)

cms.init()
```

### Drop-in

`@ncwidgets/netlify-cms` is a drop-in replacement* for `netlify-cms`, but includes file-relation & id widget.

```diff
- <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
+ <script src="https://unpkg.com/@ncwidgets/netlify-cms@^0.7.0/dist/netlify-cms.js"></script>
```

\*Note that `@ncwidgets/netlify-cms` is **not a fork**. Since we only register additional custom widgets, it's very easy to keep the build up-to-date. It's also currently not a complete drop-in replacement — deprecated `dist/cms.js` and `cms.css` are not included.

### With Gatsby
Easiest way is to use the official netlify cms plugin. Please follow the instruction [here](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify-cms).

```sh
npm i gatsby-plugin-netlify-cms netlify-cms-app
```

Configure `gatsby-plugin-netlify-cms`:

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ]
}

```

Then, install the widgets you need
```sh
npm i @ncwidgets/id
```

And register them

```js
// src/cms/cms.js

import cms from 'netlify-cms-app'
import { Widget as IdWidget } from '@ncwidgets/id'

cms.registerWidget(IdWidget)
cms.init()
```

### With Hugo
Please see this example demo: https://github.com/d4rekanguok/ncwidgets-hugo-example

## Contribute

Has an idea for a widget? Please feel free to send over a PR, or open an issue with the `idea` tag.

### Build
This is a monorepo with yarn workspace & lerna.

```bash
# Setup
yarn
yarn bootstrap

# Launch the playground with 
# all the custom widgets at localhost:
yarn playground:dev

# Build widgets
yarn build
```
