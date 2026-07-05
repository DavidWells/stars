---
repo: suchipi/reverse-proxy-cli
url: 'https://github.com/suchipi/reverse-proxy-cli'
homepage: null
starredAt: '2022-02-24T04:27:23Z'
createdAt: '2022-02-07T20:28:40Z'
updatedAt: '2022-02-28T12:01:33Z'
language: JavaScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:12.106Z'
description: barebones reverse-proxy CLI for forwarding requests from one place to another
tags: []
---

# reverse-proxy-cli

A barebones reverse-proxy CLI for forwarding requests from one place to another.

## Usage

```
npx reverse-proxy-cli --target-url "http://google.com/" --local-port 8080
```

Outputs:

```
Proxy server started; sending traffic from "http://localhost:8080" to "http://google.com/"
```

Help Text:

```
Please specify a --target-url (the thing that you're proxying to) and a --local-port (the port to run the proxy server on).
For example:
  reverse-proxy-cli --target-url "http://google.com/" --local-port 8080

You can also use -t for --target-url and/or -p for --local-port
```

## License

MIT
