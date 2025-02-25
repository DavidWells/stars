---
repo: nicholidev/country-cities
url: 'https://github.com/nicholidev/country-cities'
homepage: 'https://www.npmjs.com/package/country-cities'
starredAt: '2023-01-22T20:38:18Z'
createdAt: '2023-01-11T22:26:18Z'
updatedAt: '2024-09-17T12:08:00Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:58.162Z'
description: 'Countries, States, Cities'
tags:
  - cities
  - counties
  - nodejs
  - npm
  - npm-package
  - states
---

<h1 align="center">Countries, States, Cities </h1>
<h6 align="center"><pre>country-cities</pre></h6>
<p align="center">
    <a href="https://www.npmjs.com/package/country-cities">
        <img src="https://img.shields.io/npm/dm/country-cities.svg?style=flat-square" alt="NPM downloads">
    </a>
    <a href="https://www.npmjs.com/package/country-cities">
        <img src="https://img.shields.io/npm/v/country-cities.svg?style=flat-square" alt="NPM version">
    </a>
    <a href="/LICENSE">
        <img src="https://img.shields.io/npm/l/country-cities.svg?style=flat-square" alt="License">
    </a>
    <a href="https://nicholijin.com/">
        <img src="https://img.shields.io/badge/maintained%20with-Nicholi-cc00ff.svg?style=flat-square" alt="Maintained with Nicholi">
    </a>
</p>




### Install
`npm i country-cities`

<br/>

### How to use

* Get `Countries`

`import { countries } from "country-cities"`

<br/>
 
<b>All of Countries</b>

```js
countries.all()
```


```js
[
  {
    "isoCode": "US",
    "name": "United State",
    "phonecode": "1",
    "flag": "🇺🇸",
    "currency": "USD",
    "latitude": "38.00000000",
    "longitude": "-97.00000000",
    "timezones": [
      {
        "zoneName": "America/Adak",
        "gmtOffset": -36000,
        "gmtOffsetName": "UTC-10:00",
        "abbreviation": "HST",
        "tzName": "Hawaii–Aleutian Standard Time"
      },
	  {
        "zoneName": "America/Kentucky/Louisville",
        "gmtOffset": -18000,
        "gmtOffsetName": "UTC-05:00",
        "abbreviation": "EST",
        "tzName": "Eastern Standard Time (North America)"
      },
	  ...
    ]
  },
  {
    "isoCode": "FR",
    "name": "France",
    "phonecode": "33",
    "flag": "🇫🇷",
    "currency": "EUR",
    "latitude": "46.00000000",
    "longitude": "2.00000000",
    "timezones": [
      {
        "zoneName": "Europe/Paris",
        "gmtOffset": 3600,
        "gmtOffsetName": "UTC+01:00",
        "abbreviation": "CET",
        "tzName": "Central European Time"
      }
    ]
  }
]
```

<br/>

<b>Get country by its code</b>

```js
countries.getByCode("US")
```


```js
{
  "isoCode": "US",
  "name": "United State",
  "phonecode": "1",
  "flag": "🇺🇸",
  "currency": "USD",
  "latitude": "38.00000000",
  "longitude": "-97.00000000",
  "timezones": [
    {
      "zoneName": "America/Adak",
      "gmtOffset": -36000,
      "gmtOffsetName": "UTC-10:00",
      "abbreviation": "HST",
      "tzName": "Hawaii–Aleutian Standard Time"
    },	  
    {
      "zoneName": "America/Kentucky/Louisville",
      "gmtOffset": -18000,
      "gmtOffsetName": "UTC-05:00",
      "abbreviation": "EST",
      "tzName": "Eastern Standard Time (North America)"
    },	  	 ...
  ]
}
```
<br/>

************************************************************************************

<br/>

* Get `States`

`import { states } from "country-cities"`

<br/>
 
<b>All of States in the world</b>

```js
states.all()
```


```js
[
  {
    countryCode: "US",
    isoCode: "VA",
    latitude: "37.43157340",
    longitude: "-78.65689420",
    name: "Virginia"
  },
  {
    countryCode: "US",
    isoCode: "IL",
    latitude: "40.63312490",
    longitude: "-89.39852830",
    name: "Illinois"
  },
  ...
]
```

<br/>

<b>Get States by Country</b>

```js
states.getByCountry("US")
```


```js
[
  {
    countryCode: "US",
    isoCode: "VA",
    latitude: "37.43157340",
    longitude: "-78.65689420",
    name: "Virginia"
  },
  {
    countryCode: "US",
    isoCode: "IL",
    latitude: "40.63312490",
    longitude: "-89.39852830",
    name: "Illinois"
  },
  ...
]
```

<br/>

<b>Get State by Code</b>

```js
states.getByCode("VA", "US")
```
***Important: The country code should be entered second parameter***

```js

{
  countryCode: "US",
  isoCode: "VA",
  latitude: "37.43157340",
  longitude: "-78.65689420",
  name: "Virginia"
},
```
<br/>

************************************************************************************

<br/>

* Get `Cities`

`import { cities } from "country-cities"`

<br/>
 
<b>All of Cities</b>

`cities.all()`


```js
[
  {
    countryCode: "AU",
    latitude: "-31.12756000",
    longitude: "150.90711000",
    name: "Hillvue",
    stateCode: "NSW",
  },
  {
    countryCode: "AU",
    latitude: "-33.91878000",
    longitude: "150.86314000",
    name: "Hinchinbrook",
    stateCode: "NSW",
  },
  ...
]
```

<br/>

<b>Get Cities by Country</b>

```js
cities.getByCountry("AU")
```


```js
[
  {
    countryCode: "AU",
    latitude: "-31.12756000",
    longitude: "150.90711000",
    name: "Hillvue",
    stateCode: "NSW",
  },
  {
    countryCode: "AU",
    latitude: "-33.91878000",
    longitude: "150.86314000",
    name: "Hinchinbrook",
    stateCode: "NSW",
  },
  ...
]
```

<br/>

<b>Get Cities by State and Country</b>

```js
cities.getByState("NSW", "AU")
```
***Important: The country code should be entered second parameter***

```js
[
  {
    countryCode: "AU",
    latitude: "-31.12756000",
    longitude: "150.90711000",
    name: "Hillvue",
    stateCode: "NSW",
  },
  {
    countryCode: "AU",
    latitude: "-33.91878000",
    longitude: "150.86314000",
    name: "Hinchinbrook",
    stateCode: "NSW",
  },
  ...
]
```
