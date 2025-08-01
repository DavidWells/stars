---
repo: sindresorhus/env-paths
url: 'https://github.com/sindresorhus/env-paths'
homepage: null
starredAt: '2025-06-11T15:20:34Z'
createdAt: '2016-06-21T21:25:15Z'
updatedAt: '2025-06-12T12:56:31Z'
language: JavaScript
license: MIT
branch: main
stars: 393
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:10.366Z'
description: 'Get paths for storing things like data, config, cache, etc'
tags: []
---

# env-paths

> Get paths for storing things like data, config, cache, etc

Uses the correct OS-specific paths. Most developers get this wrong.

## Install

```
$ npm install env-paths
```

## Usage

```js
import envPaths from 'env-paths';

const paths = envPaths('MyApp');

paths.data;
//=> '/home/sindresorhus/.local/share/MyApp-nodejs'

paths.config
//=> '/home/sindresorhus/.config/MyApp-nodejs'
```

## API

### paths = envPaths(name, options?)

Note: It only generates the path strings. It doesn't create the directories for you. You could use [`make-dir`](https://github.com/sindresorhus/make-dir) to create the directories.

#### name

Type: `string`

The name of your project. Used to generate the paths.

#### options

Type: `object`

##### suffix

Type: `string`\
Default: `'nodejs'`

**Don't use this option unless you really have to!**

Suffix appended to the project name to avoid name conflicts with native
apps. Pass an empty string to disable it.

### paths.data

Directory for data files.

Example locations (with the default `nodejs` [suffix](#suffix)):

- macOS: `~/Library/Application Support/MyApp-nodejs`
- Windows: `%LOCALAPPDATA%\MyApp-nodejs\Data` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-nodejs\Data`)
- Linux: `~/.local/share/MyApp-nodejs` (or `$XDG_DATA_HOME/MyApp-nodejs`)

### paths.config

Directory for config files.

Example locations (with the default `nodejs` [suffix](#suffix)):

- macOS: `~/Library/Preferences/MyApp-nodejs`
- Windows: `%APPDATA%\MyApp-nodejs\Config` (for example, `C:\Users\USERNAME\AppData\Roaming\MyApp-nodejs\Config`)
- Linux: `~/.config/MyApp-nodejs` (or `$XDG_CONFIG_HOME/MyApp-nodejs`)

### paths.cache

Directory for non-essential data files.

Example locations (with the default `nodejs` [suffix](#suffix)):

- macOS: `~/Library/Caches/MyApp-nodejs`
- Windows: `%LOCALAPPDATA%\MyApp-nodejs\Cache` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-nodejs\Cache`)
- Linux: `~/.cache/MyApp-nodejs` (or `$XDG_CACHE_HOME/MyApp-nodejs`)

### paths.log

Directory for log files.

Example locations (with the default `nodejs` [suffix](#suffix)):

- macOS: `~/Library/Logs/MyApp-nodejs`
- Windows: `%LOCALAPPDATA%\MyApp-nodejs\Log` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-nodejs\Log`)
- Linux: `~/.local/state/MyApp-nodejs` (or `$XDG_STATE_HOME/MyApp-nodejs`)

### paths.temp

Directory for temporary files.

Example locations (with the default `nodejs` [suffix](#suffix)):

- macOS: `/var/folders/jf/f2twvvvs5jl_m49tf034ffpw0000gn/T/MyApp-nodejs`
- Windows: `%LOCALAPPDATA%\Temp\MyApp-nodejs` (for example, `C:\Users\USERNAME\AppData\Local\Temp\MyApp-nodejs`)
- Linux: `/tmp/USERNAME/MyApp-nodejs`

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-env-paths?utm_source=npm-env-paths&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
