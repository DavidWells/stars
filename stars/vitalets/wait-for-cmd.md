---
repo: vitalets/wait-for-cmd
url: 'https://github.com/vitalets/wait-for-cmd'
homepage: null
starredAt: '2021-12-18T06:16:17Z'
createdAt: '2020-09-05T16:33:53Z'
updatedAt: '2021-12-18T06:24:30Z'
language: Shell
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:27.326Z'
description: A pure shell script waiting for provided command to exit with zero code
tags: []
---

# wait-for-cmd
A pure shell script waiting for provided command to exit with zero code.
Inspired by [eficode/wait-for](https://github.com/eficode/wait-for) but allows to use any custom command instead of `netcat`.

## Installation
There are two options:

- download script `wait-for-cmd.sh`:
   ```
   wget https://raw.githubusercontent.com/vitalets/wait-for-cmd/master/wait-for-cmd.sh
   chmod +x ./wait-for-cmd.sh
   ```
  
- run as docker container:
   ```
   docker run --rm vitalets/wait-for-cmd 'curl -f https://example.com > /dev/null 2>&1'
   ```

## Usage
```
./wait-for-cmd.sh COMMAND [TIMEOUT]
```

## Examples
Wait for `HOST:PORT` ready with `netcat`:
```bash
./wait-for-cmd.sh 'nc -z example.com 80 > /dev/null 2>&1'
```

Wait for HTTP status 2xx with `curl`:
```bash
./wait-for-cmd.sh 'curl -f https://example.com > /dev/null 2>&1'
```

Wait for HTTP status 2xx with `wget`:
```bash
./wait-for-cmd.sh 'wget --timeout=1 -q https://example.com -O /dev/null > /dev/null 2>&1'
```

Wait for Docker container running (note `$` before command):
```bash
./wait-for-cmd.sh $'[ "$(docker inspect my_container -f \'{{.State.Status}}\')" == "running" ]'
```

Wait for Docker container healthy (note `$` before command):
```bash
./wait-for-cmd.sh $'[ "$(docker inspect my_container -f \'{{.State.Health.Status}}\')" == "healthy" ]'
```

Wait for `localhost:port` from inside Docker container (note `host.docker.internal` instead of `localhost`):
```bash
docker run --rm vitalets/wait-for-cmd 'curl -f http://host.docker.internal:3000 > /dev/null 2>&1'
```

## Related projects
* [eficode/wait-for](https://github.com/eficode/wait-for)
* [vishnubob/wait-for-it](https://github.com/vishnubob/wait-for-it)

## Development

### Test
```bash
./test.sh
```

### Build image
```bash
docker build -t vitalets/wait-for-cmd .
```

### Push image
```bash
docker push vitalets/wait-for-cmd
```

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
