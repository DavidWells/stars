---
repo: franciscop/remotecamera
url: 'https://github.com/franciscop/remotecamera'
homepage: null
starredAt: '2015-10-18T22:24:10Z'
createdAt: '2015-10-16T23:18:58Z'
updatedAt: '2016-04-30T23:07:54Z'
language: JavaScript
license: MIT
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:36.739Z'
description: Capture an image and post it to an url
tags: []
---

# `remote-camera`

Takes a picture and posts it to a remote server. So far only for Debian/Ubuntu (tested) and Mac (untested). The function it takes a picture and attempts to upload it.

Install it from the terminal with npm:

```bash
npm install remotecamera --save
```

Create or edit `app.js` and write this:

```js
require('remotecamera')("http://httpbin.org/post", console.log);
```

Run it with `node app.js`. You should see on the terminal the returned output from `httpbin.org`.



## Full example

This is a working full example. After cloning the project, just do a `node example.js` to see it in action, it will fire once the camera.

```js
// Include the library
var remotecamera = require('remotecamera');

var options = {
  url: "http://httpbin.org/post",
  width: 1280, height: 720
};

// Takes and posts an image with some error handling
remotecamera(options, function(err, res, body){
  if (err) return console.log(err);
  if (res.statusCode !== 200) return console.log("Error: " + res.statusCode);
  console.log("Image posted!");
});

// For posting a single picture you don't even need this, but it's nice to have
require('http').createServer().listen(3000);
```

## Options

Since this library does so much (based on other libraries), there are many options that can be set and edited. The basic function looks like this:

```js
var options = {};
var callback = function(err, res, body){};
remotecamera(options, callback);
```

Where options can be a string or an object `{}`. If it's a string, say `"http://httpbin.org/post"`, it behaves the same way as if it was this object: `{ url: "http://httpbin.org/post" }`.


### `url`

Specify the end point where it attempts to post the picture taken. This is the only **required** argument, as the library needs to know where to send it. It's a string to an endpoint that accepts post requests with files. Examples:

```js
require('remotecamera')({ url: "http://httpbin.org/post" });
```


### `width: 640` and `height: 480`

> Only for linux

Specifies the resolution of the image taken in pixels, where `width` defaults to `640` and `height` to `480`. Please don't specify anything besides numbers. Example:

```js
require('remotecamera')({ width: 1280, height: 720, url: "http://httpbin.org/post" });
```


### `name: new Date().getTime() + '_' + uid.v4()`

The local and remote name for the file (without the extension). It's made from a timestamp and a random id joined by an underscore. This example posts the local file called `screenshot.jpg`:

```js
require('remotecamera')({ name: "screenshot", url: "http://httpbin.org/post" });
```


### `form: "image"`

The field name for the image when posting. Example:

```js
require('remotecamera')({ form: "screenshot", url: "http://httpbin.org/post" });
```

This is similar to doing this in html:

```html
<input type="file" name="screenshot">
```

This is useful for retrieving the image on the other end since it gives it a friendly name. Defaults to `"image"`


### `folder: "images"`

The name of the local folder where we will store the temporary file.

```js
require('remotecamera')({ folder: "images", url: "http://httpbin.org/post" });
```


### `data: {}`

Any extra data that you want to post, such as a secret for authentication. It should be a plain object with pairs of keys and values, where the key will become the name. Example:

```js
var options = {
  data: { secret: "verysecret", key: "muchawesome", doge: "guau" },
  url: "http://httpbin.org/post"
};

require('remotecamera')(options);
```

This would be roughly similar to this:

```html
<input name="secret" value="verysecret">
<input name="key" value="muchawesome">
<input name="doge" value="guau">
```



## Support and installation issues

The lack of support for other platforms comes because it uses some command-line utilities to take the screenshots. This is because the library was created primarily for a Raspberry Pi project. You don't need to install anything manually, the required packages are auto-installed the first time that they are run.

For linux you might be prompted to provide the sudo password to install `streamer` if you don't have it installed (or you can pre-install it manually).

For mac it will install `imagesnap` with brew if not installed (or you can pre-install it manually).

The code simplifies a lot this kind of tasks and was thoroughly cleaned up, so I recommend that you dig into it if you need support on any other platform or want to test it on Mac. Also please send a Pull Request if you add support, everyone will benefit! (:
