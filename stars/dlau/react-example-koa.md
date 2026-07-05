---
repo: dlau/react-example-koa
url: 'https://github.com/dlau/react-example-koa'
homepage: ''
starredAt: '2015-06-22T01:19:10Z'
createdAt: '2014-02-18T01:23:06Z'
updatedAt: '2020-07-01T20:29:47Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:40.267Z'
description: >-
  sample koa app using react to use dynamic client/server content over the front
  end
tags: []
---

Example of a general react.js work flow/build process using koa to serve pages

Jade is used as the templating engine, you can mix and match any engine that is compatible with `co-views`

This is meant to serve as a more concrete real world type example where the jsx is rendered as part of a build process.

###Build:
--
`gulp`

###Develop (watch):
--
`gulp dev`

###Run:
--
`node --harmony-generators index.js`
You will need node 0.11.x to run this with either the `harmony` flag or `harmony-generators` flag enabled

##Directory structure:
  - components/
   -  counter.js                 
   -  counter.jsx                
  - pagejs/
   -  index.js                   
  - public/
   - js/
    -  index.js                  
  - views/
   -  index.jade                 

- components : houses the react components, these are shared between client and server. The *.jsx files are built to the corresponding .js file
- public : these are the static files
- pagejs : these modules are built with browserify to include react. All of the js files in this directory build into public/js/
- views : where we store our front end templates


###License
---
MIT
