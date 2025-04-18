---
repo: JannesMeyer/TabAttack
url: 'https://github.com/JannesMeyer/TabAttack'
homepage: ''
starredAt: '2015-02-17T19:52:17Z'
createdAt: '2015-02-09T22:24:36Z'
updatedAt: '2024-11-26T18:26:44Z'
language: TypeScript
license: AGPL-3.0
branch: master
stars: 191
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:51.739Z'
description: Advanced Tab management
tags: []
---

# TabAttack Browser Extension

Save browser memory by exporting your tabs as Markdown. The extension allows you to edit the document in a text editor before you save it.

Later, you can import these Markdown documents and restore all windows exactly like they were before.

## Installation

Get the extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/tabattack/ginflokhdahakklidfjlogllkkhokidj).

## Features

The extension adds a tab counter to the toolbar:

![Tab counter](https://cloud.githubusercontent.com/assets/704336/6197251/9ea23dbe-b3e2-11e4-9e96-92f5f2783b85.png)

When you click it, you will see an overview of all tabs (organized by window) that you have open:

![Exported tabs](https://cloud.githubusercontent.com/assets/704336/6196991/056f4392-b3df-11e4-871e-33ed649db893.png)

You can now edit the document as you wish. After that you can:

- Download the current state of the editor as a *.md file

- Close all tabs (except the current one)

- Open a file that you saved earlier (drag and drop on top of the editor also works)

- Re-open all links as individial tabs that are currently in the editor. This will restore each unordered list in its own window. This whole acion only works if all links are inside of an unordered list, though.

There are keyboard shortcuts for these actions:

Action | OS X | Windows
-------|------|--------
Download | ⌘S | Ctrl+S
Close all tabs | ⌘Q | Ctrl+Q
Open a file | ⌘O | Ctrl+O
Open all links | ⇧⌘O | Ctrl+Shift+O
Copy the whole document | ⌘C | Ctrl+C

Furthermore, there are [many keyboard shortcuts for text editing inside the Ace editor](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts).

## Tab management keyboard shortcuts

This extension also adds a few useful, general tab management keyboard shortcuts. Most of them have to be set manually by going to “Keyboard shortcuts” at the bottom of [chrome://extensions/](chrome://extensions/).

![Keyboard shortcut overview](https://cloud.githubusercontent.com/assets/704336/6196998/16341fe0-b3df-11e4-8dcb-a58665ffd354.png)

## Building

Clone the repository:

~~~bash
git clone https://github.com/JannesMeyer/TabAttack.git
~~~

Install the dependencies:

~~~bash
cd TabAttack/
npm install
~~~

Build and watch for changes (you need to have [webpack](https://www.npmjs.com/package/webpack) installed globally):

~~~bash
webpack -w
~~~

## Contributing

Pull requests and bug reports are welcome. If you submit a pull request, please try to match the code formatting of the rest of the project. Some examples:

- Tabs for indentation
- Spaces before the parentheses of control structures (e.g. `if (true)` instead of `if(true)`)
- Curly braces on the same line
- etc.

## Acknowledgments

Icon shape based on [Diamond by Catia Marsh Mallow from the Noun Project](https://thenounproject.com/term/star/28082/)

Special thanks to these projects:

- [Ace](https://ace.c9.io/)
- [React](https://reactjs.org/)
- [marked](https://github.com/markedjs/marked)

Icons from Firefox (MPL v2):

 - /icons/firefox/extension.svg
 - /icons/firefox/tab.svg
 - /icons/firefox/tab-audio-muted.svg
 - /icons/firefox/tab-audio-playing.svg
 - /icons/firefox/tab-loading.png
 - /icons/firefox/tab-loading@2x.png

## License

[Affero GPL v3](https://spdx.org/licenses/AGPL-3.0-only.html)

## Todo

- Tab move, tab discard
- Fix keyboard selection
	- Use keybinding library
	- Add popup with keyboard shortcuts
- Figure out why discarding resets the TabId
- Style indicator for: audio, muted, ...
- "open links" doesn't work with file:, moz-extension:, about:, chrome:
- Add "ignore protocols" option
- "1 Tab" instead of "1 Tabs" in tab list
- Find icons for:
  - Search
	- URL view (settings)
	- Export
	- Import
	- Help
