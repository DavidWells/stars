---
repo: dceddia/github-issues-viewer
url: 'https://github.com/dceddia/github-issues-viewer'
homepage: null
starredAt: '2019-07-09T16:54:38Z'
createdAt: '2017-07-24T18:47:16Z'
updatedAt: '2022-12-22T17:45:50Z'
language: JavaScript
license: NA
branch: master
stars: 70
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:30.155Z'
description: A React + Redux project demonstrating how to interface with the Github API
tags:
  - github
  - react
  - redux
---

# Github Issues

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Read on for how to run and test the app.

## Run The App

```
yarn    # or 'npm install'
yarn start
```

It will open up a browser to [http://localhost:3000](http://localhost:3000).

## Run The Tests

```
CI=true yarn test
```

The `CI=true` is not required, but it will enter watch mode unless that flag is present.

## Bonus Features

#### View Any repo

While the app defaults to viewing the issues for `rails/rails`, it will work with any org/repo combo. With the app running, try these:

* [http://localhost:3000/facebookincubator/create-react-app/issues](http://localhost:3000/facebookincubator/create-react-app/issues)
* [http://localhost:3000/facebook/react/issues](http://localhost:3000/facebook/react/issues)
* [http://localhost:3000/twbs/bootstrap/issues](http://localhost:3000/twbs/bootstrap/issues)

#### Markdown Summaries and Comments

The full issue summaries and comments are passed through the `react-markdown` component to make them nicer to read.

Try this one: [http://localhost:3000/rails/rails/issues/27224](http://localhost:3000/rails/rails/issues/27224)

#### Loading Placeholders

While the issue list is loading, placeholder issues are displayed for a smoother UX.

Try any repo's issues page:

* [http://localhost:3000/facebookincubator/create-react-app/issues](http://localhost:3000/facebookincubator/create-react-app/issues)
* [http://localhost:3000/facebook/react/issues](http://localhost:3000/facebook/react/issues)
* [http://localhost:3000/twbs/bootstrap/issues](http://localhost:3000/twbs/bootstrap/issues)
