---
repo: rishichawda/markdown-magic-build-badge
url: 'https://github.com/rishichawda/markdown-magic-build-badge'
homepage: 'https://www.npmjs.com/package/markdown-magic-branch-badge'
starredAt: '2022-10-08T21:34:05Z'
createdAt: '2018-11-02T13:54:27Z'
updatedAt: '2022-10-08T21:34:05Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:26.329Z'
description: >-
  :confetti_ball: A plugin to update your branch badges to point to correct
  branch status. You can use it in a script or as a git hook or directly from
  the command line itself!
tags:
  - badges
  - circleci
  - codecov
  - markdown
  - markdown-magic
  - travis-ci
---

[![npm package](https://img.shields.io/npm/v/markdown-magic-branch-badge/latest.svg?style=flat-square)](https://www.npmjs.com/package/markdown-magic-branch-badge)
[![npm downloads](https://img.shields.io/npm/dt/markdown-magic-branch-badge.svg?style=flat-square)](https://www.npmjs.com/package/markdown-magic-branch-badge)
[![GitHub issues](https://img.shields.io/github/issues/rishichawda/markdown-magic-build-badge.svg?style=flat-square)](https://github.com/rishichawda/markdown-magic-build-badge)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/markdown-magic-branch-badge.svg?style=flat-square)](https://www.npmjs.com/package/markdown-magic-branch-badge)
![GitHub](https://img.shields.io/github/license/rishichawda/markdown-magic-build-badge.svg?style=flat-square)

![David](https://img.shields.io/david/rishichawda/markdown-magic-build-badge.svg?style=flat-square)
![David](https://img.shields.io/david/dev/rishichawda/markdown-magic-build-badge.svg?style=flat-square)

## markdown-magic-branch-badge

![demo](https://github.com/rishichawda/markdown-magic-build-badge/blob/master/example/demo.gif)

:star2: A plugin to update your branch badges to point to correct branch status via [markdown-magic](https://github.com/DavidWells/markdown-magic).

Supports all major vendors like [TravisCI](http://travis-ci.org/), [Codecov](https://codecov.io/), [CircleCI](https://circleci.com/) and many more that provide code repository status images and badges for readme files. :tada:

---

### Installation :

```
npm i markdown-magic markdown-magic-branch-badge --save-dev
``` 
### Usage :

Create a file `update-readme.js` in your project directory.

```
const path = require('path');
const transformMarkdown = require('markdown-magic');
const badgePlugin = require('markdown-magic-branch-badge');

const config = {
  transforms: {
    badgePlugin,
  },
};

function callback() {
  console.log('ReadME generated.');
}

const markdownPath = path.join(__dirname, 'README.md');
transformMarkdown(markdownPath, config, callback);
```

<br />Create a file, `example-template` with your template.

```
[![Travis (.org)](https://img.shields.io/travis/user/repo/{current_branch}.svg)](https://travis-ci.org/user/repo)
[![Some other badge](https://img.shields.io/somebadge/user/repo/{current_branch}.svg)](https://some_badge_url.com/user/repo)
```

You can use your custom placeholders through `placeholder` parameter. For the complete list of parameters, see [here](#config-options). <br/>If there is no `placeholder` parameter specified in your `README.md` file, the plugin will look for the default placeholder, i.e., `current_branch`.

**NOTE:** Placeholders must be wrapped in curly braces inside the template.




<br />On your `README.md` add the following lines :
```
<!-- AUTO-GENERATED-CONTENT:START (badgePlugin:src=./example-template) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```

This indicates the plugin to add the badges between these comments in your readme file.

If you are using your own placeholder, you can specify it like this :

```
<!-- AUTO-GENERATED-CONTENT:START (badgePlugin:src=./example-template&placeholder=my_custom_placeholder) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```




<br />Now, go to the terminal and run:

```
markdown-badge -u ./update-readme.js
```

After running this command, now you should see the updated `README.md` with the badges according to your branch name.<br/>

---



### Config options

| Option | Description |
| ------------- | ------------- |
| src | Relative path to the template file. ( **Required** )  |
| addNewLine  | Specify whether to add a new line at the end of the written output. By default, it is set to `false`. |
| placeholder | Specify a custom placeholder for updating branch names.  |
<br />

---

##### Usage options:

Use it in `pre-commit` and `post-checkout` hooks to keep your branches updated with the correct badge URLs.

To add a post-checkout hook via command-line, run `markdown-badge -g` in your project root and it will add it to the post-checkout hook to your repository.

<br />



If you have any queries or requests, feel free to open an issue [here](https://github.com/rishichawda/markdown-magic-build-badge/issues) or open a pull request if you want to contribute! 
