---
repo: ingram-projects/animxyz
url: 'https://github.com/ingram-projects/animxyz'
homepage: 'https://animxyz.com'
starredAt: '2022-02-18T07:21:50Z'
createdAt: '2020-05-03T23:22:04Z'
updatedAt: '2025-02-20T13:44:46Z'
language: SCSS
license: MIT
branch: master
stars: 2460
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:17.808Z'
description: >-
  The first truly composable CSS animation library. Built for Vue, React, SCSS,
  and CSS, AnimXYZ will bring your website to life.
tags:
  - animation
  - animxyz
  - composable-animations
  - css
  - css-animations
  - css-framework
  - functional-css
  - react
  - scss
  - vue
---

<p align="center"><a href="https://animxyz.com"><img src="https://raw.githubusercontent.com/ingram-projects/animxyz/master/docs/src/assets/images/animxyz-logo.svg" alt="AnimXYZ Logo" height="160"><a></p>

<h1 align="center">AnimXYZ</h1>

[![npm version](https://badge.fury.io/js/%40animxyz%2Fcore.svg)](https://www.npmjs.com/package/@animxyz/core)

[animxyz.com](https://animxyz.com)

AnimXYZ helps you create, customize, and compose animations for your website. Powered by CSS variables to allow a nearly limitless number of unique animations without writing a single keyframe. Save time and have complete control over how your elements move. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring your website to life.

For example here is how you make an element fade and shrink in from above:

```html
<div class="xyz-in" xyz="fade up big">I will animate in!</div>
```
Changing the class to `xyz-out` reverses the direction of the animation:

```html
<div class="xyz-out" xyz="fade up big">I will animate out!</div>
```
[See it in action here](<https://animxyz.com/docs?tab=examples&example=Example 1#the-basics>)

For simple animations, that's all you need, but AnimXYZ can do so much more! [Check out the AnimXYZ docs!](https://animxyz.com/docs)

---
## Installation

### Using a package manager

AnimXYZ can be installed using your favorite package manager:

```bash
# with npm
npm install @animxyz/core

# with yarn
yarn add @animxyz/core
```

After installation, you will need to import AnimXYZ into your project.

#### Import into a Webpack project
If your Webpack project uses `css-loader` you can import the CSS by putting this snippet anywhere in your javascript code:

```js
import '@animxyz/core'
```

#### Import into a SASS project
AnimXYZ is built in SASS and provides useful functions and mixins for customization. Import it anywhere in your SASS code:

```scss
// Import the functions/mixins
@import '@animxyz/core';

// Add all the core/utilities selectors
@include xyz-all;
// --- Or for more control and granularity ---
@include xyz-core;
@include xyz-utilities;
```

---
### Using jsDelivr

To add AnimXYZ using a CDN put this link in the `<head>` of your `index.html` file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@animxyz/core">
```

---
### Vue & React

 If you are using AnimXYZ in a Vue or React project we strongly recommend you also use our AnimXYZ components. To add those, follow the installation instructions in the relevant sections [Vue](https://animxyz.com/docs/#vue-installation) and [React](https://animxyz.com/docs/#react-installation).

---
## Made By

Miles Ingram • [GitHub](https://github.com/milesingrams) • [Website](https://milesingram.me)

Mattan Ingram • [GitHub](https://github.com/mattaningram) • [Website](https://mattaningram.com)
