---
repo: MrShoenel/orchestration-tools
url: 'https://github.com/MrShoenel/orchestration-tools'
homepage: ''
starredAt: '2021-11-14T00:50:40Z'
createdAt: '2018-04-03T17:19:35Z'
updatedAt: '2025-01-05T16:09:26Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.601Z'
description: Common tools that help building an infrastructure or to orchestrate resources.
tags:
  - cache
  - calendar
  - cronjob
  - dictionary
  - generic
  - infrastructure
  - job-scheduler
  - jsdoc
  - observable
  - orchestrate-resources
  - orchestration
  - parallel-computing
  - parallelism
  - process
  - process-pipelining
  - progress
  - queue
  - queue-tasks
  - stack
---

# OrchestrationTools
Collection of `orchestration-tools` that help building an infrastructure or to orchestrate resources through NodeJS. Also comes with universal tools such as collections.

|Version|Coverage|Master|Vulnerabilities|
|:-|:-|:-|:-|
|[![Current Version](https://img.shields.io/npm/v/sh.orchestration-tools.svg)](https://www.npmjs.com/package/sh.orchestration-tools) [![Weekly Downloads](https://img.shields.io/npm/dt/sh.orchestration-tools)](https://www.npmjs.com/package/sh.orchestration-tools)|[![Coverage Status](https://coveralls.io/repos/github/MrShoenel/orchestration-tools/badge.svg?branch=master)](https://coveralls.io/github/MrShoenel/orchestration-tools?branch=master)|[![Build Status](https://github.com/MrShoenel/orchestration-tools/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/MrShoenel/orchestration-tools/actions?query=workflow%3A%22Node.js+CI%22)|[![Vulnerabilities](https://snyk.io/test/github/MrShoenel/orchestration-tools/badge.svg)](https://snyk.io/test/github/MrShoenel/orchestration-tools)|



## Install from npm
This package can be installed using the following command: `npm install sh.orchestration-tools`.

## JSDoc

The tools come fully typed in JSDoc, and the documentation for all released versions can also be found here: <https://mrshoenel.github.io/rchestration-tools/>.

## Current list of included tools
* __Job__ - a class that can encapsulate and represent any (asynchronous) work. Supports `Promise`-based work, enhanced states, simple eventing and progress. As of `v2.1.0`, __JobWithCost__ has been removed and cost is now supported by Job.
* __JobQueue__ - a queue that supports parallel jobs with free degree of parallelism.
* __JobQueueCapabilities__ - an extension to the `JobQueue` that can manage and run jobs based on their cost, rather than on plain parallelism.
* __Progress__ - a class used to report any kind of (generic) progress. Supports callbacks, events and `Observables` through `RxJS`.
* __ProgressNumeric__ - an extension (and simplification) of `Progress` especially for numeric progress.
* __IntervalScheduler__ and __Interval__ provide a scheduling mechanism to schedule using timeouts or intervals (new in `v1.6.0`). Also, the schedulers now have a common base-class (`Scheduler`) and their schedules have one, too (`Schedule`).
* __ProcessWrapper__ and related classes (such as `ProcessResult` and `ProcessOutput`) to encapsulate child processes and let them run as `Promises` or `Obervable`s (since `v1.8.0`).
* __Resolve__ - a class containing helpers to determine types of variables and to resolve functions and `Promise`s to values of any type (since `v2.6.0`).
* __ManualScheduler__ and __ManualSchedule__ provide mechanisms that align with the scheduler-concept and allow to trigger events manually (since `v2.7.0`).
* __Collection__, __Queue__, __ConstrainedQueue__ (a queue with limited size), __ProducerConsumerQueue__ (a queue where producers add (defer if full) and consumers obtain items (defer if empty), since `v2.30.0`), __Stack__, __ConstrainedStack__ (a stack with limited size, since `v2.28.0`) and __LinkedList__\*/__LinkedListNode__\* provide fully tested collections that are often needed in JavaScript (since `v2.9.0`/\*`v2.10.0`)
* __Dictionary__ and __Cache__ (which extends it) are fully generic dictionaries that support strings and `Symbol`s as keys. __Cache__ is a capacity-constrained dictionary that supports eviction-policies such as `LRU/MRU`, `LFU/MFU`, `FIFO/LIFO` etc. Also, it supports eviction based on an optional timeout per value (like a weak map) (since `v2.21.0`; both are deprecated, use __DictionaryMapBased__ and __CacheMapBased__ instead as of `v2.22.0`)
* __CacheWithLoad__, an extension of __CacheMapBased__ that introduces a second concept of size constrainment based on a load (since `v2.22.0`).
* __EqualityComparer__ and __DefaultEqualityComparer__ are used within the *collections* to provide default- and custom-capabilities for comparing items (since `v2.9.0`)
* __Comparer__ and __DefaultComparer__ to equate items in terms of size (e.g. for sorting) (since `v2.10.0`)
* __formatValue__, __formatError__, __wrapError__ and __throwError__ are the first of new tools for values and Errors (since `v2.19.0`)
* __Resource__ and __ResourceSelector__ are used to build pools of resources and to select from them using a strategy, such as least recently used, or Round Robin etc. (since `v3.3.0`)
* ~~__CalendarScheduler__ and __Calendar__ provide mechanism to schedule jobs based on `iCal`-calendars from any source (new in `v1.4.0`).~~ These were __removed beginning with `v3.0.0`__ and are now to be found in the package __`sh.misc-tools`__.


## Breaking changes 

* Between `v1.8.0` and `v2.0.0` there were breaking changes regarding `Progress` itself and how it is handled in conjunction with `Job`. If you therefore need to stick with `v1.x.x`, please use the latest stable from the `master-pre-v2.0.0`-branch.
* Calendar-related tools and its Scheduler were removed in version `v3.0.0` and have been moved into the package `sh.misc-tools` (available via npm [![npm install sh.misc-tools](https://img.shields.io/npm/v/sh.misc-tools.svg)](https://www.npmjs.com/package/sh.misc-tools)).
