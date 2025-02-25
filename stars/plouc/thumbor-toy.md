---
repo: plouc/thumbor-toy
url: 'https://github.com/plouc/thumbor-toy'
homepage: 'http://plouc.github.io/thumbor-toy/'
starredAt: '2015-03-15T23:51:25Z'
createdAt: '2014-11-18T11:44:54Z'
updatedAt: '2025-02-11T15:47:49Z'
language: JavaScript
license: MIT
branch: master
stars: 84
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:46.973Z'
description: A reactjs based app to play with thumbor filters/resize
tags: []
---

# thumbor-toy

Want to see it in action ? check the [demo](http://plouc.github.io/thumbor-toy/)

[<img src="https://raw.github.com/plouc/thumbor-toy/master/doc/thumbor-toy-screenshot.jpg">](http://plouc.github.io/thumbor-toy/)

## Install

### Dependencies install

```
npm install
```

### Configuration

Create a config.js file with the config for your application, for instance:

```javascript
module.exports = {
    common: {
        // This is optional, allowing you to select a mode from the settings and switch config accordingly
        modes: [{
            value: 'common',
            label: 'Basic'
        },{
            value: 'advanced',
            label: 'Advanced'
        }],

        // This is an optional config, to provide resizing ratios
        presetsResize: [{
            label:  '4/3',
            width:  432,
            height: 326
        }, {
            label:  '16/9',
            width:  462,
            height: 260
        }, {
            label:  '16/7',
            width:  474,
            height: 209
        }],

        // This is an optional config, to provide sample images pre-filtered & resized
        presetImages: [{
            label: 'Image 1',
            data: {
                server:  'http://server1.com/',
                image:   'image1.jpg',
                resize:  {
                    active: true,
                    width:  600,
                    height: 600,
                    smart:  true,
                    debug:  false,
                    fit:    false,
                },
                filters: [{
                    type: 'watermark',
                    settings: {
                        image:        'watermark.png',
                        x:            10,
                        y:            10,
                        transparency: 0,
                    }
                }]
            }
        }],

        // server base url ; this can also take an array such as: [{label: 'server1', 'url': 'http://server1.com'}, {label: 'server2', 'url': 'http://server2.com'}]
        source: {
            servers: [
                {
                    label: 'server1',
                    url: 'http://my.thumbor.server/',
                }
            ]
        },

        // available filters
        filters: [
            'blur',
            'noise',
            'watermark',
            'brightness',
            'grayscale'
        ],

        // available images
        images: [
            { label: 'first image',        src: 'image1.png' },
            { label: 'second image',       src: 'image2.png' }
        ],

        // available watermark images
        watermarkImages: [
            { label: 'copyright watermark', src: 'watermark.png' },
        ]
    },
    advanced: {
        source: {
            servers: [
                {
                    label: 'server 2',
                    url: 'http://my.other.thumbor.server/',
                }
            ]
        }
    }
};
```

### Compile assets

```
gulp
```
