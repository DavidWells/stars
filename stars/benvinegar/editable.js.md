---
repo: benvinegar/editable.js
url: 'https://github.com/benvinegar/editable.js'
homepage: ''
starredAt: '2015-01-07T00:58:28Z'
createdAt: '2012-04-30T19:30:10Z'
updatedAt: '2019-07-11T14:15:10Z'
language: JavaScript
license: NA
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T21:52:56.235Z'
description: A cross-browser library for working with contentEditable DOM elements.
tags: []
---

editable.js
----

A cross-browser library for working with contentEditable DOM elements. Forked from [jsEditable](https://github.com/gjcourt/jsEditable) by George Courtsunis.

The Problem
---

Each browser treats user input into contentEditable elements differently.

Sample input (typed by user):

```html
one
two
three
```

Becomes the following when read back using ```innerHTML```:
<table>
  <tr>
    <th>Browser</th><th>Shift-return output</th><th>Return output</th>
  </tr>

  <tr>
    <td>WebKit</td>
    <td>
        <pre><code>one&lt;br&gt;
two&lt;br&gt;
three</code></pre>
    </td>
    <td>
        <pre><code>one
&lt;div&gt;two&lt;/div&gt;
&lt;div&gt;three&lt;/div&gt;</code></pre>
    </td>
  </tr>

  <tr>
    <td>Firefox</td>
    <td>
        <pre><code>one&lt;br&gt;
two&lt;br&gt;
three&lt;br&gt;</code></pre>
    </td>
    <td>
        <pre><code>one&lt;br&gt;
two&lt;br&gt;
three&lt;br&gt;</code></pre>
    </td>
  </tr>

  <tr>
    <td>Internet Explorer</td>
    <td>
        <pre><code>&lt;p&gt;one&lt;br&gt;
two&lt;br&gt;
three&lt;/p&gt;</code></pre>
    </td>
    <td>
        <pre><code>&lt;p&gt;one&lt;/p&gt;
&lt;p&gt;two&lt;/p&gt;
&lt;p&gt;three&lt;/p&gt;</code></pre>
    </td>
  </tr>

</table>


editable.js tries to smooth over these inconsistencies when accessing contentEditable text.

Usage
---

```javascript
var editable = new Editable(elem);

var text = editable.text();
```

See source code for more.

Contributors
---

* [George Courtsunis](https://github.com/gjcourt)
* [Ben Vinegar](https://github.com/benvinegar)
