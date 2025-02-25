---
repo: wpreadme2markdown/wp-readme-to-markdown
url: 'https://github.com/wpreadme2markdown/wp-readme-to-markdown'
homepage: ''
starredAt: '2013-11-04T00:58:10Z'
createdAt: '2012-01-28T19:25:16Z'
updatedAt: '2025-02-08T01:40:18Z'
language: PHP
license: MIT
branch: master
stars: 93
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:09.540Z'
description: 'Convert WordPress Plugin Readme Files to GitHub Flavored Markdown '
tags: []
---

# WP Readme to Markdown

[![Packagist](https://img.shields.io/packagist/v/wpreadme2markdown/wpreadme2markdown.svg?maxAge=2592000)](https://packagist.org/packages/wpreadme2markdown/wpreadme2markdown)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/wpreadme2markdown/wp-readme-to-markdown.svg?maxAge=2592000)](https://codeclimate.com/github/wpreadme2markdown/wp-readme-to-markdown)

Convert WordPress Plugin Readme Files to GitHub Flavored Markdown

## Features

* Converts headings
* Formats contributors, donate link, etc.
* Inserts screenshots

## Usage

```php
$markdown = \WPReadme2Markdown\Converter::convert($readme);
```

## Installation

### Composer

Add a composer dependency to your project:

```
composer require wpreadme2markdown/wpreadme2markdown --dev
```

## CLI Version

Visit [this GitHub page](https://github.com/wpreadme2markdown/wp2md) for the CLI version

## Web Version

Visit [this GitHub page](https://github.com/wpreadme2markdown/web) for the web version and a link to its running instance
