---
repo: medikoo/duration
url: 'https://github.com/medikoo/duration'
homepage: ''
starredAt: '2025-12-12T01:07:04Z'
createdAt: '2012-05-22T19:54:19Z'
updatedAt: '2025-12-13T16:57:12Z'
language: JavaScript
license: ISC
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-12-27T22:31:49.100Z'
description: Time duration utilities for JavaScript
tags: []
---

[![Build status][build-image]][build-url]
[![Tests coverage][cov-image]][cov-url]
[![npm version][npm-image]][npm-url]

# duration - Time duration utilities

_Formerly part of [es5-ext](https://github.com/medikoo/es5-ext) project._

## Installation

### Node.js

    $ npm install duration

### Browser

Can be bundled for browser with help of [modules-webmake](https://github.com/medikoo/modules-webmake)

## Example usage:

```javascript
var Duration = require("duration");

var duration = new Duration(new Date(2000, 6, 7), new Date(2010, 8, 13, 3, 23, 8, 456));

console.log("Years: ", duration.years);
console.log("Months: ", duration.months);
console.log("Days: ", duration.days);
console.log("Hours: ", duration.hours);
console.log("Minutes: ", duration.minutes);
console.log("Seconds: ", duration.seconds);
console.log("Milliseconds: ", duration.milliseconds);

console.log("Trailing months: ", duration.month);
console.log("Trailing days: ", duration.day);
console.log("Trailing hours: ", duration.hour);
console.log("Trailing minutes: ", duration.minute);
console.log("Trailing seconds: ", duration.second);
console.log("Trailing milliseconds: ", duration.millisecond);

console.log("Default string representation: ", duration.toString());
console.log("Alternative string representation: ", duration.toString(1));
console.log("Custom string representation: ", duration.toString("H: %Hs m: %M"));
```

Output:

```
Years:  10
Months:  122
Days:  3720
Hours:  89283
Minutes:  5357003
Seconds:  321420188
Milliseconds:  321420188456
Trailing months:  2
Trailing days:  6
Trailing hours:  3
Trailing minutes:  23
Trailing seconds:  8
Trailing milliseconds:  456
Default string representation:  10y 2m 6d 03:23:08.456
Alternative string representation:  10y 2m 6d 3h 23m 8s 456ms
Custom string representation:  H: 89283 m: 23
```

## Duration(from[, to])

Main module is both constructor and factory method, and can be used either way.  
`from` and `to` are expected to be JavaScript Date objects. `to` is optional, and if not provided it defaults to current time.

## Duration.prototype properties

### years

Returns full years of the duration

### months

Returns full months of the duration

### days

Returns full days of the duration

### hours

Returns full hours of the duration

### seconds

Returns full seconds of the duration

### minutes

Returns full minutes of the duration

### milliseconds

Returns milliseconds of the duration

### year

Same as `years`. Returns full years of the duration

### month

Returns trailing months of the duration

### day

Returns trailing days of the duration

### hour

Returns trailing hours of the duration

### minute

Returns trailing minutes of the duration

### second

Returns trailing seconds of the duration

### millisecond

Returns trailing seconds of the duration

## valueOf()

Same as `milliseconds`. Returns milliseconds of the duration

## toString([mode[, threshold]])

Returns readable representation of the duration.  
When invoked without arguments (defaults to _mode=0_), returns as:

    10y 2m 6d 03:23:08.456

When invoked with mode `1`, returns alternative representation:

    10y 2m 6d 3h 23m 8s 456ms

Representation returned by default modes can be customized with threshold setting that trims lowest units:

```javascript
duration.toString(); // 10y 2m 6d 03:23:08.456
duration.toString(0, 1); // 10y 2m 6d 03:23:08
duration.toString(0, 2); // 10y 2m 6d 03:23

duration.toString(1); // 10y 2m 6d 3h 23m 8s 456ms
duration.toString(1, 1); // 10y 2m 6d 3h 23m 8s
duration.toString(1, 2); // 10y 2m 6d 3h 23m
```

## toString(format)

When invoked with string, formats the duration according to given pattern, where:

- `%y` - `duration.year`
- `%m` - `duration.month`
- `%d` - `duration.day`
- `%H` - `duration.hour`
- `%M` - `duration.minute`
- `%S` - `duration.second`
- `%L` - `duration.millisecond`
- `%ms` - `duration.months`
- `%ds` - `duration.days`
- `%Hs` - `duration.hours`
- `%Ms` - `duration.minutes`
- `%Ss` - `duration.seconds`
- `%Ls` - `duration.milliseconds`
- `%sign` - If duration is negative outputs `-` otherwise empty string

## Tests

    $ npm test

## Security contact information

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.

[build-image]: https://github.com/medikoo/duration/workflows/Integrate/badge.svg
[build-url]: https://github.com/medikoo/duration/actions?query=workflow%3AIntegrate
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/duration.svg
[cov-url]: https://codecov.io/gh/medikoo/duration
[npm-image]: https://img.shields.io/npm/v/duration.svg
[npm-url]: https://www.npmjs.com/package/duration
