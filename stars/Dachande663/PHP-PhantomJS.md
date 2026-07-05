---
repo: Dachande663/PHP-PhantomJS
url: 'https://github.com/Dachande663/PHP-PhantomJS'
homepage: ''
starredAt: '2014-01-11T03:37:08Z'
createdAt: '2012-12-27T13:02:16Z'
updatedAt: '2023-12-31T03:05:35Z'
language: PHP
license: MIT
branch: master
stars: 57
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:05.621Z'
description: A PHP library to execute PhantomJS scripts and return their results.
tags: []
---

PhantomJS Runner
================

A PHP library to execute PhantomJS scripts and return
their results.


0.0 Table of Contents
---------------------

* Introduction
* Examples
* Troubleshooting
* Changelog


1.0 Introduction
----------------

This library provides a simple wrapper around PhantomJS to
facilitate running scripts and capturing their output. This
script relies on PhantomJS already been installed on the
target system.


2.0 Examples
------------

```php
$phantomjs = new HybridLogic\PhantomJS\Runner;
$result = $phantomjs->execute(dirname(__FILE__) . '/script.js', $arg1, $arg2);
```


3.0 Troubleshooting
-------------------

Nothing here yet.


4.0 Changelog
-------------

* **[2012-12-17]** Initial Version
* **[2012-12-27]** Added Package docs
