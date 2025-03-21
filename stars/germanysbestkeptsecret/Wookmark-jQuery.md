---
repo: germanysbestkeptsecret/Wookmark-jQuery
url: 'https://github.com/germanysbestkeptsecret/Wookmark-jQuery'
homepage: null
starredAt: '2011-12-12T21:17:01Z'
createdAt: '2011-12-12T21:17:01Z'
updatedAt: '2024-12-14T07:35:02Z'
language: HTML
license: MIT
branch: master
stars: 2631
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:11.819Z'
description: 'A jQuery plugin to create a dynamic, multi-column layout.'
tags: []
---

[![Join the chat at https://gitter.im/germanysbestkeptsecret/Wookmark-jQuery](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/germanysbestkeptsecret/Wookmark-jQuery?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Read the docs](https://readthedocs.org/projects/wookmark/badge/)](http://wookmark.readthedocs.org/en/latest/)
[![Build Status](https://travis-ci.org/germanysbestkeptsecret/Wookmark-jQuery.svg)](https://travis-ci.org/germanysbestkeptsecret/Wookmark-jQuery)

Wookmark
========

This is a plugin for laying out a dynamic grid of elements.

See the [documentation page](http://www.wookmark.com/jquery-plugin) for examples.

The repository also includes many functional examples. All images used in the example are copyrighted
by their respective owners and only included for showcasing plugin functionality.


Do you like this project?
[Buy us a beer](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TSN2TDYNKZHF4)

How to make the examples work
=============================

First download or clone this repository.
Because we use the `bower` package manager for `jQuery` and other libraries you currently have to
to install `bower` [first](http://bower.io).
After that you can run `bower install` and all necessary libraries for the examples will be installed.

We will provide a special download in the future which contains all necessary packages.

Further documentation
=====================

We are currently creating a new and better documentation at [readthedocs](http://wookmark.readthedocs.org/en/latest/).
Its automatically created by the sources in the `doc` directory.

The documentation can be rendered locally by installing `sphinx` and `sphinx-autobuild` and running `sphinx-autobuild . _build` in the `doc` directory.

Upgrading to version 2.0
========================

Since version 2.0 of Wookmark, the plugin doesn't depend on jQuery anymore.
This allows you to use Wookmark without the overhead of the jQuery library.

Because this meant a big change to the plugin, we also changed a lot in the code
and tried to make it easier to use. The way you initialize the plugin is now different
and a few options have changend. So if you upgrade you have to adapt your code.
See the examples and this readme on how to do this.

Installation
------------

### Install with bower

    bower install wookmark-jquery

### Install with npm

    npm install wookmark

### jQuery is optional and is used in some of the examples to simplify the code a bit

 * [jQuery](http://www.jquery.com) - 1.5.3 or better

### Required files

Copy `wookmark.js` or the minified version `wookmark.min.js` to your javascript folder.
There are some styles for `tiles-wrap` in `css/main.css` you might want to use.

Usage
-----

The plugin can be intialized in different ways. `options` are optional.

### Default without jQuery

    var wookmark = new Wookmark('#myElementContainer'[, options ]);

### jQuery call with default settings:

    $('#myElementContainer').wookmark(options);

Where `myElementContainer` is the class or id of the element or elements wrapping your tiles. A Wookmark instance will be created for each element.

### Options

    {
      align: 'center',
      autoResize: false,
      comparator: null,
      container: $('body'),
      direction: undefined,
      ignoreInactiveItems: true,
      itemWidth: 0,
      fillEmptySpace: false,
      flexibleWidth: 0,
      offset: 2,
      onLayoutChanged: undefined,
      outerOffset: 0,
      possibleFilters: [],
      resizeDelay: 50,
      verticalOffset: undefined
    }

See the [documentation page](http://www.wookmark.com/jquery-plugin) for details on available options.

#### itemWidth and flexibleWidth

These values can be given as numbers which will be interpreted as pixels or you can use percentage strings like '20%'.
You can also provide a function which should return either a number or a percentage string.
When `flexibleWidth` is set and `itemWidth` is not 0 `itemWidth` used as minimum item width.
As example using a `flexibleWidth` of 40% will result in two columns with 10% space to the sides of the container.

#### offset, outerOffset and verticalOffset

`offset` is the horizontal and vertical space between two tiles.
`outerOffset` is the space between the outer tiles and the parent container.
`verticalOffset` is optional and can be set to achieve a vertical offset between two tiles which is different from `offset`.

#### fillEmptySpace

This creates placeholders at the bottom of each column to create an even layout. See `example-placeholder` on how to use it. 
These placeholders use the css class `wookmark-placeholder`. You can overwrite it in your own css to fit your needs.

#### ignoreInactiveItems

When set to `false` inactive items will still be shown when filtered. This can be used to fade out filtered items. 
See the example-filter/fade.html example.

#### comparator

You can use this option to provide a custom comparator function which the plugin will use to sort the tiles. 
See example-sort or example-stamp on how to use it.

### Refresh trigger

Elements which are hidden have cannot be laid out until they are visible. 
If you use wookmark on a hidden tab layout will not be immediately performed. 
When the tab is made visible you can manually refresh Wookmark using a trigger on your container.

    wookmark.layout(true);
    
or

    document.getElementById('container').dispatchEvent(new Event('refreshWookmark'));

or with jQuery

    $('#container').trigger('refreshWookmark');
    
### Resize trigger

A relayout happens then the viewport is resized, you can also trigger this manually via

    window.dispatchEvent(new Event('resize'));
    
or with jQuery

    $(window).trigger('resize');

### Filter

You can filter all items of the handler when they have filters specified. See `example-filter` for details how to do this.
The call to filter will also return the resulting list of items.

    wookmark.filter([filters=[]][,mode='or'][,dryRun=false]);

If you just want to check if there would be a resulting list of items you can call filter with the `dryRun` option set to `true`.

Annotated code
--------------

See our [docco](doc/wookmark.html).

Included examples
-----------------

Some of the examples need the jQuery or imagesLoaded plugins. Be sure to run bower install to have them working.

### example

Is the preferred setup. In this scenario the width and height of all images is set in the HTML img attributes.
The grid layout can be performed as soon as the document is rendered, BEFORE images are loaded.

### example-load-images

In this example, the width and height of the images is not known. Via Paul Irish's imagesLoaded plugin (slightly
modified by desandro). The grid layout is performed after all images are loaded and their dimensions can be
retrieved. This approach is much slower. The imagesLoaded plugin can also be found on github right here:
https://github.com/desandro/imagesloaded

### example-amd

This example shows how to load and initialize the plugin when using `require.js` or a different amd loading method.

### example-api

This example shows how to load the tile data from a remote api and layout it.

### example-endless-scroll

This example shows how to add new tiles at runtime and refresh the layout.

### example-filter

This example shows to use the `filter` feature of the plugin to show just the tiles the user wants.

### example-flexible

This example shows how to use the `flexibleWidth` option. This option allows your tiles to grow a certain amount, as long as there is room. When using percentage values for the width options you can create a fixed column count layout.

### example-lightbox

This example shows you how to include a lightbox.

### example-placeholder

This example shows you how to enable placeholders at the bottom of the tile layout to create an even footer.

### example-sort

This example shows how the `sort` feature works. This option allows you to specify a sorting function which will rearrange your tiles.
For example you can use it to sort your tiles containing products by price, popularity or name.

FAQ
--------

### The tiles overlap after loading.

You should use the 'imagesloaded' plugin. Most the examples in this package include the code how to use it.

### The tiles overlap after their height is changed.

Use the 'finished'-callback of your animation/effect to trigger 'refreshWookmark' on the container element supplied to the plugin.

### The placeholders at the end of each column have wrong heights or positions.

Set 'position: relative' on your container element and check if there are other elements in the container before your tiles.

### My question isn't answered here.

Send us some feedback or create an issue on github.

Mentioned or used by others
---------------------------

Beware: These links lead to sites which are not necessarily related to the authors of the Wookmark plugin so we don't have any control over their content.

 * [Customize the plugin online with bitconfig](http://bitconfig.com/woomark/bitconfig_woomark.html)
 * [TYPO3 extension for YAG](http://typo3.org/extensions/repository/view/yag_themepack_jquery)
 * [Drupal Wookmark plugin](https://drupal.org/project/views_wookmark)
 * [Tumblr template example](http://theme-hunter.tumblr.com/post/31126746878/creating-tumblr-grid-layouts-with-wookmark)

Send a [message](mailto:sebastian@helzle.net) if you want to be included with your site on this list!

Feedback
--------

Please send code specific questions and feedback to [Sebastian](mailto:sebastian@helzle.net) or contact him on [twitter](http://twitter.com/sebobo).

If you have other questions and feedback which is for example related to Wookmark send a mail to [Christoph](mailto:chri@sto.ph) or contact him on [twitter](https://twitter.com/gbks).

Contributing
------------

Contribute!
