---
repo: alessioalex/git-blame
url: 'https://github.com/alessioalex/git-blame'
homepage: null
starredAt: '2021-12-20T19:57:21Z'
createdAt: '2014-05-25T16:07:58Z'
updatedAt: '2021-12-20T19:57:21Z'
language: JavaScript
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:26.349Z'
description: Shelling out to git blame in a streaming Node fashion.
tags:
  - blame
  - git
  - git-blame
  - javascript
  - nodejs
---

# git-blame

Shelling out to [git blame](http://git-scm.com/docs/git-blame) in a streaming Node fashion.

[![build status](https://secure.travis-ci.org/alessioalex/git-blame.png)](http://travis-ci.org/alessioalex/git-blame)

## Usage

```js
gitBlame(repoPath, options)
```

Example:

```js
var gitBlame = require('git-blame');
var path = require('path');

var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));
var file = process.env.FILE || 'package.json';
var rev = process.env.REV || 'HEAD';

gitBlame(repoPath, {
  file: file,
  rev: rev
}).on('data', function(type, data) {
  // type can be 'line' or 'commit'
  console.log(type, data);
}).on('error', function(err) {
  console.error(err.message);
  process.exit(1);
}).on('end', function() {
  console.log('±±±±±±±±±±±±±±±±±±');
  console.log("That's all, folks!");
});
```

Sample output:

```bash
$ REPO=../rails/.git FILE=install.rb node example.js
line { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  originalLine: '1',
  finalLine: '1',
  content: 'version = ARGV.pop' }
commit { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  author:
   { name: 'David Heinemeier Hansson',
     mail: 'david@loudthinking.com',
     timestamp: 1280178550,
     tz: '-0500' },
  committer:
   { name: 'David Heinemeier Hansson',
     mail: 'david@loudthinking.com',
     timestamp: 1280178550,
     tz: '-0500' },
  summary: 'Add install script for testing gems locally',
  filename: 'install.rb' }
line { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  originalLine: '2',
  finalLine: '2',
  content: '' }
line { hash: '66258c0e48ed5cf26641a3096272a272611a783c',
  originalLine: '3',
  finalLine: '3',
  content: 'if version.nil?' }
commit { hash: '66258c0e48ed5cf26641a3096272a272611a783c',
  author:
   { name: 'Tim Raymond',
     mail: 'xtjraymondx@gmail.com',
     timestamp: 1357243730,
     tz: '-0500' },
  committer:
   { name: 'Tim Raymond',
     mail: 'xtjraymondx@gmail.com',
     timestamp: 1357244064,
     tz: '-0500' },
  summary: 'Adding a usage message to install.rb script',
  previous:
   { hash: 'a89660947bd5faeef2a741f71f913c352da50cd3',
     filename: 'install.rb' },
  filename: 'install.rb' }
line { hash: '66258c0e48ed5cf26641a3096272a272611a783c',
  originalLine: '4',
  finalLine: '4',
  content: '  puts "Usage: ruby install.rb version"' }
line { hash: '66258c0e48ed5cf26641a3096272a272611a783c',
  originalLine: '5',
  finalLine: '5',
  content: '  exit(64)' }
line { hash: '66258c0e48ed5cf26641a3096272a272611a783c',
  originalLine: '6',
  finalLine: '6',
  content: 'end' }
line { hash: '66258c0e48ed5cf26641a3096272a272611a783c',
  originalLine: '7',
  finalLine: '7',
  content: '' }
line { hash: 'f1637bf2bb00490203503fbd943b73406e043d1d',
  originalLine: '3',
  finalLine: '8',
  content: '%w( activesupport activemodel activerecord actionpack actionmailer railties ).each do |framework|' }
commit { hash: 'f1637bf2bb00490203503fbd943b73406e043d1d',
  author:
   { name: 'Prem Sichanugrist',
     mail: 's@sikachu.com',
     timestamp: 1305488076,
     tz: '-0400' },
  committer:
   { name: 'Prem Sichanugrist',
     mail: 's@sikachu.com',
     timestamp: 1331664944,
     tz: '-0400' },
  summary: 'Remove Active Resource source files from the repository',
  previous:
   { hash: 'a85714a673d2e06b923bd4eba443a3849d332cce',
     filename: 'install.rb' },
  filename: 'install.rb' }
line { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  originalLine: '4',
  finalLine: '9',
  content: '  puts "Installing #{framework}..."' }
line { hash: '2eb89627d844dec2a4ba420ca903bb139b860e43',
  originalLine: '10',
  finalLine: '10',
  content: '  `cd #{framework} && gem build #{framework}.gemspec && gem install #{framework}-#{version}.gem --no-ri --no-rdoc && rm #{framework}-#{version}.gem`' }
commit { hash: '2eb89627d844dec2a4ba420ca903bb139b860e43',
  author:
   { name: 'Rafael Mendonça França',
     mail: 'rafaelmfranca@gmail.com',
     timestamp: 1361803866,
     tz: '-0300' },
  committer:
   { name: 'Rafael Mendonça França',
     mail: 'rafaelmfranca@gmail.com',
     timestamp: 1361803909,
     tz: '-0300' },
  summary: 'Do not use --local option when installing the gems',
  previous:
   { hash: 'c0bc9ce38c6528916f9dd440984a386511e4297d',
     filename: 'install.rb' },
  filename: 'install.rb' }
line { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  originalLine: '6',
  finalLine: '11',
  content: 'end' }
line { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  originalLine: '7',
  finalLine: '12',
  content: '' }
line { hash: '2eb89627d844dec2a4ba420ca903bb139b860e43',
  originalLine: '13',
  finalLine: '13',
  content: 'puts "Installing rails..."' }
line { hash: 'f79f9a74a4b593e8c36d14c43a030b9a12c69255',
  originalLine: '9',
  finalLine: '14',
  content: '`gem build rails.gemspec`' }
line { hash: '2eb89627d844dec2a4ba420ca903bb139b860e43',
  originalLine: '15',
  finalLine: '15',
  content: '`gem install rails-#{version}.gem --no-ri --no-rdoc `' }
line { hash: '856f13ab053f6b5dfa58d6e6c726d43cc5e73d00',
  originalLine: '11',
  finalLine: '16',
  content: '`rm rails-#{version}.gem`' }
±±±±±±±±±±±±±±±±±±
That's all, folks!
```

## Options

The options should be an `object`.

### `rev` (`Boolean` or `String`)
`<rev>` from `git blame`. If empty it will default to `HEAD`. If `false` and `workTree` is set it will use the work tree.

### `workTree` (`String`)
`--work-tree` from `git`. If empty no work tree will be used. Use full path.

### `ignoreWhitespace` (`Boolean`)
`-w` from `git blame`.

### `limitLines` (`String`)
`-L` from `git blame`.

### `detectMoved` (`Boolean` or `Number`)
`-M` from `git blame`. Requiered for `detectCopy`.

### `detectCopy` (`Boolean` or `Number`)
`-C` from `git blame`.

### `detectCopyMode` (`String`)
Possible options:
* `any` - Look in all files and at all times
* `created` - Look in files changed in the commit creating the file
* `default` - Look in the same commit

If left empty it will default to `default`.

### `file` (`String`)
`<file>` in `git blame`.

## gitCommand

This is an optional 3rd parameter besides the repo path and options.
It's the path to the git binary to use (use the one in `PATH` by default).

## Tests

```
npm test
```

## Used by

- [Git Blame VSCode plugin](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)

## License

[MIT](http://alessioalex.mit-license.org/)
