---
repo: mohamedfrindi/Mouse.js
url: 'https://github.com/mohamedfrindi/Mouse.js'
homepage: 'https://mohamedfrindi.github.io/Mouse.js/'
starredAt: '2021-12-01T08:18:34Z'
createdAt: '2021-09-22T14:01:25Z'
updatedAt: '2023-12-26T16:24:53Z'
language: JavaScript
license: NA
branch: main
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:31.802Z'
description: Mouse Js javascript plugin
tags: []
---

# Mouse.Js
Mouse.Js is a javascript library, which changes the shape of the mouse into various shapes with beautiful effects

<a href="https://mohamedfrindi.github.io/Mouse.js/">Demo</a>

## Installation

<br>
<br>


### npm
````
npm install moussejs --save
````
````javascript
import { Mouse } from "moussejs";
or 
const { Mouse } = require('moussejs');
````

<br>

#### CDN
````html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/mohamedfrindi/Mouse.js/dist/mouse-min.js"></script>
````

<br>

##### Put the JS file at the end of the <code>body</code> tag:
````html
<script type="text/javascript" src="dist/js/mouse.js"></script>
<!-- or -->
<script type="text/javascript" src="dist/js/mouse-min.js"></script>
````



##### To run Mouse.Js just add the following code in your <code>script</code>:
````javascript
let mouse = new Mouse()
mouse.mouse()
````

<br>
<br>

## Options
````javascript
let mouse = new Mouse({

  mouse : 'cirle',
  // To change the type of mouse
  // Accepts 3 options : defult / cirle / point
  // default option : cirle
  
  color: '#ffda79',
  // To change the color of the mouse
  // default option : #ffda79
  
  mouseHover : false,
  // Adds a hover effect to the element on which the mouse is on
  // Accepts 3 options : false / border / background
  // default option : false
  
  mousePointer: false,
  // To show or hide the mouse from the page
  // Accepts 2 options : false / true
  // default option : false
  
  el: 'a',
  // The items you want to hover effect
  // accept any item
  // Should be placed ; etween the elements
  // default option : a
  
  el_hover: true,
  // Activate or disable hover effect on items
  // Accepts 2 options : false / true
  // default option : true
  
  mouse_clicked: true,
  // To activate or disable the effect of clicking on the page
  // Accepts 2 options : false / true
  // default option : true
  
  clrChanged : false,
  // Change the color of the mouse automatically
  // Accepts 2 options : false / true
  // default option : false
  
});
mouse.mouse();
````
