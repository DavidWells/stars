---
repo: PierrickGT/PCGB
url: 'https://github.com/PierrickGT/PCGB'
homepage: null
starredAt: '2016-07-20T19:56:07Z'
createdAt: '2016-06-17T09:27:12Z'
updatedAt: '2019-10-11T03:15:40Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:20.896Z'
description: 'PCGB: a simple PostCSS boilerplate to kickstart your static website project'
tags:
  - boilerplate
  - gulpfile
  - postcss
---

![PCGB Logo](https://cloud.githubusercontent.com/assets/2401738/16187424/8d73da1c-36d0-11e6-90ad-90a30bd35150.png)

PCGB: a simple PostCSS boilerplate to kickstart your static website project

## Prerequisite

You need to have the following softwares installed in order to run this project.

Git: https://git-scm.com/downloads

Node.js: https://nodejs.org/en/

## Installation

First, you need to clone the project on your computer by typing the following command in your terminal
```
git clone git@github.com:PierrickGT/PCGB.git
```
Then, you need to install the dependencies with this command
```
npm install
```
## Build

To build the project, run this command
```
npm run build
```
Your rendered site is then available in the public folder.

## Launch

You can then launch your local server with the command
```
npm start
```

## Deployment

To deploy your static site on Github pages, you first need to write the Github URL of your project at the line 54 of gulpfile.js in order to change the base url of PostCSS Assets.
```
baseUrl: '', // Write your Github URL here
```

Read the doc for further informations: https://github.com/assetsjs/postcss-assets#base-url

Then, you have to write the name of your Github repository at the line 100 of gulpfile.js  to add the path of your Github project to each href.
```
.pipe($.replace('href="/', 'href="/name-of-your-repository/')) // Write your Github repository name here
```

In order to deploy on Github Pages, you need to have a gh-pages branch that you can create by typing the following commands:
```
git checkout --orphan gh-pages
git rm -rf .
touch README.md
git add README.md
git commit -m "Init gh-pages"
git push --set-upstream origin gh-pages
git checkout master
```

Finally, you can deploy your static site on Github Pages with the command
```
npm run deploy
```
## Structure

```
├── public/
│   ├── assets/
│   │   ├── favicon/
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── js/
│   │   ├── stylesheets/
│   ├── index.html
├── source/
│   ├── css/
│   ├── favicon/
│   ├── fonts/
│   ├── html/
│   ├── images/
│   ├── js/
│   ├── index.html
├── gulpfile.js
├── package.json
```

## Dependencies

The following dependencies have been used.

### HTML

#### Gulp HTML Tag Include
https://github.com/zaharin/gulp-html-tag-include

### PostCSS

#### Autoprefixer
https://github.com/postcss/autoprefixer

#### CSS Nano
http://cssnano.co

#### CSS Next
http://cssnext.io

#### PreCSS
https://github.com/jonathantneal/precss

#### PostCSS Assets
https://github.com/assetsjs/postcss-assets

#### Sourcemaps
https://github.com/floridoo/gulp-sourcemaps

### Javascript

#### Concatenation
https://github.com/contra/gulp-concat

#### Minification
https://github.com/terinjokes/gulp-uglify

#### Sourcemaps
https://github.com/floridoo/gulp-sourcemaps

### Images

#### Minification
https://github.com/sindresorhus/gulp-imagemin

#### Cache
https://github.com/jgable/gulp-cache

### Static server

#### Browsersync
https://www.browsersync.io/docs/gulp/
