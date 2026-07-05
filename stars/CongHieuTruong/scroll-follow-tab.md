---
repo: CongHieuTruong/scroll-follow-tab
url: 'https://github.com/CongHieuTruong/scroll-follow-tab'
homepage: ''
starredAt: '2022-06-20T22:28:43Z'
createdAt: '2022-06-15T06:12:50Z'
updatedAt: '2024-05-09T00:04:12Z'
language: JavaScript
license: MIT
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:40.710Z'
description: "\U0001F680 Scroll Follow Tab is a lightweight javascript library without jQuery, no dependencies. It is used to make scrollspy effect for your menu, etc.."
tags: []
---

# Scroll Follow Tab

[Scroll Follow Tab](https://github.com/Cong-Hieu/scroll-follow-tab) is a lightweight javascript library without jQuery,
no dependencies. It is used to make scrollspy effect for your menu, table of contents, etc.
Only 21.7Kb.

## Install

1. Via NPM:

Install NPM package - https://www.npmjs.com/package/scroll-follow-tab:

```npm
npm i scroll-follow-tab
```

## Usages

Easy for using, Demo here:
👉 https://codesandbox.io/s/objective-tharp-3zwo8h?file=/src/App.js

or syntax just like this:

```html
scrollSpy(menuElement, options)
```

This little plugin will add `active` class into your existing menu item when you scroll your page to a matched section by ID.
If you are giving it a try, make sure that you:

1. Added CSS for `active` class in your menu item. Because, this plugin do NOT include CSS.
2. Added ID for your sections.
   Example: `<section id="first-section">...</section>`
3. Added an attribute which is an section ID into your menu items. Default is `href`.
   Example: `"href"="#first-section"`.
   You also replace `href` with the other name by `hrefAttribute` in `options`.

### Arguments

1. The `menuElement` is query selector to your menu. It is `String` or `HTMLElement` instance.
2. The `options` is optional. It is type of `Object` which contains properties below:

| Name                   | Type                | Default      | Description                                              |
| ---------------------- | :------------------ | :----------- | :------------------------------------------------------- |
| `sectionClass`         | String              | `.scrollspy` | Query selector to your sections                          |
| `menuActiveTarget`     | String              | `li > a`     | Element will be added active class                       |
| `offset`               | Number              | 0            | Offset number                                            |
| `hrefAttribute`        | String              | `href`       | The menu item's attribute name which contains section ID |
| `activeClass`          | String              | `active`     | Active class name will be added into `menuActiveTarget`  |
| `scrollContainer`      | String, HTMLElement | empty string | User Defined Scrolling Container                         |
| `smoothScroll`         | Boolean, Object     | `false`      | Enable the smooth scrolling feature                      |
| `smoothScrollBehavior` | Function            | `undefined`  | Define your smooth scroll behavior                       |

### ES6 example

```js
import scrollSpy from 'scroll-follow-tab'

const options = {
  sectionClass: '.scrollspy', // Query selector to your sections
  menuActiveTarget: '.menu-item', // Query selector to your elements that will be added `active` class
  offset: 100, // Menu item will active before scroll to a matched section 100px
  scrollContainer: '.scroll-container' // Listen scroll behavior on `.scroll-container` instead of `window`
}

// init:
scrollSpy(document.getElementById('main-menu'), options)

// or shorter:
scrollSpy('#main-menu', options)
```

### Inject static file

```html
<script src="/path/to/dist/simple-scrollspy.min.js"></script>
<script>
  window.onload = function () {
    scrollSpy('#main-menu', {
      sectionClass: '.scrollspy',
      menuActiveTarget: '.menu-item',
      offset: 100,
      // smooth scroll
      smoothScroll: true,
      smoothScrollBehavior: function (element) {
        console.log('run "smoothScrollBehavior"...', element)
        element.scrollIntoView({ behavior: 'smooth' }) // default behavior
      }
    })
  }
</script>
```

### Smooth scroll

```javascript
import jumpTo from 'jump.js'

scrollSpy('#main-menu', {
  // ....,

  // enable smooth scroll:
  // - true: enable with the default scroll behavior
  // - false: disable this feature
  // - object: enable with some options that will pass to `Element.scrollIntoView` or `smoothScrollBehavior`
  //   + Default behavior: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  //   + Jump.js: https://www.npmjs.com/package/jump.js
  smoothScroll: true,

  // customize scroll behavior,
  // - default: Element.scrollIntoView({ ...smoothScroll, behavior: 'smooth' })
  // - customize: you can define your scroll behavior. Ex: use `jump.js`, jQuery, .etc
  smoothScrollBehavior: function (element, options) {
    // use `jump.js` instead of the default scroll behavior
    jumpTo(element, {
      duration: 1000,
      offset: -100
    })
  }
})
```

## Development

```bash
$ npm install
$ npm run dev
```

## Build

```bash
$ yarn build
```

or:

```npm
$ npm run build
```

## Note

- Feel free to make a pull request if you can, and create a Github issue if you come across one.
- Don't forget to give a star if you feel that the library is helpful to you. It may save somebody a lot of trouble some day.

## Helpful links

- [Documentation](https://github.com/Cong-Hieu/scroll-follow-tab#readme)
- [Example](https://codesandbox.io/s/objective-tharp-3zwo8h?file=/src/App.js)
- [See on NPM package](https://www.npmjs.com/package/scroll-follow-tab)

## Licence

[MIT](./LICENSE)
