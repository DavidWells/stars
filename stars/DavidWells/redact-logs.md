---
repo: DavidWells/redact-logs
url: 'https://github.com/DavidWells/redact-logs'
homepage: null
starredAt: '2025-01-06T00:59:51Z'
createdAt: '2020-09-26T00:59:00Z'
updatedAt: '2025-01-06T00:59:52Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:20.400Z'
description: Redact sensitive env vars from logs & CLI output.
tags: []
---

# Redact ENV variables from console.log & process.stdout

Redact sensitive env vars from logs & CLI output.

## Install

```
npm install redact-logs
```

## Example

```js
process.env.SECRET_ENV_VAR = 'secret value'

/* 1. Before */
console.log('process.env.SECRET_ENV_VAR=', process.env.SECRET_ENV_VAR)
// prints process.env.SECRET_ENV_VAR=secret value
process.stdout.write(`process.stdout.write=${process.env.SECRET_ENV_VAR}\n`)
// prints process.stdout.write=secret value

/* 2. Enable Redaction */
const SECRET_KEYS = ['SECRET_ENV_VAR']
const disableLogRedactionFunc = startPatchingLogs(SECRET_KEYS)

/* 3. SECRET_ENV_VAR value now redacted */
console.log('process.env.SECRET_ENV_VAR=', process.env.SECRET_ENV_VAR)
// prints process.env.SECRET_ENV_VAR=[secure]
process.stdout.write(`process.stdout.write=${process.env.SECRET_ENV_VAR}\n`)
// prints process.stdout.write=[secure]

/* 4. Restore logging via restore function */
disableLogRedactionFunc()
console.log('process.env.SECRET_ENV_VAR=', process.env.SECRET_ENV_VAR)
// prints process.env.SECRET_ENV_VAR=secret value
process.stdout.write(`process.stdout.write=${process.env.SECRET_ENV_VAR}\n`)
// prints process.stdout.write=secret value
```

## Notes

**Please note** this won't redact secrets from being sent to third party services or written to files.

As such, it's not a full solution to protect secret values if you are executing unknown code.
