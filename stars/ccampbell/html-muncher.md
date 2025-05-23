---
repo: ccampbell/html-muncher
url: 'https://github.com/ccampbell/html-muncher'
homepage: 'http://htmlmuncher.com'
starredAt: '2015-01-04T09:02:19Z'
createdAt: '2010-07-21T04:56:17Z'
updatedAt: '2025-02-06T03:56:24Z'
language: Python
license: NA
branch: master
stars: 181
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:57.792Z'
description: >-
  renames classes and ids in your css, javascript, and html to save bytes and
  obfuscate your code
tags: []
---

--------------
  ABOUT
--------------

HTML Muncher is a Python utility that rewrites CSS, HTML, and JavaScript files in order to save precious bytes and obfuscate your code

if your stylesheet starts out looking like this:

.file2 #special {
    font-size: 1.5em;
    color: #F737FF;
}

.file2 #special2 {
    letter-spacing: 0;
}

.box {
    border: 2px solid #aaa;
    -webkit-border-radius: 5px;
    background: #eee;
    padding: 5px;
}

it will be rewritten as

.a #a {
    font-size: 1.5em;
    color: #F737FF;
}

.a #b {
    letter-spacing: 0;
}

.b {
    border: 2px solid #aaa;
    -webkit-border-radius: 5px;
    background: #eee;
    padding: 5px;
}


--------------
 INSTALLATION
--------------

easy_install http://htmlmuncher.com/htmlmuncher.egg

OR:

download the source from http://github.com/ccampbell/html-muncher
cd html-muncher
python setup.py install


--------------
 USAGE
--------------
http://htmlmuncher.com/#usage

OR:

munch --help


--------------
 EXAMPLES
--------------

to update a bunch of stylesheets and views:
munch --css demo/css --html demo/views

to update a single file with inline styles/javascript:
munch --html demo/single-file/view-with-inline-styles.html

you can also select specific files:
munch --css file1.css,file2.css --html view1.html,view2.html

or you can mix and match files and directories
munch --css /my/css/directory,global.css --html /view/directory1,/view/directory2,/view/directory3,template.html
