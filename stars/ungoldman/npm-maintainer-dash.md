---
repo: ungoldman/npm-maintainer-dash
url: 'https://github.com/ungoldman/npm-maintainer-dash'
homepage: ''
starredAt: '2022-02-15T04:23:12Z'
createdAt: '2022-02-15T00:00:45Z'
updatedAt: '2022-02-15T04:23:12Z'
language: JavaScript
license: NA
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:23.308Z'
description: "\U0001F52C list user's npm pkgs sorted by monthly downloads"
tags: []
---

# npm maintainer dash

list a user's npm packages sorted by monthly downloads

very experimental proof of concept, not to be relied upon even a little bit

## sample output

```
~/dev/lab/npm-maintainer-dash ∴ node index.js ungoldman
package                           downloads
-------------------------------------------
path-browserify                   61535007
stream-browserify                 58872366
tty-browserify                    55564636
timers-browserify                 54326072
vm-browserify                     51025606
console-browserify                49763118
browser-resolve                   23481222
acorn-node                        16259012
detective                         15706970
browserify                        8332828
static-eval                       7335125
module-deps                       5717179
insert-module-globals             5509994
deps-sort                         5328659
syntax-error                      5212757
stream-splicer                    5120288
browser-pack                      5108285
labeled-stream-splicer            5064047
static-module                     4546886
brfs                              4337146
watchify                          3823397
@choojs/findup                    786318
...
```

## try it out

works with npx if you know how to ask nicely :)

```
npx https://github.com/ungoldman/npm-maintainer-dash username
```

(you can do this with any repo if there's a package.json with a bin field pointing to a valid executable)

absolutely not guaranteed to work

## why

wish npm did this for you! as a maintainer it's a pain to figure out how to prioritize package maintenance based on real-world usage. squeaky wheel often gets more attention than the thing 1m users are silently relying on etc etc
