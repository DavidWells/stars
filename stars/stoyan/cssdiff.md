---
repo: stoyan/cssdiff
url: 'https://github.com/stoyan/cssdiff'
homepage: null
starredAt: '2015-01-08T08:04:44Z'
createdAt: '2014-06-07T09:58:32Z'
updatedAt: '2017-02-07T14:40:08Z'
language: CSS
license: NA
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:54.993Z'
description: Tool for visual CSS diffing
tags: []
---

CSS diffing tool

## Why

For convenient testing of CSS code transforms

## What

The tool accepts an HTML file and two CSS files: the original before your code transformation
and the result of the transformation.

Then it uses [PhantomJS](http://phantomjs.org/) and [SlimerJS](http://slimerjs.org/) to load the HTML file twice:
once inlining the "before" CSS and once with the "after" CSS. The CSS is inlined in a `<style>` tag.

The HTML is stripped of tags such as `iframe` and `script` that can potentially skew the visual comparison
by injecting dynamic content.

The results of rendering the two HTML files are saved to two PNGs which are then compared pixel by pixel.

If they are different, a GIF animation is also created to help debug.

Finally, the "before" and "after" CSS files are copied, prettified, comment-stripped and sent to your
favorite diffing app so you can easily see what changed in the CSS. The prettification is done with the 
[Mensch](https://github.com/brettstimmerman/mensch) CSS parser/stringifier

## Installation

    $ npm install cssdiff

It's up to you to install [PhantomJS](http://phantomjs.org/) and/or [SlimerJS](http://slimerjs.org/).
If you want just one of these, remove the other in the `config.json` file.

Also up to you to install [ImageMagick](http://imagemagick.org) (to create the animated GIF)

There is a `config.json` where you can fiddle with (or delete) the paths to the three tools, if necessary.

## Usage

### In code:

```js
var cssdiff = require('../index.js');
cssdiff('index.html', 'before.css', 'after.css', function(result, msg, diff) {
  console.log(result); // `true` if all is fine
  console.log(msg); // verbose message to help debug
  // `diff` is the command you can execute to launch a diff program
});
```

### Command line:

    $ cssdiff index.html before.css after.css diff

#### Example success output

    All good with test/zen.html and test/before.css and test/before.css

#### Example failure output

    ERROR! The before/after results are different
    You provided test/zen.html and test/before.css and test/after.css
    See these files to start debugging:
     * Generated HTML before: /path/to/tmp/ec2af394-984d-4bac-b9fb-92b4461fda1b-before.html
     * Generated HTML after: /path/to/tmp/ec2af394-984d-4bac-b9fb-92b4461fda1b-after.html
     * Screenshot before: /path/to/tmp/ec2af394-984d-4bac-b9fb-92b4461fda1b-before-webkit.png
     * Screenshot after: /path/to/tmp/ec2af394-984d-4bac-b9fb-92b4461fda1b-after-webkit.png
     * Gif animation: /path/to/tmp/ec2af394-984d-4bac-b9fb-92b4461fda1bwebkit.gif
     * CSS diff: "/Applications/DiffMerge" "path/to/tmp/3ef804f6-9496-4020-8193-b13f3d0a3255-before.css" "/path/to/tmp/3ef804f6-9496-4020-8193-b13f3d0a3255-after.css"


## More

Background:

 * http://www.phpied.com/css-diff/
 * http://www.phpied.com/css-diffs-2/
