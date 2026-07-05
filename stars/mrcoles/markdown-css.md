---
repo: mrcoles/markdown-css
url: 'https://github.com/mrcoles/markdown-css'
homepage: 'http://mrcoles.com/demo/markdown-css/'
starredAt: '2022-11-29T18:54:21Z'
createdAt: '2013-02-06T06:06:21Z'
updatedAt: '2025-01-14T14:46:26Z'
language: CSS
license: MIT
branch: master
stars: 1432
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:06.505Z'
description: CSS for making regular HTML look like plain-text markdown.
tags: []
---

Markdown.css
============

A perverse way to make your HTML look like markdown, purely via CSS.

Use the `markdown.css` file to  make regular HTML look like plain-text markdown. No JavaScript hacks are needed. View [the demo](https://mrcoles.com/demo/markdown-css/) to see what I’m talking about.

The styles are written in `markdown.less`. If you want to hack on this project, you can convert the less files to css with `build.sh` or run the `watch_less.sh` script to have it auto-update when the files change.

This is built to support all of the standard [markdown elements](http://daringfireball.net/projects/markdown/basics) with a few minor issues.

Issues:

*   repeats for h1, hr, and blockquote use characters that are repeated 100 times, so width greater than 100 characters or a blockquote more than a 100 lines will not be perfect
*   pseudo elements (:before, :after) don’t work with images (except opera), so I didn’t support making images look like markdown


### Bookmarklet

Try out the experimental bookmarklet, linked at the bottom of the [demo](http://mrcoles.com/media/test/markdown-css/). Created in the [bookmarklet generator](http://mrcoles.com/bookmarklet) with the following code and a jquery include:

    $('link[rel=stylesheet]').add('style').remove();
    $('[style]').attr('style', '');
    $('head').append('<link rel="stylesheet" href="http://mrcoles.com/media/test/markdown-css/markdown.css" type="text/css" />');
    $('body').addClass('markdown').css({width: '600px', margin: '2em auto', 'word-wrap': 'break-word'});
    $('a img').css({'max-height': '1em', 'max-width': '1em'});
