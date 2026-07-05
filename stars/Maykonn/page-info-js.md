---
repo: Maykonn/page-info-js
url: 'https://github.com/Maykonn/page-info-js'
homepage: 'https://www.npmjs.com/package/page-info-js'
starredAt: '2019-10-06T08:48:25Z'
createdAt: '2018-07-19T15:20:52Z'
updatedAt: '2021-06-15T13:32:58Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.517Z'
description: >-
  Gather information about the DOM, Loading Time, Errors, Mutations, and more
  (with Custom Callbacks) with Javascript.
tags:
  - analytics
  - backend
  - callback
  - dom
  - errors
  - frontend
  - gz
  - info
  - javascript
  - js
  - loading
  - mutation-observer
  - mutationobserver
  - mutations
  - observer
  - pageinfo
  - pageinfojs
  - time
---

# PageInfoJS

With PageInfoJS you can gather information about time to load the Document DOM as well create custom callbacks for events when:

- Elements are loaded, 
- A Javascript error detected,
- DOM loading percentage changes,
- Document is completely loaded(or interactive, loading, etc).
- When a mutation happens on page(when a new element is created on page for example)

You can work with information about time too:

- DOM loading start timestamp,
- Get the elapsed time in milliseconds when an event occur,
- Timestamp of the moment that an event occur.

**A real world example for PageInfoJS custom callbacks and time info is to send information about your frontend apps for your analytics backend servers.**

## How to use

### With npm

Although you can use as a Node module PageInfo works with DOM, so you can use the package in your frontend app with your webpack configuration to compile the 
PageInfoJS code together your app code. To install the module type:

`npm i page-info-js`

Importing the package with ES6:
```JS
import 'page-info-js';
```

Or import with `require`:
```JS
require('page-info-js');
```

And thus you can instantiate the PageInfoJS:
```JS
const PageInfo = new PageInfoJS([]);
```

*OBS: the array on constructor is an array of custom callbacks, learn more about it [clicking here](#working-with-custom-callbacks).*

### As a `<script>` tag included in your html page 

Include the `/dist/PageInfo.js` or `/dist/PageInfo.gz` script on `<head>` element and you can work with the PageInfoJS at the end of your html, after
close the `</body>` tag, or include your js script there.

**You can find the compiled code on [package releases list](https://github.com/Maykonn/PageInfoJS/releases).**

### Examples

See the files on `/example` directory for a simple real world example.  
To execute the example on your local browser, run:  

`npm run start`

Your browser will open `http://localhost:8080` automatically with the example (open your browser console and enjoy!).

## Working with custom callbacks

To use the custom callbacks for PageInfoJS events you can declare an array of callbacks:
```JS
var myCallbacks = [];
```

And create a callback when a DOM element is loaded:
```JS
/**  
 * @param element {HTMLElement}  
 * @param PageInfo {PageInfo}  
 */
myCallbacks[PageInfoJS.EventsList.DOM.ElementLoaded] = function (element, PageInfo) {  
  console.log('  >> Element loaded', element);  
  console.log('  >> Loaded elements', PageInfo.getLoadedElementsNumber());  
};
```

### Events List:
You can implement custom callbacks for the bellow events list:

- PageInfoJS.EventsList.DOM.ElementLoaded
- PageInfoJS.EventsList.DOM.ElementsLoadingPercentageIncremented
- PageInfoJS.EventsList.DOM.AllElementsLoaded
- PageInfoJS.EventsList.DOM.MutationObserved (when an attribute or content of a html element change on page after it loaded)
- PageInfoJS.EventsList.OnError
- PageInfoJS.DocumentReadyStateChanged.Any (when ready state changed for any state)
- PageInfoJS.DocumentReadyStateChanged.ToUninitialized
- PageInfoJS.DocumentReadyStateChanged.ToLoading
- PageInfoJS.DocumentReadyStateChanged.ToLoaded
- PageInfoJS.DocumentReadyStateChanged.ToInteractive
- PageInfoJS.DocumentReadyStateChanged.ToComplete

And pass the callbacks array for the PageInfoJS instance:

```JS
var PageInfo = new PageInfoJS(myCallbacks);
```

## Working with Time

Getting the loading start timestamp:

```JS
var timestamp = PageInfo.Time.getStartTimestamp();  
console.log('PageInfoJS start timestamp:', timestamp);
```

Getting the current timestamp:
```JS
var timestamp = PageInfo.Time.getCurrentTimestamp();  
console.log('PageInfoJS current timestamp:', timestamp);
```

Elapsed time in milliseconds:
```JS
var time = PageInfo.Time.getElapsedTime();  
console.log('PageInfoJS elapsed time (milliseconds):', time);
```

With these time methods you can know when the page becomes `Interactive` and the elapsed time for that:
```JS
/**  
 * @param element {HTMLElement}  
 * @param PageInfo {PageInfo}  
 */
myCallbacks[PageInfoJS.EventsList.DocumentReadyStateChanged.ToInteractive] = function (element, PageInfo) {  
  console.log('Document is Interactive now, elapsed time (milliseconds)', PageInfo.Time.getElapsedTime());  
  console.log('Document is Interactive now, timestamp', PageInfo.Time.getCurrentTimestamp());  
};
```

**You can use `Time` methods with any [custom callback.](https://github.com/Maykonn/PageInfoJS#working-with-custom-callbacks)**

## Working with Errors

PageInfoJS fire an Event instance when a js error occur on page, you can use it as follow:
```JS
/**
 * @param PageInfo {PageInfo}
 * @param e {Event || ErrorEvent}
 */
myCallbacks[PageInfoJS.EventsList.OnError] = function (PageInfo, e) {
  console.log('Error Detected (event timestamp):', PageInfo.Time.getCurrentTimestamp(), e);
};
```

Or combined with other events too:
```JS
/**
 * @param PageInfo {PageInfo}
 * @param changedTo {string}
 */
myCallbacks[PageInfoJS.EventsList.DocumentReadyStateChanged.Any] = function (PageInfo, changedTo) {
  console.log('Document ready state changed to `' + changedTo + '` after (milliseconds)', PageInfo.Time.getElapsedTime());
  console.log('Document have errors?', PageInfo.hasErrors(), PageInfo.getAllErrors());
};
```

## Compiling the code
Clone this repo and you can use npm and webpack to compile the code.
Install the requirements:   

```
git clone https://github.com/Maykonn/PageInfoJS.git
npm install
``` 

In your dev environment you can run (will compile the code and open the example app at localhost:8080/):
```
npm run start
```

Build the code to production at `/dist` directory (minify, uglify, remove comments, logs, etc):
```
npm run build
```

The `npm run build` command will generate two file at /dist directory, PageInfo.gz and PageInfo.js.

## Contributing

You can contribute to PageInfoJS cloning this repository from github [clicking here](https://github.com/Maykonn/PageInfoJS.git).
So, you just need to create a new branch using a name related to the new functionality which you'll create.   
And after finish your code, you just need to create a pull request which will be revised, merged to master(if the code 
doesn't break the lib) branch and published a new release of PageInfoJS. 
