---
repo: 01alchemist/sls-yaml
url: 'https://github.com/01alchemist/sls-yaml'
homepage: ''
starredAt: '2022-03-10T23:47:09Z'
createdAt: '2019-07-29T08:13:01Z'
updatedAt: '2024-07-10T08:42:25Z'
language: TypeScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:01.417Z'
description: Serverless framework yaml extension compiler and more
tags:
  - extension
  - nodejs
  - serverless-framework
  - yaml
  - yaml-parser
---

## Serverless YAML extension parser

[![CircleCI]][ci-sls-yaml] [![Maintainability]][codeclimate] [![Test Coverage]][coverage]

This tiny library will parse YAML extensions used in serverless framework.

### Usage

```bash
npm install sls-yaml
```

```js
import yaml from "sls-yaml";
const compiledYamlAsJsonObject = yaml(YAML_FILE_PATH_OR_BUFFER);
```

### Supported sls extensions

- [Include external file](#include-external-file) `${file(path/to/file.yml)}`
- [Inject environment variable](#inject-environment-variable) `${env:NODE_ENV}`
- [Inject global variables](#inject-global-variables) `${global:path.to.variable}`
- [Inject local variables](#inject-local-variables) `${self:path.to.variable}`

### New extensions\*

- [Inject current git branch](#inject-current-git-branch) `${git:branch}`
- [Inject last git commit hash](#inject-last-git-commit-hash) `${git:sha1}`
- [String replace](#string-replace) `${replace(str, searchPattern, replaceValue )}`

`* - New extension not present in serverless yaml`

### Custom extensions

```js
const context = {
  custom: ([arg]: string[]) => {
    return `${arg}-beta`;
  }
};
const result = yaml(content, null, context);
```

```yml
name: service
version: v1.0.2
subset: service@${custom(${self:version})}
```
- output
```yml
name: service
version: v1.0.2
subset: service@v1.0.2-beta
```

### Include external file

This extension will include content of external yaml files.

- config.yml

```yaml
version: 1
env: dev
config: ${file(./common.yml)}
```

- common.yml

```yaml
endpoint: http://service-url
```

- Generated final yaml

```yaml
version: 1
env: dev
config:
  endpoint: http://service-url
```

### Inject environment variable

This extension will inject envronment values

- config.yml `export NODE_ENV = development`

```yaml
version: 1
env: ${env:NODE_ENV}
```

- Generated final yaml

```yaml
version: 1
env: development
```

### Inject global variables

This extension will inject variable from global scope.

- config.yml

```yaml
version: 1
env: stage
config: ${file(./common.yml)}
```

- common.yml

```yaml
endpoint: http://service-${global:env}
```

- Generated final yaml

```yaml
version: 1
env: stage
config:
  endpoint: http://service-stage
```

### Inject local variables

This extension will inject variable from local scope.

- config.yml

```yaml
version: 1
env: stage
config: ${file(./common.yml)}
```

- common.yml

```yaml
port: 8080
endpoint: http://service:${self:port}
```

- Generated final yaml

```yaml
version: 1
env: stage
config:
  port: 8080
  endpoint: http://service:8080
```

### Inject current git branch

This extension will inject current git branch name

- config.yml

```yaml
branch: ${git:branch}
```

### Inject last git commit hash

This extension will inject last git commit hash

- config.yml

```yaml
image.tag: ${git:sha1}
```

### String replace
```ts
replace(str:string, searchPattern:RegExp|string, replaceValue:string )
```
This extension will returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced.

- config.yml

```yaml
version: v1.0.0
name: ServiceName@${replace(${ self : version }, /\\./gi, - )}
```

- output

```yaml
version: v1.0.0
name: ServiceName@v1-0-0
```

[circleci]: https://circleci.com/gh/01alchemist/sls-yaml/tree/master.svg?style=svg
[ci-sls-yaml]: https://circleci.com/gh/01alchemist/sls-yaml/tree/master
[maintainability]: https://api.codeclimate.com/v1/badges/d3b19c4c45ebf451faf3/maintainability
[codeclimate]: https://codeclimate.com/github/01alchemist/sls-yaml/maintainability
[test coverage]: https://api.codeclimate.com/v1/badges/d3b19c4c45ebf451faf3/test_coverage
[coverage]: https://codeclimate.com/github/01alchemist/sls-yaml/test_coverage
