---
repo: anvaka/city-roads
url: 'https://github.com/anvaka/city-roads'
homepage: 'https://anvaka.github.io/city-roads/'
starredAt: '2020-12-27T21:18:02Z'
createdAt: '2020-01-19T16:42:16Z'
updatedAt: '2025-02-25T14:28:24Z'
language: JavaScript
license: MIT
branch: main
stars: 7647
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:14.132Z'
description: Visualization of all roads within any city
tags: []
---

# city-roads

Render every single road in any city at once: https://anvaka.github.io/city-roads/

![demo](https://i.imgur.com/6bFhX3e.png)

## How it is made?

The data is fetched from OpenStreetMap using [overpass API](http://overpass-turbo.eu/). While that API
is free (as long as you follow ODbL licenses), it can be rate-limited and sometimes it is slow. After all
we are downloading thousands of roads within an area!

To improve the performance of download, I indexed ~3,000 cities with population larger than 100,000 people and
stored into a [very simple](https://github.com/anvaka/index-large-cities/blob/master/proto/place.proto) protobuf format. The cities are stored into a cache in this github [repository](https://github.com/anvaka/index-large-cities).

The name resolution is done by [nominatim](https://nominatim.openstreetmap.org/) - for any query that you type
into the search box it returns list of area ids. I check for the area id in my list of cached cities first,
and fallback to overpass if area is not present in cache.

## Scripting

Behind simple UI software engineers would also find scripting capabilities. You can develop programs on top
of the city-roads. A few examples are available in [city-script](https://github.com/anvaka/city-script). Scene
API is documented here: https://github.com/anvaka/city-roads/blob/main/API.md

Please share your creations and do not hesitate to reach out if you have any questions.

## Limitations

The rendering of the city is limited by the browser and video card memory capacity. I was able to render Seattle
roads without a hiccup on a very old samsung phone, though when I tried Tokyo (with 1.4m segments) the phone
was very slow.

Selecting area that has millions of roads (e.g. a Washington state) may cause the page to crash even on a
powerful device.

Luckily, most of the cities can be rendered without problems, resulting in a beautiful art.

## Support

If you like this work and want to use it in your projects - you are more than welcome to do so!

Please [let me](https://twitter.com/anvaka) know how it goes. You can also sponsor my projects [here](https://github.com/sponsors/anvaka) - your funds will be dedicated to more awesome and free data visualizations.

## Local development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## License

The source code is licensed under MIT license
