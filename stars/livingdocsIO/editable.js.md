---
repo: livingdocsIO/editable.js
url: 'https://github.com/livingdocsIO/editable.js'
homepage: 'https://livingdocsio.github.io/editable.js'
starredAt: '2022-11-29T01:46:47Z'
createdAt: '2013-03-19T15:52:01Z'
updatedAt: '2025-02-22T01:26:08Z'
language: JavaScript
license: MIT
branch: master
stars: 237
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:07.105Z'
description: Friendly contenteditable API
tags:
  - contenteditable
  - swiss-publishing
  - text-editing
---

# editable.js [![Build Status](https://drone.livingdocs.io/api/badges/livingdocsIO/editable.js/status.svg)](https://drone.livingdocs.io/livingdocsIO/editable.js)

## What is it about?

A JavaScript API that defines a friendly and browser-consistent content editable interface.

Check out the [demo](https://livingdocsio.github.io/editable.js/).
It features a formatting toolbar and the default insert, split and merge behavior that allow to add and remove content blocks like paragraphs easily.

Editable is built for block level elements containing only phrasing content. This normally means `p`, `h1`-`h6`, `blockquote` etc. elements. This allows editable to be lean and mean since it is only concerned with formatting and not with layouting.

We made editable.js to support our vision of online document editing. Have a look at [livingdocs.io](http://livingdocs.io/).

## Installation

Via npm:

```shell
npm install --save @livingdocs/editable.js
```

You can either `require('@livingdocs/editable.js')` or find a prebuilt file in the npm bundle `dist/editable.js`.

## Events Overview

- **focus**  
  Fired when an editable element gets focus.
- **blur**  
  Fired when an editable element loses focus.
- **selection**  
  Fired when the user selects some text inside an editable element.
- **cursor**  
  Fired when the cursor position changes.
- **change**  
  Fired when the user has made a change.
- **spellcheckUpdated**  
  Fired when the spellcheckService has updated the spellcheck highlights.
- **clipboard**  
  Fired for `copy`, `cut` and `paste` events.
- **insert**  
  Fired when the user presses `ENTER` at the beginning or end of an editable (For example you can insert a new paragraph after the element if this happens).
- **split**  
  Fired when the user presses `ENTER` in the middle of an element.
- **merge**  
  Fired when the user pressed `FORWARD DELETE` at the end or `BACKSPACE` at the beginning of an element.
- **switch**  
  Fired when the user pressed an `ARROW KEY` at the top or bottom so that you may want to set the cursor into the preceding or following element.
- **newline**  
  Fired when the user presses `SHIFT+ENTER` to insert a newline.


## How to use

To make an element editable:

```javascript
const editable = new Editable()
editable.add($elem)
```

#### Example for Selection Changes

In a `selection` event you get the editable element that triggered the event as well as a selection object. Through the selection object you can get information about the selection like coordinates or the text it contains and you can manipulate the selection.

In the following example we are going to show a toolbar on top of the selection whenever the user has selected something inside of an editable element.

```javascript
editable.selection((editableElement, selection) => {
  if (!selection) return toolbar.hide()

  // get coordinates relative to the document (suited for absolutely positioned elements)
  const coords = selection.getCoordinates()

  // position toolbar
  const top = coords.top - toolbar.outerHeight()
  const left = coords.left + (coords.width / 2) - (toolbar.outerWidth() / 2)
  toolbar.css({top, left}).show()
})
```

#### Dive Deeper

We haven't got around to make this documentation comprehensive enough. In the meantime you can find the API methods in [src/core.js](src/core.js) and the default implementation in [src/default-behavior.js](src/default-behavior.js).

To find out what you can do with the the editable.js `cursor` and `selection` objects see [src/cursor.js](src/cursor.js) and [src/selection.js](src/selection.js).


## Development

Setup:

```bash
# install node dependencies
npm install
```


Tasks:

```bash
# livereload server with demo app
npm start

# run tests with karma on Headless Chrome
npm run test:karma

# run tests with karma on Headless Chrome and rerun on changes
npm run test:watch

# run tests in Chrome, Firefox and Safari
npm run test:all

# javascript linting (configuration in .eslintrc)
npm run lint

# build editable.js
npm run build
```

## License

editable.js is licensed under the [MIT License](LICENSE).
