---
repo: ben-eb/gulp-uncss
url: 'https://github.com/ben-eb/gulp-uncss'
homepage: ''
starredAt: '2015-01-03T01:41:03Z'
createdAt: '2013-12-17T21:36:18Z'
updatedAt: '2024-10-13T21:01:53Z'
language: JavaScript
license: MIT
branch: master
stars: 938
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:58.987Z'
description: DEPRECATED. Remove unused CSS selectors.
tags: []
---

# Deprecation Notice

Since UnCSS is now a PostCSS plugin which can be combined with other CSS
processing steps, there is little incentive to add a separate pass to your
build step. Instead of using gulp-uncss, you can replicate the functionality
by the following gulp task:

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var uncss = require('postcss-uncss');

gulp.task('default', function () {
    var plugins = [
        uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }),
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'));
});
```

Now you can add other plugins to complement UnCSS, such as [cssnano].

[cssnano]: https://github.com/ben-eb/cssnano

# [gulp][gulp]-uncss

> Remove unused CSS with [UnCSS][orig].

*If you have any difficulties with the output of this plugin, please use the
[UnCSS tracker][bugs].*

## Install

With [npm](https://npmjs.org/package/gulp-uncss) do:

```
npm install gulp-uncss --save-dev
```

## Example

Single files, globbing patterns and URLs are all supported by gulp-uncss, and
can be mixed and matched:

```js
var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('default', function () {
    return gulp.src('site.css')
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('./out'));
});
```

gulp-uncss can also be used in a pipeline that involves CSS pre-processing.
Utilising many transforms on a single file is one of gulp's strengths:

```js
var gulp = require('gulp');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');

gulp.task('default', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }))
        .pipe(nano())
        .pipe(gulp.dest('./out'));
});
```

In just a few lines, we compiled SCSS source into a single file, removed unused
CSS and minified the output!

## Options

Please see the [UnCSS documentation][docs] for all of the options you can use.
Some of them aren't as necessary when using gulp-uncss, because the CSS to
analyse comes from the stream rather than the HTML files. The main options you
will likely be using are:

### html
Type: `Array|String`
*Required value.*

An array which can contain an array of files relative to your `gulpfile.js`, and
which can also contain URLs. Note that if you are to pass URLs here, then the
task will take much longer to complete. If you want to pass some HTML directly
into the task instead, you can specify it here as a string.

### ignore
Type: `Array`
Default value: `undefined`

Selectors that should be left untouched by UnCSS as it can't detect user
interaction on a page (hover, click, focus, for example). Both literal names and
regex patterns are recognized.

### timeout
Type: `Integer`
Default value: `undefined`

Specify how long to wait for the JS to be loaded.

Note that `options.ignoreSheets` is *already defined* for you. gulp-uncss will
only process CSS files in the stream.

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © [Ben Briggs](http://beneb.info)

[bugs]:    https://github.com/giakki/uncss/issues
[docs]:    https://github.com/giakki/uncss#within-nodejs
[gulp]:    https://github.com/gulpjs/gulp
[orig]:    https://github.com/giakki/uncss
