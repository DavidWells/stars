---
repo: anywhichway/timewave
url: 'https://github.com/anywhichway/timewave'
homepage: null
starredAt: '2022-06-20T22:53:25Z'
createdAt: '2022-05-09T13:50:37Z'
updatedAt: '2025-02-11T15:51:41Z'
language: JavaScript
license: MIT
branch: main
stars: 47
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:40.230Z'
description: >-
  A tiny clock and date, period, or duration math library < 2k
  (minified/gzipped)
tags: []
---

# timewave v0.1.9

A tiny time simulation and date/time math library < 3.75K (minified/gzipped)

```javascript
const clock = Clock(new Date(2022,1,1),{tz:'America/New_York',hz:1,tick:1000,run:true}) // refresh every second
        .plus("363d 23h 59m") // jump forward to 11:59PM on Dec 31st, 2022
        .setAlarm({for:new Date(2023,1,1)},() => console.log(`Happy New Year 2023!`)) // log in one minute
```

Small enough for every day date/time math. Powerful enough for games and simulations.

Timewave provides much of the same functionality as MomentJS and its replacement [Luxon](https://moment.github.io/luxon/#/) in a smaller package.

Timewave also provides the ability to create and run clocks in different timezones or at different refresh rates and speeds, e.g. you can have a clock that
increments 5 seconds for every one second of real time.

## Features

- A simple consistent API across Clocks (DateTimes), Durations, and Periods (Intervals)
- Concise math operations and duration expressions
- Multiple time-zone handling
- Clocks that can be stopped, started, run forward or backward and cloned into different timezones
- Periods (from time x to time y) that can be adjusted and shifted in pure or mutating mode
- Alarms that can be invoked when a clock hits a specific time or is within a range

If you like `timewave`, check out:

- [lazui](https://lazui.org) - Small, simple, powerful web UI and micro front end creation ... Great ideas from htmx, lit, Vue and Riot combined.
- [Watchlight](https://watchlight.dev) - Beyond the UI ... a light weight, comprehensive, reactive framework for business logic.
- [Nano-memoize](https://github.com/anywhichway/nano-memoize) - Faster than fast, smaller than micro ... nano-memoizer.

## Getting Started

Install from [NPMJS](https://www.npmjs.com/package/timewave) or [GitHub](https://github.com/anywhichway/timewave).

The file `timewave.js` in the root directory exports `Clock`,`D`, and `Period`. `D` is for Duration.

The code will run directly in contemporary browsers using modules. There is a browser version that also creates a global Timewave with the properties `Clock`, `Period` and `D`.

`Clock` is a psuedo-class. It is a Proxy around a `Date` object. Nothing will ever be an `instanceof` a Clock. A
`Clock` is an `instanceof` a `Date`.

`D` and `Period` are classes, but have been written in such a way that you do not need to use the `new` operator.

### API

We will start with `D(uration)`, followed by `Period` and build up to `Clock`.

#### D(uration)

Why would you want to use a duration? So you can so this:

```javascript
const ms = D("1y 1w 1d").ms;
const future = new Date(Date.now()+D("2y 1q"));
```

##### D D(d:number|string|Clock|Date|Period)

- If a number, then the duration is `d` milliseconds long.
- If a string, it must be properly formatted. See below.
- A Clock is just a Date. See next line.
- If a Date, then the duration is the return value of `d.getTime()`, i.e. number milliseconds from the start of the epoch.
- If a Period, then the duration is `d.length` milliseonds.

Durations have computed data members `ms`, `s`, `m`, `h`, `d`, `w`, `mo`, `q`, `y` that return the number of milliseconds,
seconds, minutes, hours, days, weeks, months, quarters, and years in the duration. The long form of the duration also works, e.g. `d.seconds`.

##### Array<D> D.max(D[,D ...])

- A static method of `D` that returns an `Array` of `D` that are the maximum ones of the durations provided. All the returned durations will contain the same number of milliseconds.

##### Array<D> D.min(D[,D ...])

- A static method of `D` that returns an `Array` of `D` that are the minimum ones of the durations provided. All the returned durations will contain the same number of milliseconds.

##### D d.minus(D)

- Subtracts a duration from another duration and returns a new duration. The function is `pure`, i.e. the duration on which the method is called is not modified.
- Consider using the basic math approach and JavaScript operators as described below rather than `minus`.

##### D d.plus(D)

- Adds a duration to another duration and returns a new duration. The function is `pure`, i.e. the duration on which the method is called is not modified.
- Consider using the basic math approach and JavaScript operators as described below rather than `plus`.

##### Formatting Durations

Durations strings are space delimited sequences of numbers followed by a valid duration suffix, e.g. `1w` or `-1w`. 
The duration suffixes and their equivalent milliseconds are:

```javascript
{
    ms: 1,
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24 * 365.2424177 / 365,
    w: 1000 * 60 * 60 * 24 * 365.2424177 / 52,
    mo: 1000 * 60 * 60 * 24 * 365.2424177 / 12,
    q: 1000 * 60 * 60 * 24 * 365.2424177 / 4,
    y: 1000 * 60 * 60 * 24 * 365.2424177
};
```

For convenience, the above is exposed as `D.durations` so you can use the values in your own code.

These are all valid durations:

```javascript
D(1000); // duration is 1 second
D(new Date()); // duration is size of epoch
D(Period({start:Date.now(),end:Date.now()+10000})); // duration is 10 seconds
D("1d"); // duration is 1000 * 60 * 60 * 24 * 365.2424177 / 365
D("1y 1w 1d"); // you do the math!
```

##### Basic Duration Math

Basic duration math is conducted directly in Javascript using standard math operators. The result is always a number of milliseconds. 
Because basic durations do not have an associated date object, they do not need to account for DST and leap years.

```javascript
const d = D("1m") + D("1s") + 1000; // d will be 62000
```

You can wrap the result in `D` and do a conversion by appending the type you desire using dot notation:

```javascript
const d1 = D(D("1m") + D("1s") + 1000).ms; // d1 will be "62000ms"
    d2 = D("1m").plus(D("1s")  + 1000).ms; // d2 will be "62000ms"
```

#### Period

##### Period Period({start:Date|number,end:Date|number})

- If `start` or `end` is a Date it is used for the start or end of the Period.
- If `start` or `end` is a number it is converted to a Date and used for the start or end of the Period. 
- When a number is used for `start` or `end`, you can effectively ignore that a Date is used internally, since it is the 
difference between the two that is relevant to computations. The values are stored as Dates for the convenience of the
developer so that they can perhaps be used for other purposes and/or to maintain clarity of application code. It also makes
`Period` DST and leap year preserving.

A 'Period' has computed data members `ms`, `s`, `m`, `h`, `d`, `w`, `mo`, `q`, `y` for the milliseconds, 
seconds, minutes, hours, days, weeks, months, quarters, and years in the period.

##### Period p.extend(amount:D|number)

- If `amount` is negative, moves the `start` the `amount` back in time.
- If `amount` is positive, moves the `end` the `amount` forward in time.
- If a `D` is used, the movement is DST and leap year preserving.

##### Array<Period> Period.max(Period[,Period ...])

- A static method of `Period` that returns an `Array` of `Period` that are the maximum ones of the periods provided. All the returned periods will contain the same number of milliseconds.

##### Array<Period> Period.min(Period[,Period ...])

- A static method of `Period` that returns an `Array` of `Period` that are the minimum ones of the periods provided. All the returned periods will contain the same number of milliseconds.

##### Period p.shift(amount:D|number)

- If `amount` is negative, moves the `start` and `end` the `amount` back in time.
- If `amount` is positive, moves the `start` and `end` the `amount` forward in time.
- If a `D` is used, the movement is DST and leap year preserving.

#### Clock                                                                                              

##### Clock Clock(?initialDate:Date|number=Date.now(),{?tz:string,?hz:number=60,?tick:number|string|D|Period=1000/hz,?run:boolean=false,?sync:boolean=true})

- Creates a `Clock`, which will be an `instanceof` and `Date`, but not a `Clock`, since it is just a `Proxy` around a `Date`.
- Clocks generally behave like `DateTime` in `Luxon` and other libraries. We call them Clocks because they can also run.
- `initialDate` will usually be a `Date` or another `Clock`. However, it can be just a `number`, which is the number of milliseconds from the start of the
epoch. If you are building a stopwatch that has no regard for actual time, using a number is perfectly appropriate.
- `tz` is an [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- `hz` is the number of times per second the time should be updated if the clock is running.
- `tick` is the amount of time that should be added (subtracted if negative) from the time at each update. To run faster
than normal, make this number bigger than `1000 / hz` to make it slower, make it smaller than `1000 / hz`. If a `number` or `Period` is
provided, then milliseconds are used. If a `string` parseable as a `D` (duration) or a `D` is used, DST and leapyear preserving math is used.
- `run`, if true, starts running the clock as soon as it is created.
- `sync`, if true (the default), will use system time to sync the clock at each refresh in case the interval running the refresh 
at `hz` rate is unable to keep up or there are breakpoints in the code that slow execution.

Note, when you provide `new Date()` or `Date.now()` as the `initialDate` along with a timezone it IS NOT adjusted. The Clock treats the Date provided
as the Date in the timezone. For example:

```javascript
const now = new Date(), // assume this is Thu May 12 2022 09:46:27 GMT-0700 (Pacific Daylight Time)
    nyc = Clock(now,{tz:"America/New_York"}); // this will be Thu May 12 2022 09:46:27 GMT-0400 (America/New_York Daylight Time)
```

Why does `Clock` behave this way? Well, what would you expect if you did the below? `new Date()` is just a special dynamic 
case of the same thing.

```javascript
const date = new Date("1776-07-04 16:00"),
    nyc = Clock(date,{tz:"America/New_York"}); 
```

If you want an offset clock, do this instead:

```javascript
const nyc = Clock().clone({tz:"America/New_York"}); // create a default clock in the current timezone and then clone it to New York
```

##### Clock Properties

- All the standard Date `get` method results are mapped to camel case property names based on the method name, e.g. 

```javascript
const clock = Clock();
clock.seconds === clock.getSeconds(); // is true
```

These additional properties are also available:

- `weekDay` (non-zero indexed)
- `dayOfMonth`
- `dayOfYear`
- `ordinal` (same as dayOfYear)
- `isInLeapYear`
- `isInDST`
- `offset` (timezone offset in minutes)
- `weekOfYear`
- `stats` (info about stops and starts)

##### Standard Date Methods

- All standard Date methods are available.
- All the `get` methods can take one argument an IANA timezone string. This allows the use of a single Clock to get times for any timezone, e.g.

```javascript
const clock = Clock(),
    loclms = clock.getTime(),
    nycms = clock.getTime("America/New_York"),
    chms = clock.getTime("America/Chicago");
```

##### Clock c.clone({?tz:string=sourceTz,?hz:number=sourceHz,?tick:number|string|D|Period=sourceTick,?run:boolean=sourceRun,?sync:boolean=sourceSync,?alarms:Array=sourceAlarms})

- Creates a new clock with copies of the source values. Typically, you would clone as follows:

```javascript
const clone = myClock.clone({tz:<some new tz>});
```

If you do not want to bring alarms into the clone, then do this:

```javascript
const clone = myClock.clone({tz:<some new tz>,alarms:[]});
```

##### Array<Clock> Clock.max(Clock[,Clock ...])

- A static method of `Clock` that returns an `Array` of `Clock` that have the maximum times of the clocks provided. All the returned times will contain the same UTC time.

##### Array<Clock> Clock.min(Clock[,Clock ...])

- A static method of `Clock` that returns an `Array` of `Clock` that have the minimum times of the clocks provided. All the returned periods will contain the same UTC time.

##### Clock c.minus(amount:number|string|D|Period)

- Adjusts the clock back by the provided `amount`. If a `string` is provided, it must be parseable as a `D`, i.e. duration.
- If a `number` or `Period`, then milliseconds is used. Otherwise, DST and leap year maintaining math is used.
- This is impure, i.e. it mutates the Clock. Clone the clock first to avoid mutation.

##### Clock c.plus(amount:number|string|D|Period)

- Adjusts the clock forward by the `amount`. If a `string` is provided, it must be parseable as a `D`, i.e. duration.
- If a `number` or `Period`, then milliseconds is used. Otherwise, DST and leap year maintaining math is used.
- This is impure, i.e. it mutates the Clock. Clone the clock first to avoid mutation.

##### Clock c.reset({hz:number,tick:number|string|D|Period,sync:boolean,run:boolean=false}={})

- Resets the clock to its `initialTime`. Useful for implementing stop watches or times trials.
- If `hz`, `tick`, or `sync` are provided they change how the clock is run.
- The clock can be restarted with `run = true`  after the reset.

##### Clock c.setAlarm({for:Date|Period},callback:(clock:Clock,complete:boolean) => {...},?name:string=callback.name)

- Invokes the `callback` when the Clock time matches the `for` Date or Period. The `callback` is invoked with the Clock as the first
argument and whether the Clock considers the alarm complete for the second. For dates this will always be `true`. For periods
the callback will be invoked multiple times depending on the clock refresh rate and tick size. Once the Clock goes beyond the upper bound
of the period, the complete flag will be true.
- It is not currently possible to remove alarms. This is under development.

##### Clock.start({hz:number,tick:number,sync:boolean}={})

- Starts the clock running. If it is already running, it will be stopped and re-started.
- If `hz`, `tick`, or `sync` are provided they change the clock.

##### Clock c.stop()

- Stops the clock from running

#### Testing

Current test coverage is shown below:

-------------|---------|----------|---------|---------|                                                                                                                                                                                                                 
File         | % Stmts | % Branch | % Funcs | % Lines |                                                                                                                                                                                                                                                                                                        
-------------|---------|----------|---------|---------|
All files    |   75.94 |    74.91 |   76.62 |    75.7 |                                                                                                          
timewave.js |   75.94 |    74.91 |   76.62 |    75.7  | 
-------------|---------|----------|---------|---------|

### Architecture

Why do we use a Proxy around Date for Clock? It makes for a very small and efficient code base that is easy to test. And,
it allows us to delegate most leap year and leap second processing to the native JavaScript Date object.

Why do we use IANA names in the parenthetical portion of a Clock time string? It makes for a very small code base. 
We do not want to ship an IANA look-up table. And, technically the parenthetical portion of a Date string is an optional 
part of the Javascript spec.

We may implement a separately imported IANA look-up given sufficient demand.

### Change History

Reverse Chronological Order

2023-11-27 v0.2.0 Added eventListener. Fixed issue with startOf and endOf not returning the clock. Made setAlarm chainable. 
Added more unit tests. Created example for Medium article.

2023-10-29 v0.1.9 Documentation updates

2022-12-19 v0.1.8 Fixed issue with duration property lookup only working for long names, i.e. `d.seconds` not `d.s` and added more unit tests.

2022-12-18 v0.1.7 Refined browser build to operate with WebWorker

2022-12-18 v0.1.6 Added browser build

2022-05-20 v0.1.4 README typo correction

2022-05-13 v0.1.3 Updated docs.

2022-05-13 v0.1.2 Eliminated fixed use of tx offset internally. Now called every time it is needed in case DST goes into effect
during the life of a Clock or Period. Improved date calculations for year, quarter, month, week, day. Added DST to Clock
string representation.

2022-05-13 v0.1.1 Updated docs.

2022-05-13 v0.1.0 Unit test coverage of over 85%. Added alarms and more options for stopping and starting Clocks along 
with Clock stats collection. Comprehensive documentation.

2022-05-09 v0.0.1 Initial public commit
