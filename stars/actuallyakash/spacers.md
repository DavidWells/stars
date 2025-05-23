---
repo: actuallyakash/spacers
url: 'https://github.com/actuallyakash/spacers'
homepage: 'http://actuallyakash.github.io/spacers'
starredAt: '2021-07-10T19:33:22Z'
createdAt: '2021-03-28T05:40:13Z'
updatedAt: '2025-02-07T22:22:49Z'
language: JavaScript
license: MIT
branch: main
stars: 276
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.161Z'
description: "\U0001F533 when you need more __space__. Quick margin/padding for your no-code tools."
tags:
  - builder-plugin
  - javascript
  - javascript-library
  - library
  - margin
  - no-code
  - no-code-ui
  - padding
  - spacers
  - spacing
  - vanilla-js
---

spacers
-------

[1]: <https://github.com/actuallyakash/spacers>

_when you need more space_

<img src="https://res.cloudinary.com/dmz9bftyk/image/upload/v1625301678/spacers_giwb8b.gif">

#### Demo

[http://actuallyakash.github.io/spacers](http://actuallyakash.github.io/spacers/)

#### Package Managers

```sh
# Bower
bower install --save spacersjs

# NPM
npm install spacersjs
```

#### CDNs

```html
# unpkg
<link rel="stylesheet" href="https://unpkg.com/spacersjs/spacers/spacers.min.css" />
<script src="https://unpkg.com/spacersjs/spacers/spacers.min.js"></script>

# jsDelivr
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spacersjs/spacers/spacers.min.css" />
<script src="https://cdn.jsdelivr.net/npm/spacersjs/spacers/spacers.min.js"></script>

# CDNjs
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spacersjs/1.0.6/spacers.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/spacersjs/1.0.6/spacers.min.js"></script>

```

#### Bookmarklet
Try spacers quickly on any webpage through the bookmarklet.

```javascript
javascript: (() => {var spacerScript=document.createElement("script");spacerScript.type="text/javascript",spacerScript.src="https://cdn.jsdelivr.net/npm/spacersjs/spacers/spacers.min.js",document.getElementsByTagName("head")[0].appendChild(spacerScript);var spacersStyles=document.createElement("link");spacersStyles.rel="stylesheet",spacersStyles.type="text/css",spacersStyles.href="https://cdn.jsdelivr.net/npm/spacersjs/spacers/spacers.min.css",document.head.appendChild(spacersStyles),spacerScript.onload=function(){spacers({element:"*",showOnHover:!0,enableLock:!0,onDragEnd:function(e){console.log(e)}}),alert("Spacers active!")};})();
```

> <small><b>Note:</b> May not work on some websites due to Content Security Policy.</small>

### Settings

**Option**|**Type**|**Default**|**Description**
-----|-----|-----|-----
element|string|null|Selector on which the spacer has to be initialized
appendHtml|string|begin|To append spacer divs after or before the specified `element`. Use `begin` to append before the selector and `end` to append after the selector.
padding|boolean|true|To enable padding, which is default behavior
margin|boolean|false|To enable margin
onDragEnd|function|null|Function for using the spacer values when drag is ended
containedArea|object (DOM node or jQuery object) or window.document|Use if you're not able to find the element (ex- when using iframe)
spacerClass|string|null|For adding custom classes in the spacers
defaultSpacing|string|8|Initial starting spacer height.
defaultPadding|object|null|an object with initial padding spacer top, bottom, left, right values. Overwrites the `defaultSpacing` parameter
defaultMargin|object|null|an object with initial margin spacer top, bottom, left, right values. Overwrites the `defaultSpacing` parameter
spacingUnit|string|px|Change default spacing unit of spacers like em, rem, in, cm ..etc
showOnHover|boolean|false|Show spacers only on hover
hideSpacingValue|boolean|false|Hides the margin/padding values at the center of the spacer
showLabel|string|null|Enable and set the label to specified string beside the spacing value
enableLock|boolean|false|Link opposite spacers
lockIcon|string|```<span class="lock"></span>```|HTML string for the lock icon
unlockIcon|string|```<span class="unlock"></span>```|HTML string for the unlock icon

#### Example

Initialize with:

```javascript
spacers({
    element: '.element-unique-class'
});
 ```

#### Dependencies

Voila! It works without any dependencies.

#### License

Copyright (c) 2021 Akash
Licensed under the MIT license.
