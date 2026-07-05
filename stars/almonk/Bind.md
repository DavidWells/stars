---
repo: almonk/Bind
url: 'https://github.com/almonk/Bind'
homepage: 'http://www.usebind.com'
starredAt: '2015-05-16T21:50:25Z'
createdAt: '2015-03-15T09:54:47Z'
updatedAt: '2024-07-01T14:58:27Z'
language: JavaScript
license: NA
branch: master
stars: 452
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:43.284Z'
description: A design tool for interfaces
tags: []
---

# Bind

Bind is an open source, experimental tool for designing interfaces. It's a native OSX app that allows you to design using <a href="http://gridstylesheets.org">GSS</a>, an auto-layout like language for describing an interface via constraints. Bind is not meant to replace tools like <a href="http://bohemiancoding.com/sketch/">Sketch</a>, Photoshop or <a href="http://framerjs.com">Framer</a>, but is instead suited for the niche task of laying out user interfaces. For more background info, see the <a href="https://medium.com/@almonk/design-like-it-s-1999-48ce5f5be14">blog post</a> I wrote about it.

<img src="http://f.cl.ly/items/0X1o0y1F1r0h1U3e2n16/bind-screenshot.png"/>

<a href="https://github.com/almonk/Bind/releases">Download for OSX from the Releases page</a>

#### Features
* Write GSS manually or automate it with built in UIs
* Add constraints to multiple elements at once
* Creates `.bind` files which can be easily version controlled with Git and other tools
* Supports emmet for HTML and CSS
* Native OSX app with Yosemite integration
* Presentation mode
* Built in web console (Right click > Inspect)

#### Planned features
* 1-click sharing
* Visual versioning
* Conditional constraints UI (responsive)

#### Getting started
<a href="http://cloud.alasdairmonk.com/1i0s0u032N2y">Check out the example `login.bind`</a> for an overview of the basics. Important to note: for an element to be accessible via the UI it **must** have an `id=` attribute. 

----

#### Building from source

Bind is a hybrid web & native application. Dependencies:
* jsx node module
* XCode 6.3
* OSX 10.10 and higher

`cd ~/bind/public`

`jsx --watch views/ dist/`

`cd ../; open Bind.xcodeproj`
