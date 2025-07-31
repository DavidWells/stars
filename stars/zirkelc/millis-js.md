---
repo: zirkelc/millis-js
url: 'https://github.com/zirkelc/millis-js'
homepage: 'https://www.npmjs.com/package/millis-js'
starredAt: '2025-07-04T22:22:28Z'
createdAt: '2024-12-14T18:00:46Z'
updatedAt: '2025-07-06T14:35:05Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-07-12T22:31:52.851Z'
description: >-
  A tiny and dependency-free library for date time arithmetic with a chainable
  and immutable API
tags: []
---

[![CI](https://github.com/zirkelc/millis-js/actions/workflows/ci.yml/badge.svg)](https://github.com/zirkelc/millis-js/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/millis-js)](https://www.npmjs.com/package/millis-js)
[![npm](https://img.shields.io/npm/dt/millis-js)](https://www.npmjs.com/package/millis-js)

# Millis.js

A tiny and dependency-free datetime library with a chainable and immutable API.

## Key Features

- 🔄 **Immutable operations** - All operations return new instances, preventing accidental state mutations
- 🔗 **Chainable API** - Fluent interface for composing multiple operations
- 📅 **UTC-based** - Works with UTC milliseconds internally, avoiding timezone complexities
- ⚡ **Zero dependencies** - Tiny footprint, built without any external dependencies
- 🎯 **Type-safe** - Written in TypeScript with full type definitions

## Install

```bash
npm install millis-js
```

## API

This library provides three classes: `DateTime`, `Duration`, and `Interval`.

### `DateTime` class

The `DateTime` class represents a millisecond timestamp.

#### Factory methods

Factory methods return a new `DateTime` instance.

- `DateTime.now(): DateTime`: Returns a new DateTime representing the current UTC time
  ```typescript
  DateTime.now();
  ```

- `DateTime.from(dateTime: DateTimeLike): DateTime`: Returns a new DateTime from a date time like object
  ```typescript
  // From milliseconds timestamp
  DateTime.from(1_704_067_200_000);

  // From strings
  DateTime.from('2024-01-01T00:00:00.000Z'); // ISO
  DateTime.from('2024-01-01'); // YYYY-MM-DD
  DateTime.from('2024-001'); // YYYY-DDD

  // From Date object
  DateTime.from(new Date());

  // From DateTime object
  DateTime.from(DateTime.now());

  // From calendar date components
  DateTime.from({
    year: 2024,
    month: 1,
    dayOfMonth: 1,
    hour: 12,       // optional
    minute: 30,     // optional
    second: 15,     // optional
    millisecond: 0  // optional
  });

  // From ordinal date components
  DateTime.from({
    year: 2024,
    dayOfYear: 1,
    hour: 12        // optional, etc.
  });
  ```

- `DateTime.until(dateTime: DateTimeLike): Interval`: Returns an Interval from the current time to a given date time
  ```typescript
  // Creates interval spanning one day
  DateTime.now().until(DateTime.now().plus({ days: 1 })) // Interval object
  ```

#### Instance methods

##### Arithmetic

DateTime accepts **both** absolute (days, hours, minutes, seconds, milliseconds) and relative (months, years) durations.

- `plus(duration: DurationLike): DateTime`: Returns a DateTime with the duration added
  ```ts
  // Add absolute durations (days and smaller units)
  DateTime.from('2024-01-01T00:00:00.000Z').plus({ days: 1, hours: 2, minutes: 30 }) // 2024-01-02T02:30:00.000Z

  // Add relative durations (months/years)
  DateTime.from('2024-01-31T00:00:00.000Z').plus({ months: 1 }) // 2024-02-29T00:00:00.000Z (handles leap years)

  // Add Duration object
  DateTime.from('2024-01-31T00:00:00.000Z').plus(Duration.hours(2)) // 2024-01-31T02:00:00.000Z

  // Add milliseconds
  DateTime.from('2024-01-31T00:00:00.000Z').plus(86_400_000) // 2024-02-01T00:00:00.000Z
  ```

- `minus(duration: DurationLike): DateTime`: Returns a DateTime with the duration subtracted
  ```ts
  // Subtract absolute durations
  DateTime.from('2024-01-01T00:00:00.000Z').minus({ days: 1, hours: 2 }) // 2023-12-30T22:00:00.000Z

  // Subtract relative durations
  DateTime.from('2024-03-31T00:00:00.000Z').minus({ months: 1 }) // 2024-02-29T00:00:00.000Z (handles leap years)

  // Subtract Duration object
  DateTime.from('2024-01-31T00:00:00.000Z').minus(Duration.hours(2)) // 2024-01-30T22:00:00.000Z

  // Subtract milliseconds
  DateTime.from('2024-01-31T00:00:00.000Z').minus(86_400_000) // 2023-12-31T00:00:00.000Z
  ```

##### Conversion

- `millis(): number`: Returns the milliseconds since Unix Epoch
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').millis() // 1_704_067_200_000
  ```

- `timestamp(): number`: Returns the seconds since Unix Epoch (floored)
  ```ts
  DateTime.from('2024-01-01T00:00:00.500Z').timestamp() // 1_704_067_200
  ```

- `date(): Date`: Returns a JavaScript Date object
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').date() // new Date("2024-01-01T00:00:00.000Z")
  ```

- `year(): number`: Returns the calendar year
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').year() // 2024
  ```

- `month(): number`: Returns the calendar month (1-12)
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').month() // 1
  ```

- `dayOfMonth(): number`: Returns the day of month (1-31)
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').dayOfMonth() // 1
  ```

- `dayOfYear(): number`: Returns the day of year (1-365/366)
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').dayOfYear() // 1
  DateTime.from('2024-12-31T00:00:00.000Z').dayOfYear() // 366 (leap year)
  ```

- `hour(): number`: Returns the hour of day (0-23)
  ```ts
  DateTime.from('2024-01-01T12:00:00.000Z').hour() // 12
  ```

- `minute(): number`: Returns the minute of hour (0-59)
  ```ts
  DateTime.from('2024-01-01T12:30:00.000Z').minute() // 30
  ```

- `second(): number`: Returns the second of minute (0-59)
  ```ts
  DateTime.from('2024-01-01T12:30:15.000Z').second() // 15
  ```

##### Comparison

- `equals(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is equal to the given date time
  ```ts
  DateTime.from('2024-01-01T12:30:15.000Z').equals(DateTime.from('2024-01-01T12:30:15.000Z')) // true
  ```

- `compare(dateTime: DateTimeLike): number`: Returns a comparison value of two DateTime objects to be used in sorting
  ```ts
  [
    DateTime.from('2024-01-31T00:00:00.000Z'),
    DateTime.from('2024-01-02T00:00:00.000Z'),
    DateTime.from('2024-01-31T00:00:00.000Z'),
  ].sort((a, b) => a.compare(b)) // [2024-01-01T00:00:00.000Z, 2024-01-02T00:00:00.000Z, 2024-01-31T00:00:00.000Z]
  ```

- `isBefore(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is before the given date time
  ```ts
  DateTime.from('2024-01-01T12:30:15.000Z').isBefore('2024-01-01T12:30:16.000Z') // true
  ```

- `isAfter(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is after the given date time
  ```ts
  DateTime.from('2024-01-01T12:30:15.000Z').isAfter('2024-01-01T12:30:14.000Z') // true
  ```

- `isBetween(start: DateTimeLike, end: DateTimeLike): boolean`: Returns true if the current DateTime is between the given start and end date times
  ```ts
  DateTime.from('2024-01-01T12:30:15.000Z').isBetween('2024-01-01T12:30:14.000Z', '2024-01-01T12:30:16.000Z') // true
  ```

- `isSameSecond(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is in the same second as the given DateTime
  ```ts
  DateTime.from('2024-01-01T12:30:15.123Z').isSameSecond('2024-01-01T12:30:15.456Z') // true
  ```

- `isSameMinute(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is in the same minute as the given DateTime
  ```ts
  DateTime.from('2024-01-01T12:30:15.000Z').isSameMinute('2024-01-01T12:30:45.000Z') // true
  ```

- `isSameHour(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is in the same hour as the given DateTime
  ```ts
  DateTime.from('2024-01-01T12:30:00.000Z').isSameHour('2024-01-01T12:45:00.000Z') // true
  ```

- `isSameDay(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is in the same day as the given DateTime
  ```ts
  DateTime.from('2024-01-01T12:00:00.000Z').isSameDay('2024-01-01T23:59:59.999Z') // true
  ```

- `isSameMonth(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is in the same month as the given DateTime
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').isSameMonth('2024-01-31T23:59:59.999Z') // true
  ```

- `isSameYear(dateTime: DateTimeLike): boolean`: Returns true if the current DateTime is in the same year as the given DateTime
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').isSameYear('2024-12-31T23:59:59.999Z') // true
  ```

- `isStartOfYear(): boolean`: Returns true if the current DateTime is at the start of the year
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').isStartOfYear() // true
  ```

- `isStartOfMonth(): boolean`: Returns true if the current DateTime is at the start of the month
  ```ts
  DateTime.from('2024-01-01T00:00:00.000Z').isStartOfMonth() // true
  ```

- `isStartOfDay(): boolean`: Returns true if the current DateTime is at the start of the day
  ```ts
  DateTime.from('2024-03-15T00:00:00.000Z').isStartOfDay() // true
  ```

- `isStartOfHour(): boolean`: Returns true if the current DateTime is at the start of the hour
  ```ts
  DateTime.from('2024-03-15T12:00:00.000Z').isStartOfHour() // true
  ```

- `isStartOfMinute(): boolean`: Returns true if the current DateTime is at the start of the minute
  ```ts
  DateTime.from('2024-03-15T12:30:00.000Z').isStartOfMinute() // true
  ```

- `isStartOfSecond(): boolean`: Returns true if the current DateTime is at the start of the second
  ```ts
  DateTime.from('2024-03-15T12:30:15.000Z').isStartOfSecond() // true
  ```

- `isEndOfYear(): boolean`: Returns true if the current DateTime is at the end of the year
  ```ts
  DateTime.from('2024-12-31T23:59:59.999Z').isEndOfYear() // true
  ```

- `isEndOfMonth(): boolean`: Returns true if the current DateTime is at the end of the month
  ```ts
  DateTime.from('2024-03-31T23:59:59.999Z').isEndOfMonth() // true
  ```

- `isEndOfDay(): boolean`: Returns true if the current DateTime is at the end of the day
  ```ts
  DateTime.from('2024-03-15T23:59:59.999Z').isEndOfDay() // true
  ```

- `isEndOfHour(): boolean`: Returns true if the current DateTime is at the end of the hour
  ```ts
  DateTime.from('2024-03-15T12:59:59.999Z').isEndOfHour() // true
  ```

- `isEndOfMinute(): boolean`: Returns true if the current DateTime is at the end of the minute
  ```ts
  DateTime.from('2024-03-15T12:34:59.999Z').isEndOfMinute() // true
  ```

- `isEndOfSecond(): boolean`: Returns true if the current DateTime is at the end of the second
  ```ts
  DateTime.from('2024-03-15T12:34:56.999Z').isEndOfSecond() // true
  ```

##### Formatting

- `iso(): string`: Returns the ISO string representation
  ```ts
  DateTime.now().iso() // "2024-01-01T00:00:00.000Z"
  ```

- `format(format: DateTimeFormat | Intl.DateTimeFormat): string`: Format the date time using a format string
  ```typescript
  // Built-in formats
  dateTime.format('YYYY');         // "2024"
  dateTime.format('YYYY-DDD');     // "2024-001"
  dateTime.format('YYYY-MM-DD');   // "2024-01-01"
  dateTime.format('HH:mm:ss');     // "12:30:45"

  // Using Intl.DateTimeFormat
  dateTime.format(new Intl.DateTimeFormat('en-US')) // "1/1/2024, 12:30:45 AM"
  ```

##### Manipulation

- `startOfYear(): DateTime`: Returns a new DateTime set to the start of the year
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').startOfYear() // 2024-01-01T00:00:00.000Z
  ```

- `startOfMonth(): DateTime`: Returns a new DateTime set to the start of the month
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').startOfMonth() // 2024-03-01T00:00:00.000Z
  ```

- `startOfDay(): DateTime`: Returns a new DateTime set to the start of the day
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').startOfDay() // 2024-03-15T00:00:00.000Z
  ```

- `startOfHour(): DateTime`: Returns a new DateTime set to the start of the hour
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').startOfHour() // 2024-03-15T12:00:00.000Z
  ```

- `startOfMinute(): DateTime`: Returns a new DateTime set to the start of the minute
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').startOfMinute() // 2024-03-15T12:34:00.000Z
  ```

- `startOfSecond(): DateTime`: Returns a new DateTime set to the start of the second
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').startOfSecond() // 2024-03-15T12:34:56.000Z
  ```

- `endOfYear(): DateTime`: Returns a new DateTime set to the end of the year
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').endOfYear() // 2024-12-31T23:59:59.999Z
  ```

- `endOfMonth(): DateTime`: Returns a new DateTime set to the end of the month
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').endOfMonth() // 2024-03-31T23:59:59.999Z
  ```

- `endOfDay(): DateTime`: Returns a new DateTime set to the end of the day
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').endOfDay() // 2024-03-15T23:59:59.999Z
  ```

- `endOfHour(): DateTime`: Returns a new DateTime set to the end of the hour
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').endOfHour() // 2024-03-15T12:59:59.999Z
  ```

- `endOfMinute(): DateTime`: Returns a new DateTime set to the end of the minute
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').endOfMinute() // 2024-03-15T12:34:59.999Z
  ```

- `endOfSecond(): DateTime`: Returns a new DateTime set to the end of the second
  ```ts
  DateTime.from('2024-03-15T12:34:56.789Z').endOfSecond() // 2024-03-15T12:34:56.999Z
  ```

### `Duration` class

The `Duration` class represents a length of time in milliseconds.

#### Factory methods

Factory methods return a new `Duration` instance.

- `Duration.from(duration: DurationLike): Duration`: Returns a Duration from a duration like object
  ```typescript
  // From components
  Duration.from({ 
    days: 1,
    hours: 2,
    minutes: 30
  }) // P1DT2H30M

  // From milliseconds
  Duration.from(93_600_000) // P1DT2H
  ```

- `Duration.between(start: DateTimeLike, end: DateTimeLike): Duration`: Returns a Duration from a start and end date time
  ```typescript
  // From ISO strings
  Duration.between('2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z')

  // From DateTime objects
  Duration.between(DateTime.now(), DateTime.now().plus({ days: 1 }))

  // From milliseconds
  Duration.between(1704067200000, 1704067200000 + 24 * 60 * 60 * 1000)

  // From Date objects
  Duration.between(new Date(), new Date().setDate(new Date().getDate() + 1))

  // From datetime components
  Duration.between({ year: 2024, month: 1, dayOfMonth: 1 }, { year: 2025, month: 1, dayOfMonth: 1 })

  // From formatted strings
  Duration.between({ 'YYYY': '2024' }, { 'YYYY': '2025' })
  ```

#### Instance methods

##### Arithmetic

Duration accepts **only** absolute durations (days, hours, minutes, seconds, milliseconds).

- `plus(duration: AbsoluteDuration): Duration`: Returns a Duration by adding a duration
  ```ts
  Duration.hours(2).plus({ minutes: 30 }) // 2.5 hours
  ```

- `minus(duration: AbsoluteDuration): Duration`: Returns a Duration by subtracting a duration
  ```ts
  Duration.hours(5).minus({ hours: 2, minutes: 30 }) // 2.5 hours
  ```

- `abs(): Duration`: Returns a Duration with the absolute value of the current duration
  ```ts
  Duration.hours(-2).abs() // 2 hours
  ```

##### Conversion

- `days(): number`: Returns the duration in days
  ```ts
  // Precise value
  Duration.hours(25).days() // 1.0416666666666667
  
  // Rounded value
  Duration.hours(25).days({ round: true }) // 1
  ```

- `hours(): number`: Returns the duration in hours
  ```ts
  Duration.minutes(150).hours() // 2.5
  Duration.minutes(150).hours({ round: true }) // 3
  ```

- `minutes(): number`: Returns the duration in minutes
  ```ts
  Duration.seconds(150).minutes() // 2.5
  Duration.seconds(150).minutes({ round: true }) // 3
  ```

- `seconds(): number`: Returns the duration in seconds
  ```ts
  Duration.millis(2500).seconds() // 2.5
  Duration.millis(2500).seconds({ round: true }) // 3
  ```

- `millis(): number`: Returns the duration in milliseconds
  ```ts
  Duration.seconds(1.5).millis() // 1500
  ```

- `iso(): string`: Returns the ISO duration string
  ```ts
  Duration.from({ days: 1, hours: 2, minutes: 30 }).iso() // "P1DT2H30M"
  ```

### `Interval` class

The `Interval` class represents a time span between two `DateTime` instances.

#### Factory methods

Factory methods return a new `Interval` instance.

- `Interval.between(start: DateTimeLike, end: DateTimeLike): Interval`: Returns an Interval between two date times
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z','2024-01-02T00:00:00.000Z') // 2024-01-01T00:00:00.000Z/2024-01-02T00:00:00.000Z
  ```

- `Interval.days(days: number): Interval`: Returns an Interval spanning the specified number of days from now
  ```ts
  // Creates interval from now to 7 days in future
  Interval.days(7) // 2024-01-01T00:00:00.000Z/2024-01-08T00:00:00.000Z

  // Creates interval from now to 7 days in past
  Interval.days(-7) // 2024-01-01T00:00:00.000Z/2023-12-25T00:00:00.000Z
  ```

#### Instance methods

##### Conversion

- `duration(): Duration`: Returns a Duration representing the length of the interval
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T23:59:59.999Z').duration() // 2 days
  ```

- `starts(): DateTime`: Returns a DateTime representing the start of the interval
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T23:59:59.999Z').starts() // 2024-01-01T00:00:00.000Z
  ```

- `ends(): DateTime`: Returns a DateTime representing the end of the interval
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T23:59:59.999Z').ends() // 2024-01-02T23:59:59.999Z
  ```

- `reverse(): Interval`: Returns a new Interval with the start and end dates reversed
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T23:59:59.999Z').reverse() // 2024-01-02T23:59:59.999Z/2024-01-01T00:00:00.000Z
  ```

- `days(): Array<DateTime>`: Returns an array of DateTimes for each day in the interval
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T23:59:59.999Z').days() // [2024-01-01T00:00:00.000Z, 2024-01-02T23:59:59.999Z]
  ```

- `years(): Array<DateTime>`: Returns an array of DateTimes for each year in the interval
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2025-01-01T23:59:59.999Z').years() // [2024-01-01T00:00:00.000Z, 2025-01-01T23:59:59.999Z]
  ```

##### Comparison

- `contains(dateTime: DateTimeLike): boolean`: Returns true if the interval contains the given date time
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z').contains('2024-01-01T12:00:00.000Z') // true
  ```

- `isPositive(): boolean`: Returns true if the interval is going forward in time (start < end)
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z').isPositive() // true
  ```

- `isNegative(): boolean`: Returns true if the interval is going backward in time (start > end)
  ```ts
  Interval.between('2024-01-02T00:00:00.000Z', '2024-01-01T00:00:00.000Z').isNegative() // true
  ```

##### Formatting

- `iso(): string`: Returns the ISO interval string representation
  ```ts
  Interval.between('2024-01-01T00:00:00.000Z', '2024-01-02T00:00:00.000Z').iso() // "2024-01-01T00:00:00.000Z/2024-01-02T00:00:00.000Z"
  ```

## License

MIT
