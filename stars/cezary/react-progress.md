---
repo: cezary/react-progress
url: 'https://github.com/cezary/react-progress'
homepage: 'http://cezary.github.io/react-progress'
starredAt: '2015-03-06T21:48:04Z'
createdAt: '2015-01-09T05:34:26Z'
updatedAt: '2023-09-02T14:58:32Z'
language: JavaScript
license: NA
branch: master
stars: 153
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.842Z'
description: Simple youtube style progress bar for React
tags: []
---

# react-progress

Youtube style progress bar for React

![](examples/demo.gif)

## Install

```
npm install react-progress --save
```

## Usage

```javascript
import React, { Component } from 'react';
import Progress from 'react-progress';

class View extends Component {
  render() {
    return (
      <div>
        ...
        <Progress percent={30}/>
        ...
      </div>
    );
  }
});
```

### Props

prop      | type   | default | notes
----------|--------|---------|--------
classname | string | ''      |
color     | string | rainbow | keyword, hexadecimal, rgb, or hsla
percent   | number | 0       | 0-100
height    | number | 2       | pixels
hideDelay | number | .4      | seconds
speed     | number | .4      | seconds
style     | object | {}      |

## License

MIT
