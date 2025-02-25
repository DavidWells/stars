---
repo: brandly/react-tetris
url: 'https://github.com/brandly/react-tetris'
homepage: 'https://brandly.github.io/react-tetris/'
starredAt: '2015-03-13T15:03:31Z'
createdAt: '2014-12-03T07:30:48Z'
updatedAt: '2025-02-08T19:47:29Z'
language: TypeScript
license: MIT
branch: master
stars: 139
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:47.809Z'
description: ':video_game: by popular demand'
tags:
  - hacktoberfest
---

# react-tetris

![Build Status](https://github.com/brandly/react-tetris/workflows/.github/workflows/test.yml/badge.svg)

> Embed a game of Tetris in your React app

```shell
$ npm install --save react-tetris
```

[view demo](https://brandly.github.io/react-tetris/)

## usage

```js
const React = require('react');
const Tetris = require('react-tetris');

const App = () => (
  <div>
    <h1>Tetris</h1>
    <Tetris
      keyboardControls={{
        // Default values shown here. These will be used if no
        // `keyboardControls` prop is provided.
        down: 'MOVE_DOWN',
        left: 'MOVE_LEFT',
        right: 'MOVE_RIGHT',
        space: 'HARD_DROP',
        z: 'FLIP_COUNTERCLOCKWISE',
        x: 'FLIP_CLOCKWISE',
        up: 'FLIP_CLOCKWISE',
        p: 'TOGGLE_PAUSE',
        c: 'HOLD',
        shift: 'HOLD'
      }}
    >
      {({
        HeldPiece,
        Gameboard,
        PieceQueue,
        points,
        linesCleared,
        state,
        controller
      }) => (
        <div>
          <HeldPiece />
          <div>
            <p>Points: {points}</p>
            <p>Lines Cleared: {linesCleared}</p>
          </div>
          <Gameboard />
          <PieceQueue />
          {state === 'LOST' && (
            <div>
              <h2>Game Over</h2>
              <button onClick={controller.restart}>New game</button>
            </div>
          )}
        </div>
      )}
    </Tetris>
  </div>
);
```

include some styles

```css
.game-block {
  margin: 0;
  padding: 0;
  width: 1.5em;
  height: 1.5em;
  border: 1px solid #ddd;
}
.piece-i {
  background-color: #ec858b;
}
.piece-j {
  background-color: #f1b598;
}
.piece-l {
  background-color: #f8efae;
}
.piece-o {
  background-color: #b5a677;
}
.piece-s {
  background-color: #816e56;
}
.piece-t {
  background-color: #b77c72;
}
.piece-z {
  background-color: #e3be58;
}
.piece-preview {
  background-color: #eee;
}
```

## dev

```shell
$ npm run build
$ npm run watch
$ npm test
```
