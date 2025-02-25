---
repo: CoryLR/user-routine
url: 'https://github.com/CoryLR/user-routine'
homepage: 'https://corylr.github.io/user-routine/'
starredAt: '2023-01-22T20:50:40Z'
createdAt: '2022-10-04T20:42:27Z'
updatedAt: '2024-09-05T09:54:05Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:57.813Z'
description: >-
  User-Routine is a JavaScript library to automate user routines on web pages.
  You can easily test features or create tutorials with actions such as click,
  await, and fill.
tags:
  - application
  - automated
  - click
  - e2e
  - end-to-end
  - javascript
  - routine
  - single-page
  - spa
  - spa-check
  - test
  - testing
  - typescript
  - user
  - user-routine
  - userflow
---


# User-Routine

User-Routine is a JavaScript library to automate user routines on web pages. You can easily test features or create tutorials with actions such as click, await, and fill.

✨ See the [Live Demo](https://corylr.github.io/user-routine/) ✨

Example:

```javascript
userRoutine([
  'fill form>input.name Cory',
  'click button.submit',
  'await div.result',
  'exists div With this text',
]);
```


**Table of Contents**

- [User-Routine](#user-routine)
- [Access](#access)
- [Usage](#usage)
  - [Simple Examples](#simple-examples)
  - [Input Parameter Details](#input-parameter-details)
  - [Output Details](#output-details)
  - [More Resources](#more-resources)
- [Examples](#examples)
  - [Live Demo](#live-demo)
  - [Template](#template)
  - [Use-cases](#use-cases)
- [Development](#development)
  - [Maintainers](#maintainers)
    - [Getting Started](#getting-started)
    - [Continuous Development](#continuous-development)

# Access

Options:

**1.** Install from NPM (`npm install user-routine`) and import

```javascript
import { userRoutine } from 'user-routine';
// OR
const { userRoutine } = require('user-routine');
```

**2.** Or include the User-Routine script file (`user-routine.blob.js`) in your HTML:

```html
<!-- Declares function `userRoutine` (CDN) -->
<script src="https://cdn.jsdelivr.net/gh/CoryLR/user-routine/dist/user-routine.blob.js"></script>
<!-- OR -->
<!-- Declares function `userRoutine` (local file) -->
<script src="./user-routine.blob.js"></script>

```

**3.** Or copy the portable template from here: [user-routine.template.js](./dist/user-routine.template.js)

* ^ This works with zero setup if you copy-paste the contents into a browser console or into client-side JavaScript


# Usage

User-Routine is served as a function named `userRoutine`.

## Simple Examples

Run a test:

```javascript
userRoutine([
  'click button.btn', // Target using CSS selectors
  'await div.result Result Text', // Await result text
], { message: 'Testing the button' });
```

Display a tutorial:

```javascript
userRoutine([
  'comment .some-form First, fill this out',
  'comment .submit-button Then, hit Submit!',
], { message: 'Tutorial', tutorialMode: true });
```

Customize options to run quickly and quietly:

```javascript
userRoutine([
  'fill form>input Mock input text',
  'click button.submit',
  'await div.some-expected-result',
  // etc...
], {
  message: 'Testing the button',
  displayProgress: false, // default is true
  logProgress: false, // default is true
  globalDelay: 50, // default is 500 (0.5 seconds)
  awaitTimeout: 1500, // default is 15000 (15 seconds)
});
```

## Input Parameter Details

function userRoutine(actions: *string[] OR string*, options: *UserRoutineOptions?*)

* 1: Actions List (*String* (separate actions by new lines) or *Array of strings/functions*, required)
  * Action strings & examples:
    * `append`
      * Add text to the end of an element's textContent
      * `'append section>p Appended text'`
    * `await`
      * Await for something to appear
      * `'await .modal.success-message'` or `'await h1 With This Text'`
    * `!await`
      * Await for something to disappear
      * `'!await .spinner'` or `'!await h1 This title should disappear'`
    * `click`
      * Click on something
      * `'click button.submit'` or `'click button With This Text'`
    * `comment`
      * Show a tooltip to point something out
      * `'comment input.name Type your name here'`
    * `exists`
      * Check to see if something exists in any css selector matches
      * `'exists .class-name'` or `'exists h1 With This Text'`
    * `!exists`
      * Check to see if something doesn't exist in any css selector matches
      * `'!exists h1 Incorrect text'`
    * `fill`
      * Fill the value attribute of a specific element
      * `'fill form>input.name Cory Rahman'`
    * `log`
      * Record a message
      * `'log Some message'`
    * `nav`
      * Use hash navigation
      * `'nav #id'` or `'nav #/some/hash/routing/path'`
    * `value`
      * Check the value attribute of a specific element
      * `'value input.required'` or `'value input.name Test User 1'`
    * `wait`
      * Wait for some time
      * `'wait 3000'` (3 seconds)
    * `write`
      * Overwrite textContent of an element
      * `'write p Overwritten text'`
  * Selector:
    * CSS selector like `button.class-name`
    * The CSS selector should not contain spaces by default. Either use `>>` instead of spaces like `await .container>>div Result Text`) or pass a custom action string `separator` in the Options
  * Data:
    * Required argument for `append`, `comment`, `fill`, `log`, `value`, `wait`, and `write`
    * Optional argument for `await`, `click`, `exists`, and `value`
* 2: Options (*Object*, optional)
  * `awaitTimeout`: (*default: 15000*) How long in milliseconds to wait for an element using the await command
  * `continueOnFailure`: (*default: false*) Continue to run actions even if one fails
  * `displayMessage`: (*default: true*) Show message at the top of the page
  * `displayProgress`: (*default: true*) Show animations of actions visually on the page using tooltips
  * `displaySpeed`: (*default: 1*) Animation speed for displayProgress tooltips (0.5 = half speed, 2 = double speed, etc)
  * `globalDelay`: (*default: 500*) Time between actions in milliseconds
  * `keyboardControls`: (*default: true*) Enables play/pause/stop with space and escape keys
  * `logCollapse`: (*default: false*) Initializes the console group collapsed
  * `logProgress`: (*default: true*) Show real-time progress in the browser console
  * `logResult`: (*default: true*) Show the final result in the browser console
  * `message`: (*default: 'User-Routine'*) Label to show in the console and in the DOM
  * `messageAttribution`: (*default: 'User-Routine'*) Subtitle text shown when custom message is provided
  * `overrideCss`: (*default: ''*) Override default User-Routine CSS, target classes such as .user-routine-message, .user-routine-focus-box, or .user-routine-tooltip
  * `separator`: (*default: ' ' (space)*) Choose different text to separate the different parts of the action string. For example, with `separator` set to `'; '`, you could write an action string like `'await; .container div[name="Result Box"]; Result Text'`.
  * `simultaneousAllowed`: (*default: false*) Allow the User-Routine to run even if one is already running
  * `tutorialMode`: (*default: false*) Add a "Next" button to tooltips, and only show tooltips for "log" and "comment" actions

## Output Details

* The `userRoutine` function returns a Promise resolving to type `UserRoutineReturn`:
  * `export type UserRoutineReturn = { success: boolean, log: string[], message: string, configuration: UserRoutineOptions };`
* Updates are also logged to the browser console like so:

```
[User-Routine] Message
  * Filled the value of form>input.name to 'Cory'
  * Clicked on button[type="submit"]
  * Awaiting 'div.success-message'...
  * ...Found 'div.success-message'
  * Done, success: true
  Result: { success: true, log: Array(4), message: 'Message' }
```

## More Resources

* Full documentation: https://github.com/CoryLR/user-routine#readme
* Live demo: https://corylr.github.io/user-routine/


# Examples

## Live Demo

✨ See the [Live Demo](https://corylr.github.io/user-routine/) ✨

## Template

See the [user-routine.template.js](./dist/user-routine.template.js) for examples of running multiple sequential tests using async/await. This template also works with zero setup if you copy-paste the contents into a browser console or into client-side JavaScript

## Use-cases

**Fill inputs with `fill` and interact with `click` using Selectors:**

```javascript
userRoutine([
  'fill input[type="text"] Hello, world!', // Fills in the input
  'fill input[type="number"] 20',
  'click button.some-class', // Clicks a button with class 'some-class'
  'click div With certain text', // Clicks on the given text within a div
  'click * With certain text', // Clicks on the given text regardless of containing element
  'click body>>.nested-div', // Use `>>` instead of spaces in CSS selectors
]);
```

* Note: To use spaces in CSS selectors, either replace the spaces with `>>` (like `body>>.class` instead of `body .class`) or define a custom separator using the `separator` option (like `separator: '; '`).

**Validate the DOM with `exists` and `value`:**

```javascript
userRoutine([
  'exists p.some-class', // Checks for the existence of this element
  'exists p.some-class With certain text', // Also checks if it includes certain text
  '!exists p.some-class', // Validates that the element does not exist
  '!exists p.some-class With certain text', // Validates that the element does not exist with certain text
  'value input.required', // Validates that the element has any value
  'value input.name Jane Doe', // Validates that the element has a value of "Jane Doe"
]);
```

**Deal with timing using `await` and `wait`:**

```javascript
userRoutine([
  'await div.some-popup', // Awaits the existence of this element
  'await div.some-popup With certain text', // Awaits for it to include certain text
  '!await div.some-spinner', // Awaits the non-existence of this element
  '!await div.some-popup With certain text', // Awaits for it to not include certain text
  'wait 3000', // waits 3 seconds
]);
```

* Note: The default await timeout is 15000 ms (15 seconds), overwrite using the `awaitTimeout` option.

**Navigate within a single-page application using `nav`:**

```javascript
userRoutine([
  'nav #some-id',
  'nav #/some/hash/routing/path',
  'nav #', // Back to the top
]);
```

**Add notes with `append`, `log`, and `write`:**

```javascript
userRoutine([
  'write h1 Testing successful!', // overwrites the h1's textContent
  'append h1  - Testing successful!', // appends to the h1's textContent
  'log The testing is complete.',
]);
```

**Pass options as a second argument:**

```javascript
userRoutine([
  'fill input.name Cory',
  'click button[type="submit"]',
], { globalDelay: 1000 });
// ^ Options object with 1 second between actions
```

* Note: See [Usage](#Usage) for a list of options

# Development

## Maintainers

### Getting Started

* Install dependencies for the Demo using `npm install`
* Open the Demo with the `quick-regression-test` url parameter: [docs/index.html?action=quick-regression-test](./docs/index.html?action=quick-regression-test)

### Continuous Development

* Make changes to [lib/user-routine.ts](./lib/user-routine.ts)
* Run `npm run build-local`
  * If only editing the demo itself (`demo/`), you can just run `npm run build-demo`
* To test changes, edit either [demo/regression-tests.js](./demo/regression-tests.js) or [demo/script.js](./demo/script.js)
* Open the Demo with the `quick-regression-test` url parameter: [docs/index.html?action=quick-regression-test](./docs/index.html?action=quick-regression-test)
* Before each commit, run the full `npm run build`

To publish:

1. Bump the version number in the [package.json](./package.json)
2. `npm i`
3. `npm run build`
4. Test one last time
5. Fix any issues then commit changes
6. `npm publish --access public`

TO DO:

* [ ] Add a tutorial walk-through to the demo page, using User-Routine to showcase User-Routine
* [ ] Improve tutorialMode by automating progress via `await` and other actions instead of relying on the Next button
* [ ] Separate actions into externally-callable functions
* [ ] Add global case-sensitivity option
* [ ] (Maybe) Add count action to count instances of a particular CSS selector
* [ ] (Maybe) Add copy/paste actions
* [ ] (Maybe) Add ability to keybind User-Routine(s) to keys
* [ ] (Maybe) Add copy/paste actions
