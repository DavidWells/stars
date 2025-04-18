---
repo: christianalfoni/react-app-boilerplate
url: 'https://github.com/christianalfoni/react-app-boilerplate'
homepage: null
starredAt: '2015-01-06T21:29:43Z'
createdAt: '2014-08-17T16:52:54Z'
updatedAt: '2025-02-25T10:59:35Z'
language: JavaScript
license: NA
branch: master
stars: 301
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:56.625Z'
description: React application boilerplate
tags: []
---

## React App Boilerplate

Start developing React JS applications easily with the included tooling. Using gulp with browserify and jasmine for testing.

Read more about how it works at: [React JS workflow, part 2](http://christianalfoni.github.io/javascript/2014/10/30/react-js-workflow-part2.html)

### Notes
The boilerplate is minimalistic, meaning you have to expand on the current workflow for handling static assets etc.

### Install

* Clone the repo
* Run `npm install`

### Changes

**2.2.3**
  - Now works with React 0.13.1 (Thanks to @fatso83)

**2.2.2**
  - Added es5 shim to testrunner-phantom.js html as phantomJS does not have bind etc.

**2.2.1**

  - Updated package.json dep versions

**2.2.0**

  - Using gulp-watch instead of gulp.watch, now reacts to adding and deleting files

**2.1.0**

  - Fixed watch bug
  - Deploy does not include react-addons

### Development
* Run `NODE_ENV=development gulp`
* Go to `localhost:8889` to display the app
* Go to `localhost:8889/testrunner.html` to see your tests
* Any changes to `app` or `styles` folder will automatically rebuild to `build` folder
* Both tests and application changes will refresh automatically in the browser
* Run `gulp test` to run all tests with phantomJS and produce XML reports

### Minify the code, ready for production
* Run `NODE_ENV=production gulp deploy`

### Directory
* **build/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **styles/**: Where you put your css files
* **specs/**: Where you put your test files
* **gulpfile**: Gulp configuration
