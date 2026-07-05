---
repo: BradDenver/react-static-site
url: 'https://github.com/BradDenver/react-static-site'
homepage: null
starredAt: '2015-08-24T00:11:42Z'
createdAt: '2014-12-29T23:36:30Z'
updatedAt: '2024-11-06T20:43:40Z'
language: JavaScript
license: NA
branch: master
stars: 377
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:38.435Z'
description: An experiment in generating a static site from react
tags: []
---

You can read a detailed explanation of this experiment on my [blog](http://braddenver.com/blog/2015/react-static-site.html).

## Setup
After cloning this repo run `npm install && bower install` to install dependencies

Note: dev/bundle*.js etc have been committed purely to have a complete example. they will be rewritten on run and would normally be git ignored.

## Run in dev mode
`npm start`

## Add a new post
* update [paths.js](https://github.com/BradDenver/react-static-site/blob/master/paths.js) data
* add md file in `posts/` directory

## Build for production
`npm run-script build-static`
