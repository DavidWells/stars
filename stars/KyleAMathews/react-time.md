---
repo: KyleAMathews/react-time
url: 'https://github.com/KyleAMathews/react-time'
homepage: null
starredAt: '2015-01-04T07:32:26Z'
createdAt: '2014-08-01T20:16:04Z'
updatedAt: '2015-01-04T07:32:26Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T21:52:58.580Z'
description: >-
  Component for React to render relative and/or formatted dates into <time>
  HTML5 element
tags: []
---

# react-time

Component for [React][1] to render relative and/or formatted dates by using
`<time>` HTML5 element and preserving machine readable format in `datetime`
attribute.

## Installation

    % npm install react-time

## Usage

    var Timestamp = require('react-time');

    MyComponent = React.createClass({
      render: function() {
        var now = new Date(),
            wasDate = new Date("Thu Jul 18 2013 15:48:59 GMT+0400");
        return (
          <div>
            <p>Today is <Timestamp value={now} format="YYYY/mm/dd" /></p>
            <p>This was <Timestamp value={wasDate} relative /></p>
          </div>
        );
      }
    });

[1]: https://facebool.github.io/react/
