---
repo: dgellow/react-tinderable
url: 'https://github.com/dgellow/react-tinderable'
homepage: 'http://www.webp.ch/react-tinderable/examples/'
starredAt: '2015-09-12T01:16:53Z'
createdAt: '2015-03-08T13:13:15Z'
updatedAt: '2023-04-20T00:37:16Z'
language: JavaScript
license: MIT
branch: master
stars: 77
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:37.693Z'
description: >-
  Tinder-like swipeable component in React ** It's just a quick demo made during
  a weekend, do not use it **
tags: []
---

# react-tinderable

## Usage

Install `react-tinderable` from npm

```
npm install react-tinderable
```

In your javascript, require `react-tinderable` and render a `Tinderable` component

```javascript
var React = require('react'),
    Tinderable = require('react-tinderable');

var data = [
  {title: '', text: '', id: '', image: ''}
];

React.render(
    <Tinderable initialCardsData={data} />,
    document.body
);
```

## Dev

Clone the repo

```
git clone git@github.com:dgellow/react-tinderable.git
cd react-tinderable
```

Install dependencies

```
npm install
```

Build JSX

```
npm run build
```

or

```
npm run watch
```

Build and run examples

```
npm run examples
```

## Author

Samuel El-Borai aka dgellow, http://webp.ch
