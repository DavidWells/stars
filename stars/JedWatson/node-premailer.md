---
repo: JedWatson/node-premailer
url: 'https://github.com/JedWatson/node-premailer'
homepage: ''
starredAt: '2015-01-01T10:56:01Z'
createdAt: '2012-10-22T02:56:59Z'
updatedAt: '2024-04-28T13:37:15Z'
language: JavaScript
license: MIT
branch: master
stars: 75
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:59.346Z'
description: Node.js wrapper for premailer.dialect.ca
tags: []
---

node-premailer
==============

A simple api wrapper for http://premailer.dialect.ca, a great tool for inlining css before you send an email.

node-premailer simplifies api integration by calling the Premailer API to inline css styles (and other options such as removing comments, classes and ids), then retrieving the generated html and text from their respective URLs before passing them to your callback.


## Install

<pre>
  npm install premailer-api
</pre>

Or from source:

<pre>
  git clone git://github.com/JedWatson/node-premailer.git
  cd node-premailer
  npm link
</pre>

## Usage

```javascript
var premailer = require('premailer-api');

var emailTemplate = `
  <html>
    <head>
      <title>My Email</title>
      <style type="text/css">
        a { color: #336699; }
      </style>
    </head>
    <body>
      Styles inlined with
      <a href="http://premailer.dialect.ca">Premailer</a> via
      <a href="https://github.com/JedWatson/node-premailer">node-premailer</a>.
    </body>
  <html>`;

premailer.prepare({ html: emailTemplate }, function (err, email) {
  if (err) throw err;
  res.send(email.html);
});
```

## Options

- premailerAPI (string)
  The URL of the premailer API. If you're running your own, replace this. Defaults to http://premailer.dialect.ca/api/0.1/documents
- html (string)
  The html of the email to parse and inline styles.
- url (string)
  The url of the email to fetch then parse and inline styles.
- fetchHTML (boolean)
  Whether to fetch the parsed HTML (you'll usually want this). Defaults to true.
- fetchText (boolean)
  Whether to fetch the auto-generated text version (disable this if you are providing your own). Defaults to true.
- See http://premailer.dialect.ca/api for full list of options. All options have aliases for node.js style variable names.
  - `adapter`
  - `baseUrl` || `base_url`
  - `lineLength` || `line_length`
  - `linkQueryString` || `link_query_string`
  - `preserveStyles` || `preserve_styles`
  - `removeIds` || `remove_ids`
  - `removeClasses` || `remove_classes`
  - `removeComments` || `remove_comments`


## License and Credits

MIT Licensed. Copyright Jed Watson 2016.

A big thank you to [Dialect](http://dialect.ca) for Premailer, and for making the API freely available.

There's also a web version available here: http://premailer.dialect.ca

And you can check out the source code for Premailer itself here: https://github.com/alexdunae/premailer/
