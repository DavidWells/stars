---
repo: Collaborne/tasks-scheduler
url: 'https://github.com/Collaborne/tasks-scheduler'
homepage: null
starredAt: '2024-09-17T17:36:41Z'
createdAt: '2018-02-28T11:35:38Z'
updatedAt: '2024-09-17T17:36:42Z'
language: TypeScript
license: Apache-2.0
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:20.991Z'
description: A time-based scheduler for tasks
tags: []
---

# tasks-scheduler [![Build Status](https://travis-ci.org/Collaborne/tasks-scheduler.svg?branch=master)](https://travis-ci.org/Collaborne/tasks-scheduler)

A time-based scheduler for tasks.

## Install
```bash
npm install --save collaborne-tasks-scheduler
```

## Usage
```javascript
const tasksPlanner = require('collaborne-tasks-scheduler');
const scheduleResponse = tasksPlanner.schedule({
	start: '2018-01-01',
	end: '2018-06-30',
	timeAllocation: 0.5,
	tasks
});
```

An example of `scheduleResponse` would then be:
```json
{
	"deadlines": {
		"http://collaborne.com/schema/1.0/tasks/sensing": "2018-01-16",
		"http://collaborne.com/schema/1.0/tasks/visioning": "2018-01-24",
		"http://collaborne.com/schema/1.0/tasks/prototyping": "2018-01-31",
		"http://collaborne.com/schema/1.0/tasks/scaling": "2018-02-08"
	},
	"end": "2018-02-08",
	"nrNormDays": 14,
	"nrRealDays": 28,
	"start": "2018-01-01",
	"timeAllocation": 0.5
}
```
