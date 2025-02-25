---
repo: jiawei397/deno_yaml_to_ts
url: 'https://github.com/jiawei397/deno_yaml_to_ts'
homepage: null
starredAt: '2024-09-01T01:08:15Z'
createdAt: '2023-01-29T05:46:56Z'
updatedAt: '2024-09-01T01:08:15Z'
language: TypeScript
license: NA
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:22.591Z'
description: yaml to typescript interface
tags: []
---

# yaml to TypeScript interface

[![deno version](https://img.shields.io/badge/deno-^1.29.0-blue?logo=deno)](https://github.com/denoland/deno)
[![Deno](https://github.com/jiawei397/deno-oak-nest/actions/workflows/deno.yml/badge.svg)](https://github.com/jiawei397/deno-oak-nest/actions/workflows/deno.yml)

## simple use

### yaml to TypeScript interface file only

```ts
import { writeTSToFile } from "https://deno.land/x/yaml_to_ts@v0.1.0/mod.ts";

// to file only
writeTSToFile("example/test.yaml", "test.ts");
```

This will translate `example/test.yaml` and write to `test.ts`.

This is an example `yaml`:

```yaml
port: 4000
apiPrefix: api
redis:
  port: 6379
  host: localhost
  password: xxxx
  db: 0
log:
  appenders:
    dateFile:
      filename: logs/deno
      daysToKeep: 10
      pattern: yyyy-MM-dd.log
  categories:
    default:
      appenders:
        - dateFile
        - console
      level: DEBUG
```

The following is the generated TypeScript interface:

```ts
interface RootObject {
  port: number;
  apiPrefix: string;
  redis: Redis;
  log: Log;
}
interface Log {
  appenders: Appenders;
  categories: Categories;
}
interface Categories {
  default: Default;
}
interface Default {
  appenders: string[];
  level: string;
}
interface Appenders {
  dateFile: DateFile;
}
interface DateFile {
  filename: string;
  daysToKeep: number;
  pattern: string;
}
interface Redis {
  port: number;
  host: string;
  password: string;
  db: number;
}
```

### yaml to TypeScript interface stdout only

```ts
import { writeTSToStdout } from "https://deno.land/x/yaml_to_ts@v0.1.0/mod.ts";

writeTSToStdout("example/test.yaml");
```

### yaml to TypeScript interface both to file and stdout

```ts
import { writeTSToFileOrStdout } from "https://deno.land/x/yaml_to_ts@v0.1.0/mod.ts";

// both to file and to stdout
writeTSToFileOrStdout("example/test.yaml", {
  isToStdout: true,
  destPath: "test.ts",
});
```

## cli

This is a script that you can use directly.

- -f Specify which yaml file which must be set.
- -o The output file
- -s Is to stdout

### yaml to TypeScript interface file only with cli

The param is `-o`.

```bash
deno run --allow-read --allow-write https://deno.land/x/yaml_to_ts@v0.1.0/cli.ts -f example/test.yaml -o example/test.ts
```

### yaml to TypeScript interface stdout only with cli

The param is `-s`.

```bash
deno run --allow-read --allow-write https://deno.land/x/yaml_to_ts@v0.1.0/cli.ts -f example/test.yaml -s
```

Then you can use pipe:

```bash
deno run --allow-read --allow-write https://deno.land/x/yaml_to_ts@v0.1.0/cli.ts -f example/test.yaml -s > aa.ts
```

### yaml to TypeScript interface file both to file and stdout with cli

The param is `-s` and `-o`.

```bash
deno run --allow-read --allow-write https://deno.land/x/yaml_to_ts@v0.1.0/cli.ts -f example/test.yaml -o example/test.ts -s
```

You can also use install to simplify writing:

```bash
deno install --allow-read --allow-write -n yt https://deno.land/x/yaml_to_ts@v0.1.0/cli.ts 

yt -f example/test.yaml -o example/test.ts -s
```
