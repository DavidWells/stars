---
repo: igor-makarov/timezones
url: 'https://github.com/igor-makarov/timezones'
homepage: null
starredAt: '2019-07-19T15:17:38Z'
createdAt: '2019-07-15T20:18:53Z'
updatedAt: '2023-09-07T07:08:21Z'
language: Ruby
license: NA
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:29.123Z'
description: 'All the timezones of all the cities, as a static site!'
tags: []
---

# TimeZones - lots of cities and their timezones

This small project generates a CSV (and JSON!) of many cities and their IANA timezones.  
It was inspired by Dato by @sindresorhus which didn't have San Francisco!

The output is deployed to Netlify. It downloads a CC-BY list of about 25k cities and their time zones from [Geonames](http://www.geonames.org/) and writes it into simplified CSV and JSON files.  
For US cities, the JSON also contains `adminRegion` property with the state. Unfortunately, localized admin region data isn't readily available for the rest.

The output can be downloaded at (https://timezones.netlify.com/cities_time_zones.csv) or (https://timezones.netlify.com/cities_time_zones.json).
