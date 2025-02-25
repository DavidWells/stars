---
repo: keithclark/gadebugger
url: 'https://github.com/keithclark/gadebugger'
homepage: 'https://keithclark.github.io/gadebugger/'
starredAt: '2018-10-27T01:52:18Z'
createdAt: '2014-06-05T13:43:57Z'
updatedAt: '2025-02-14T14:28:17Z'
language: JavaScript
license: MIT
branch: master
stars: 236
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:09.027Z'
description: >-
  A Chrome, Firefox & Opera devtools extension for debugging Google Analytics
  tracking code
tags:
  - chrome
  - devtools-extension
  - firefox
  - opera
---

# Google Analytics Debugger Extension

![Google Analytics Debugger in Chrome (above) and Firefox (below)](screengrab.png)

Google Analytics Debugger is a devtools extension for Chrome, Firefox and Opera that exposes tracking beacon data to developers so they can test their analytics implementations. The extension will capture tracking beacons from Classic/Traditional Analytics and Universal Analytics.

Google Analytics Debugger will log the following interactions and data:

* Page views
* Events
* E-commerce transactions
* User timings
* Social interactions
* Custom variables
* Custom dimensions
* Custom metrics
* Content groups
* Campaign tracking


## Prerequisites  

### Requirements

* NodeJS / NPM
* Grunt CLI


### Setup

    npm install


## Building

The easiest way to get started is to simply run:

    grunt

This will build the core, the browser extensions and start a watch task. If you want to build components or extensions individually you can use:

    grunt core                   // builds the core
    grunt core chrome            // builds the chrome extension (requires core)
    grunt core firefox           // builds the firefox extension (requires core)


## Installing the extension for development

### Chrome

First, make sure you've built the chrome extension. Browse to [chrome://extensions](chrome://extensions/), tick the **'Developer mode'** option, click **'Load unpacked extension'** and select the `build/chrome` folder. If all goes well, when you open/restart devtools you should see a **'GA Debugger'** panel.

If you modify the core or chrome source code you'll need to rebuild the extension (the watch task will do this for you) and then restart devtools to see your changes.

### Firefox

You can only develop and test add-ons using the Developer Editon of Firefox. Release versions of Firefox require add-ons to be digitally signed before they can be installed.

First, make sure you've built the Firefox add-on. Next, launch Firefox and browse to [about:debugging](about:debugging). Click the **'Load Temporary Add-on'** button, browse to your add-on's build folder and select the `install.rdf` file. If your add-on loads correctly, **Google Analtics Debugger** should appear in the extensions list. You can now open devtools and select the **'GA Debugger'** tab.

If you modify the core or add-on source code you'll need to rebuild the extension (the watch task will do this for you) and click the **'Reload'** button in the Add-on debugger menu to see your changes.

### Opera

To install the extension in Opera, follow the steps above for Chrome.


## Building distributable extensions

The `dist` task will package each extension into its distributable format, ready to be installed in the browser. You can run this task (once you have build the extensions) using:

	grunt dist                    // create distributable extensions


## Notes

The GA debugger repository contains GACore and the browser extensions. GACore is a library for inspecting Google Analytics tracking beacons and is used by all browser extensions. GACore can also stand alone if required.
