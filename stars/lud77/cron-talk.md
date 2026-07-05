---
repo: lud77/cron-talk
url: 'https://github.com/lud77/cron-talk'
homepage: ''
starredAt: '2021-02-19T23:50:13Z'
createdAt: '2016-12-11T18:23:44Z'
updatedAt: '2023-11-29T07:19:13Z'
language: JavaScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:01.391Z'
description: >-
  A grammar and parser to process natural language directives about duration and
  frequency of repeated tasks
tags:
  - cron
  - grammar
  - parser
  - repeated-events
---

# crontalk v0.0.24
> A pure JS parser for natural language repeated events expressions

![coverage/lcov-report/index.html](https://img.shields.io/badge/tests-passing-green.svg)
![coverage/lcov-report/index.html](https://img.shields.io/badge/coverage-68.32-green.svg)


## Installation

	npm install --save crontalk



## Why?

Tired of messing with asterisks when scheduling jobs? Crontalk allows you to easily parse natural language expressions such as "every 3 days from next monday" and convert them to a JS object.


## Usage

	const ct = require('crontalk');

	let occurrences = ct.parse('every 3 days from the last day of september this year');

	console.log(occurrences);


## Structure of the returned object

The parser returns a JS object representing the schedule. The object structure depends on the clauses used in the expression.


### Every (frequency)

The first format of the every clause allows you to specify the frequency of repetition. For instance, the expression

	every 3 days and 5 hours and 2 minutes

results in the following object:

	"span": {
		"days": 3,
		"hours": 5,
		"minutes": 2
	}


### Lapse

The from...to construct (Lapse clause) lets you define a time interval during which to apply the rule. The following example:

	every three days from the 12th of june 2017 to the 3rd of september 2017

will give you the object:

	"span": {
		"days": 3,
		"lapse": {
			"from": {
				"day": 12,
				"month": 5,
				"year": 2017
			},
			"to": {
				"day": 2,
				"month": 8,
				"year": 2017
			}
		}
	}

You can use constructions such as "the last day of november" or "the second last minute of the fourth hour". The "last" keyword will yield negative values for the related unit of measure (-1 means last, -2 means second last, etc).


### Every (phase)

The second format of the every clause must be used in conjuntion with a Lapse clause and allows you to specify a condition for the repetition. Consider the following example:

	every third january from february 1980 to 1999

this results in:

	"span": {
		"years": 3,
		"lapse": {
			"from": {
				"year": 1980,
				"month": 1
			},
			"to": {
				"year": 1999
			}
		},
		"on": {
			"year": 2,
			"_month": 0
		}
	}

Note the "_month" property. The underscore in front of the unit name in the "on" property means that property must be interpreted as an absolute offset, not a relative one. I.E. "_month": 0 always means January, while "month": 0 means the first month of the Lapse clause.

### Deixis

Your can use the keywords "this", "last", "next", and "today", "yesterday", and "tomorrow" in most places when it's appropriate. This will result in the values "this", "last", and "next", being returned instead of a number in the related property of the object.

	every 3 days from last year

Will be transformed into:

	"span": {
		"days": 3,
		"lapse": {
			"from": {
				"year": "last" 
			}
		}
	}




## Documentation

Install the package and look at /docs/railroad.html for the railroad diagrams of Crontalk's DSL.

Look at the tests for usage examples.



## Licensing

This package is released under the [MIT License](https://opensource.org/licenses/MIT)

