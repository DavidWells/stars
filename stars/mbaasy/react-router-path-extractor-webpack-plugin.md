---
repo: mbaasy/react-router-path-extractor-webpack-plugin
url: 'https://github.com/mbaasy/react-router-path-extractor-webpack-plugin'
homepage: 'https://www.npmjs.com/package/react-router-path-extractor-webpack-plugin'
starredAt: '2016-09-08T16:34:41Z'
createdAt: '2016-08-18T18:14:12Z'
updatedAt: '2018-09-25T02:33:32Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:19.501Z'
description: Webpack plugin to extract paths from React Router
tags: []
---

# React Router Path Extractor Webpack Plugin

[![Build Status](https://travis-ci.org/mbaasy/react-router-path-extractor-webpack-plugin.svg?branch=master)](https://travis-ci.org/mbaasy/react-router-path-extractor-webpack-plugin) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![dependencies Status](https://david-dm.org/mbaasy/react-router-path-extractor-webpack-plugin/status.svg)](https://david-dm.org/mbaasy/react-router-path-extractor-webpack-plugin) [![devDependencies Status](https://david-dm.org/mbaasy/react-router-path-extractor-webpack-plugin/dev-status.svg)](https://david-dm.org/mbaasy/react-router-path-extractor-webpack-plugin?type=dev)

## Introduction

This plugin is designed to work with [StaticSiteGeneratorWebpackPlugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin) and [SitemapPlugin](https://github.com/markdalgleish/static-site-generator-webpack-plugin). It has no standalone functionality other than to precompile a [React Router](https://github.com/reactjs/react-router) routes file and pass the discovered `paths` into a callback function.

The callback function expects a return value consisting of an array of webpack plugins to be applied to your compiler once the paths have been resolved.

## How it works

It adds a [`make`](http://webpack.github.io/docs/plugins.html#make-parallel) plugin to separately compile your routes file using the `loaders` specified in your config.

Once compiled it executes the code in a [`vm`](https://nodejs.org/api/vm.html) and runs [`ReactRouter.createRoutes`](https://github.com/reactjs/react-router/blob/master/docs/API.md#createroutesroutes) on the `module.exports.routes` named export. Finally it executes the callback function, passing the flattened paths into it.

The compiler respects your loaders and is indifferent to how you build your routes. i.e. you can use a combination of [`<Route>`](https://github.com/reactjs/react-router/blob/master/docs/API.md#route) and [`PlainRoute`](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) to describe your routes.

## Signature

```javascript
new ReactRouterPathExtractorWebpackPlugin(
  routesFile: String|{routesFile: String},
  options?: {routesFile?: String},
  callback: (paths: Array<String>) => Array<InstanceOfPlugin>
)
```

## Usage

Have a look at [test suite](test) for a complete example.

#### webpack.config.js
```javascript
var webpack = require('webpack')
var ReactRouterPathExtractorWebpackPlugin = require('react-router-path-extractor-webpack-plugin')
var StaticSiteGeneratorWebpackPlugin = require('static-site-generator-webpack-plugin')
var SitemapWebpackPlugin = require('sitemap-webpack-plugin')

module.exports = webpack({
  entry: {
    main: ['./src/entry.js']
  },
  output: {
    path: path.resolve(__dirname, '_dist'),
    filename: '[name].[hash].js',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new ReactRouterPathExtractorWebpackPlugin(
      './src/routes.js',
      function (paths) {
        /*
         The callback receives a flat array of paths, e.g.
         [
           '/',
           '/about',
           '/about/contact'
         ]

         Return an array of path dependent webpack plugins in the callback and let
         them do all the hard work:
        */
        return [
          new StaticSiteGeneratorWebpackPlugin('main', paths),
          new SitemapWebpackPlugin('http://example.com', paths)
        ]
      }
    )
  ]
})
```

#### routes.js
```javascript
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

// Important: Your routes must be a named export called "routes":
// es5: module.exports.routes = ...
export const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} title='Home' />
    <Route path='about'>
      <IndexRoute component={About} title='About' />
      <Route path='contact' component={Contact} title='Contact' />
    </Route>
    // Exclude paths by adding the staticExclude prop:
    <Route path='exclude_this_path' staticExclude>
      // Child routes will included unless staticExclude is specified.
      <Route path='but_not_this_one' />
    </Route>
    // This catch-all will resolve to /error/index.html
    // staticName will default to '404', i.e. /404/index.html
    <Route path='*' component={NotFound} staticName='error' />
  </Route>
)

// You can always export the routes as default too for use elsewhere.
export default routes
```

## Dynamic Routing

[Dynamic Routing](https://github.com/reactjs/react-router/blob/1.0.x/docs/guides/advanced/DynamicRouting.md) may be possible using a hashHistory Router within a Route component or by adding a catch-all and a bit nginx config. Example coming soon.

## Report an Issue

* [Bugs](https://github.com/mbaasy/react-router-path-extractor-webpack-plugin/issues)
* Contact the author: <hello@mbaasy.com>

## MIT License

> Copyright (c) 2016 [Mbaasy, Inc](https://mbaasy.com/)

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
