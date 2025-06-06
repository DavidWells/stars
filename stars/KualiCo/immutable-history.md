---
repo: KualiCo/immutable-history
url: 'https://github.com/KualiCo/immutable-history'
homepage: null
starredAt: '2015-01-09T06:16:17Z'
createdAt: '2014-10-29T17:29:26Z'
updatedAt: '2023-03-21T16:00:38Z'
language: JavaScript
license: MIT
branch: master
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:54.334Z'
description: History-tracking wrapper for Immutable.js collections and cursors
tags: []
---

# immutable-history

immutable-history is a library for easily interacting with cursors to
[Immutable.js](https://github.com/facebook/immutable-js) collections while
maintaining a stack of previous states. This is useful for implementing undo
among other things.

You need to understand the Immutable.js api for cursors and collections for
this to be useful to you.

It is inspired by ideas from [om](https://github.com/swannodette/om) and works
great with [React](https://github.com/facebook/react) but you can use it for
`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ A N Y T H I N G (ಥ﹏ಥ)`!


## Installation

```bash
npm i --save immutable-history
```

## Usage

```JavaScript
var History = require('immutable-history');

// called with the updated cursor whenever the history changes
function render(cursor) {
  // pass subcursors from the cursor down through your app hierachy and watch
  // the changes magically propogate
  console.log('rendering');
  setTimeout(function() {
    var powers = cursor.get(['powers']);
    if (powers.size < 5) {
      powers.update(function(oldValue) {
        return oldValue.push('EVEN MORE MUSCLES');
      });
    } else {
      // go back to the previous state of the cursor
      history.undo()
    }
  }, 500);
  console.log(cursor);
}

var history = new History({name: 'Jamison', powers: ['flight', 'telekinesis', 'the power to move you']}, render);
```

This creates a history object with an initial state, and a render function that
is called whenever the state is updated. The history object stores a stack
of all previous states, so you can undo back through the previous states.

Any changes to the data in the cursor will trigger the callback again. This
is useful with react, where you need to re-render some component heirarchy
when your app state changes.
