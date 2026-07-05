---
repo: TimDaub/preact-touchable-dock
url: 'https://github.com/TimDaub/preact-touchable-dock'
homepage: ''
starredAt: '2020-12-07T17:30:13Z'
createdAt: '2020-07-15T15:11:42Z'
updatedAt: '2023-02-15T19:32:43Z'
language: JavaScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:18.307Z'
description: A touch and drag and droppable dock for single page web applications.
tags: []
---

# preact-touchable-dock
[![npm version](https://badge.fury.io/js/preact-touchable-dock.svg)](https://badge.fury.io/js/preact-touchable-dock)

> A touch and drag and droppable dock for single page web applications.

Mobile|Simulated Mobile
:-------------------------:|:-------------------------:
![](./assets/demo-touch.gif)  |  ![](./assets/demo-touch-simulated.gif)

## Installation

```bash
$ npm i --save preact-touchable-dock
# or
$ yarn add preact-touchable-dock
```

## Usage

- [Demo](https://jsfiddle.net/bkcu1qfj/1/)

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Touchable Dock Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://unpkg.com/preact@10.4.6/dist/preact.min.js"></script>
    <script src="https://unpkg.com/htm@3.0.4/dist/htm.js"></script>
    <script src="https://unpkg.com/jss/dist/jss.min.js"></script>
    <script src="https://unpkg.com/jss-preset-default/dist/jss-preset-default.min.js"></script>
    
    <script src="./TouchableDock.min.js"></script>
    <script type="module">
      const { h, Component, render, createRef } = preact;
      const htm = window.htm;

      const html = htm.bind(h);

      class ControllableDock extends Component {
        constructor(props) {
          super(props);

          this.dock = createRef();  
          this.state = {
            stage: "hide"
          }
        }

        render() {
          const { stage } = this.state;
          return html`
            <h1>Hello World</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
            <button onClick=${() => this.dock.current.setStage("hide")}>hide</button>
            <button onClick=${() => this.dock.current.setStage("hint")}>hint</button>
            <button onClick=${() => this.dock.current.setStage("full")}>full</button>
            <${TouchableDock}
              ref=${this.dock}
              onClose=${() => console.log("Dock was closed")}
              onClick=${() => console.log("Dock was clicked")}
              style=${{
                borderTop: "5px solid green",
                backgroundColor: "white"
              }}>
              <h2>This is a dock text</h2> 
            <//>
          `;
        }
      }

      render(html`<${ControllableDock} />`, document.body);
  </script>
  </head>
  <body>
  </body>
</html>
```

### Notes

- `TouchableDock` inserts inline classes via [JSS](https://cssinjs.org). This
allows users to customize its style by adjusting classes like  `.touchableDock`
and `.touchableDockHandle`.
- Changing the dock's stage works by calling the `setStage` method through a
ref. Possible values are `["hide", "hint", "full"]`.
- `props.onClose` allows to listen for close events emitted from the dock.

## Contributing

```bash
$ git clone git@github.com:TimDaub/preact-touchable-dock.git
$ cd preact-touchable-dock
$ npm i
$ npm run dev
```

## Changelog

### 0.3.5

- Bug fix: Don't allow scrolling of body in `stage === full`

### 0.3.4

- Added `onClick` prop

### 0.3.3

- Forgot to update the build lol

### 0.3.2

- Bug fix: `Uncaught ReferenceError: pageY is not defined`

### 0.3.1

- Bug fix: Allow other components to receive touch and mouse movement event by
conditionally applying `evt.preventDefault`
- Bug fix: Allow adjusting dock's height in scrolled position

### 0.3.0

- Unmount children when component is in `stage === "hide"` to allow usage of
`componentWillUnmount` in child

### 0.2.2

- Add `onClose` prop to component for listening to close events.

### 0.2.1

- Add closing action button

### 0.2.0

- Deprecate changing `stage` through props and allow only through new method 
called `setStage`

### 0.1.0

- Deliver CSS classes as JS-generated inline classes using JSS

### 0.0.1

- Initial release
