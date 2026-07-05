---
repo: Alexandre-Fernandez/tzlocator
url: 'https://github.com/Alexandre-Fernandez/tzlocator'
homepage: 'https://www.npmjs.com/package/tzlocator'
starredAt: '2022-08-24T17:30:37Z'
createdAt: '2022-08-09T11:22:34Z'
updatedAt: '2024-09-18T11:28:21Z'
language: TypeScript
license: MIT
branch: main
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:37.253Z'
description: Lightweight privacy respecting geolocation library with no dependencies.
tags:
  - geolocation
  - timezone
---

# tzlocator

> Lightweight privacy respecting geolocation library with no dependencies.

## Key features

-   🥂 No third-party API calls
-   👀 Works without browser prompt
-   🪙 No reverse IP lookups
-   🌏 Country and currency data
-   🔒 Privacy respecting
-   🪶 Lightweight with no dependencies
-   🎓 Fully typed

## Installation

```ts
// npm
npm install tzlocator
// yarn
yarn add tzlocator
// pnpm
pnpm add tzlocator
```

## Usage

-   Star the [github repo](https://github.com/alexandre-fernandez/tzlocator) 😎

### Browser

#### Single page application

```ts
import { Tzlocator, getBrowserTimezone } from "tzlocator"

const tzlocator = new TzLocator()
const location = tzlocator.get(getBrowserTimezone())
```

#### Server side rendering

```ts
import { getBrowserTimezone } from "tzlocator"

const timezone = getBrowserTimezone()
// send the timezone to the server
document.cookie = `timezone=${timezone};`
```

### Server

```ts
import { getRequestCookies } from "my-project"
import { Tzlocator } from "tzlocator"

const tzlocator = new TzLocator()

function getLocation(request: Request) {
	// retrieves the browser's timezone from a cookie
	const cookies = getRequestCookies(request)
	return tzlocator.get(cookies.timezone)
}
```

## Configuration

You can modify tzlocator's configuration by passing an object to its class constructor (e.g. `new Tzlocator({})`).

```ts
{
	include, /*
	An array of functions that take the Tzlocator's `get` method result as a
	parameter and return true if it should be included or false otherwise.
	*/
	exclude, /*
	An array of functions that take the Tzlocator's `get` method result as a
	parameter and return true if it should be excluded or false otherwise
	*/
	fallback, /*
	A string indicating the timezone when the Tzlocator's `get` method can't
	find the given timezone, either because it's not included/excluded or
	because it doesn't exist.
	*/
}
```

## Tzlocator

Used to get the location information ([Locator](#locator)) using a timezone.
Can be instanciated with or without a [configuration](#configuration) object.

```ts
class Tzlocator {
	/**
	 * Returns a boolean indicating if the `timezone` has an assigned
	 * CountryCode.
	 */
	static exists(timezone: string): timezone is Timezone {}

	/**
	 * Returns the Locator corresponding to the `timezone`.
	 * If `useFallback` is true and the `timezone` cannot be found in the
	 * included Locator pool it will return the set config fallback.
	 * Else if there's no set fallback or if `useFallback` is false it will
	 * return undefined.
	 */
	get(timezone: string, useFallback = true) {}

	/**
	 * Returns a boolean indicating if the `timezone` has a valid assigned
	 * Locator.
	 */
	has() {}

	/**
	 * Returns an array of all the valid timezones for the current instance.
	 */
	timezones() {}

	/**
	 * Returns an array of all the valid currencies for the current instance.
	 */
	currencies() {}

	/**
	 * Returns an array of all the valid languages for the current instance.
	 */
	languages() {}

	/**
	 * Returns an array of all the valid locators for the current instance.
	 */
	locators() {}
}
```

## Locator

Location information class.
Can be instanciated using a country code (e.g. `DE`).

```ts
class Locator {
	code // country's code
	name: // country's name
	native: // country's native name
	prefix: // country's phone code
	continent: // continent
	measurement: // country's measurement system
	currency: // country's currency information
	locales: // country's locales

	/**
	 * Returns a boolean indicating if the `countryCode` has an assigned
	 * Locator.
	 */
	static exists(countryCode: string): countryCode is CountryCode {}

	/**
	 * Returns the languages corresponding to each locale.
	 */
	getLanguages() {}

	/**
	 * Returns the main locale for this country.
	 */
	getMainLocale() {}

	/**
	 * Returns the main language for this country.
	 */
	getMainLanguage() {}
}
```

## Currency

Currency information class.
Can be instanciated using a currency code (e.g. `EUR`).

```ts
class Currency {
	code:  // currency's code
	symbol: // currency's symbol
	name: // currency's name

	/**
	 * Returns a boolean indicating if the `currencyCode` has an assigned
	 * Currency.
	 */
	static exists(currencyCode: string): currencyCode is CurrencyCode {}
}
```

## Language

Language information class.
Can be instanciated using a language code (e.g. `en`).

```ts
class Language {
	code: // language's code
	name: // language's name
	native: // language's native name
	scripts: // language's scripts

	/**
	 * Returns a boolean indicating if the `languageCode` has an assigned
	 * Language.
	 */
	static exists(languageCode: string): languageCode is LanguageCode {}
}
```

## Thanks

-   [IANA](https://data.iana.org/time-zones/releases/)
-   [Wikipedia](https://www.wikipedia.org/)
