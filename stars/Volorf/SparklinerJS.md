---
repo: Volorf/SparklinerJS
url: 'https://github.com/Volorf/SparklinerJS'
homepage: 'https://volorf.github.io/SparklinerJS/'
starredAt: '2019-10-06T06:01:55Z'
createdAt: '2017-03-04T21:06:26Z'
updatedAt: '2023-05-12T16:46:43Z'
language: JavaScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:20.715Z'
description: Easy way to make a sparkline graph in web
tags:
  - analytics
  - graph
  - javascript
  - sparkline
  - statistics
  - web
---

# SparklinerJS — an easy way to make a sparkline graph in web

> A sparkline is a very small line chart, typically drawn without axes or coordinates. It presents the general shape of the variation (typically over time) in some measurement, such as temperature or stock market price, in a simple and highly condensed way.
> - [Wikipedia](https://en.wikipedia.org/wiki/Sparkline).

![SparklinerJS](/cover.png)

## Three simple steps
1. [Downoload it](https://raw.githubusercontent.com/Volorf/SparklinerJS/master/sparkliner.js);
2. Add sparkliner.js to your page;
3. Create a new sparkline object and set it up.

**When you did it you can get something like this:**

![SparklinerJS](/sparkliner.png)

🔥[Live demo](https://volorf.github.io/SparklinerJS/)

## How to add sparkliner.js to my page
You should just paste a sparkliner.js link above `</body>`. It's really important. Don't forget it.
```html
<!-- A SparklinerJS link -->
<script src="js/sparkliner.js"></script>
<!-- A user sparkline settings link -->
<script src="js/myScript.js"></script>
<!-- A closed body tag -->
</body>
```

## How to create a sparkline
It's easy. Just do something like that:
```javascript
// Create a data array for our sparkline
var myArray = [10, 30, 3, 8, 39, 25, 22, 89, 74, 7, 2, 40, 61, 17, 35, 31, 8, 14, 39, 32, 53]
// Create a sparkline object
var mySparkliner = new Sparkliner()
// Define an html element ID for a sparkliner. It's place where we'll append our sparkliner
mySparkliner.id = "sparkliner"
// Pass an array and create SVG
mySparkliner.create(myArray)
```
## How to customize a sparkline
You can change following a sparkline property:
```javascript
// A stroke color
mySparkliner.strokeColor = "#0000ff"
// A stroke width
mySparkliner.strokeWidth = 2
// Show a circle marker or not
mySparkliner.circleShow = true
// A circle marker color
mySparkliner.circleColor = "#ffff00"
// A circle marker radius
mySparkliner.circleRadius = 6
```
Also you can define width and height of a sparkline canvas. But by default this parameters are defined by an html element (where we append our sparkliner).
```javascript
// Width and height
mySparkliner.width = 600
mySparkliner.height = 160
```

## Links
[Linkedin](https://www.linkedin.com/in/oleg-frolov-6a6a4752/) | [Dribbble](https://dribbble.com/Volorf) | [Facebook](https://www.facebook.com/volorf)
