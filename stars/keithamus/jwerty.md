---
repo: keithamus/jwerty
url: 'https://github.com/keithamus/jwerty'
homepage: 'http://keithamus.github.io/jwerty'
starredAt: '2015-03-05T18:56:55Z'
createdAt: '2011-09-21T22:36:34Z'
updatedAt: '2025-01-14T08:24:32Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 1207
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:51.277Z'
description: ⌨ Awesome handling of keyboard events
tags: []
---

> # No Longer Actively Maintained
> If someone would like to take over maintainence, feel free to get in touch ([@keithamus on twitter](https://twitter.com/keithamus)). I'll happily transfer this over.

[jwerty](http://keithamus.github.io/jwerty/)
======
##### Awesome handling of keyboard events
###### http://keithamus.github.io/jwerty/
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/keithamus/jwerty?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM Downloads](http://img.shields.io/npm/dm/jwerty.svg?style=flat)](https://www.npmjs.org/package/jwerty)
[![Release](http://img.shields.io/github/release/keithamus/jwerty.svg)](https://github.com/keithamus/jwerty/releases)
[![Gittip donate button](http://img.shields.io/gittip/keithamus.svg?style=flat)](https://www.gittip.com/keithamus/)

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/ygkcNhfZ9nTDeVM6P8LSGn1C/keithamus/jwerty'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/ygkcNhfZ9nTDeVM6P8LSGn1C/keithamus/jwerty.svg' /></a>

jwerty is a JS lib which allows you to bind, fire and assert key combination
strings against elements and events. It normalises the poor std api into
something easy to use and clear.

jwerty is a small library, weighing in at around 1.5kb bytes minified and
gzipped (~3kb minified). jwerty has no dependencies, but is compatible with
[jQuery][jQuery], [Zepto][Zepto], [Ender][Ender] or [CanJS][CanJS] if you
include those packages alongside it. You can install jwerty via [npm][npm] (for
use with Ender) or [Bower][Bower].

For detailed docs, please read the [README-DETAILED.md](README-DETAILED.md) file.

The Short version
=================

Use `jwerty.key` to bind your callback to a key combo (global shortcuts)

```javascript
jwerty.key('ctrl+shift+P', function () { [...] });
jwerty.key('⌃+⇧+P', function () { [...] });
```

Specify optional keys:

```javascript
jwerty.key('⌃+⇧+P/⌘+⇧+P', function () { [...] });
```

or key sequences:

```javascript
jwerty.key('↑,↑,↓,↓,←,→,←,→,B,A,↩', function () { [...] });
```

You can also (since 0.3) specify regex-like ranges:

```javascript
jwerty.key('ctrl+[a-c]', function () { [...] }); // fires for ctrl+a,ctrl+b or ctrl+c
```

Pass in a context to bind your callback:

```javascript
jwerty.key('⌃+⇧+P/⌘+⇧+P', function () { [...] }, this);
```

Pass in a selector to bind a shortcut local to that element:

```javascript
jwerty.key('⌃+⇧+P/⌘+⇧+P', function () { [...] }, this, '#myinput');
```

Pass in a selector's context, similar to jQuery's $('selector', 'scope'):

```javascript
jwerty.key('⌃+⇧+P/⌘+⇧+P', function () { [...] }, this, 'input.email', '#myForm');
```

If you're binding to a selector and don't need the context, you can ommit it:

```javascript
jwerty.key('⌃+⇧+P/⌘+⇧+P', function () { [...] }, 'input.email', '#myForm');
```

Calls to `jwerty.key` return a subscription handle that you can use to disconnect the callback

```javascript
var h = jwerty.key('ctrl+shift+P', function () { [...] })
h.unbind()
```

Use `jwerty.event` as a decorator, to bind events your own way:

```javascript
$('#myinput').bind('keydown', jwerty.event('⌃+⇧+P/⌘+⇧+P', function () { [...] }));
```

Use `jwerty.is` to check a keyCombo against a keyboard event:

```javascript
function (event) {
    if ( jwerty.is('⌃+⇧+P', event) ) {
        [...]
    }
}
```

Or use `jwerty.fire` to send keyboard events to other places:

```javascript
jwerty.fire('enter', 'input:first-child', '#myForm');
```

[jQuery]: http://jquery.com/
[Zepto]:  http://zeptojs.com/
[Ender]:  http://ender.jit.su/
[CanJS]:  http://canjs.com/
[npm]:    https://npmjs.org/
[Bower]:  http://twitter.github.io/bower/
