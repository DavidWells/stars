---
repo: nylas/component-store-example
url: 'https://github.com/nylas/component-store-example'
homepage: null
starredAt: '2015-07-24T20:26:19Z'
createdAt: '2015-07-03T09:22:24Z'
updatedAt: '2024-02-10T05:28:45Z'
language: CoffeeScript
license: NA
branch: master
stars: 180
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:39.310Z'
description: An example of the topics covered in Building for Plugins with React & Flux
tags: []
---

Building for Plugins with React & Flux
----

<a href="https://raw.githubusercontent.com/nylas/component-store-example/master/screenshot/demo.png"><img src="https://raw.githubusercontent.com/nylas/component-store-example/master/screenshot/demo.png" width="500" /></a>

This sample code demonstrates the concepts we discussed at [ReactEurope 2015](https://www.youtube.com/watch?v=Uu4Yz2HmCgE) in a small app that implements a message list with a "mark as read" plugin:

1. Using a single, central DataStore to eliminate store interdependencies and allow plugins to modify data in unexpected ways.

2. Using a ComponentStore to dynamically register and inject components at runtime.

3. Isolating the React.Render calls for third-party "unsafe" components.

#### Getting Started

To run the sample project, run the commands below and visit [http://localhost:9001](http://localhost:9001) in your browser.

```
npm install
bower install
grunt connect
```

#### Get in touch!

We'd love your thoughts and feedback. Feel free to email us at `ben@nylas.com` and `evan@nylas.com`. If you think React and Flux are great, we're also [hiring](http://nylas.com/jobs)!
