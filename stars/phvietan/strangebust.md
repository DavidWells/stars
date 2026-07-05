---
repo: phvietan/strangebust
url: 'https://github.com/phvietan/strangebust'
homepage: ''
starredAt: '2022-06-07T18:03:12Z'
createdAt: '2022-01-07T11:14:30Z'
updatedAt: '2022-06-07T18:03:12Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:44.922Z'
description: A CLI path fuzzing tool like gobuster that has heuristical guessing
tags:
  - cli
  - fuzzer
  - pathfinding
  - reconnaissance
---

# strangebust

In some web applications, pathfinding tasks in reconnaissance is cumbersome because of the following scenarios:
- Sending HTTP requests to 404 page but receive 200 OK status code with a 404 customized HTML page.
- Sending HTTP requests too much that triggers a DDOS protection and it appears Captcha page.
- Sometimes server return 400, sometimes server returns 500, etc, you get the point.

Thus, strangebust is a CLI pathfinding reconnaissance tool that just like [gobuster](https://github.com/OJ/gobuster) but it also detects the strange behavior of a webapp when doing pathfinding on the web endpoints.

For more information on the algorithm, please refer to <a href="/ALGORITHM.md">ALGORITHM.md</a>

## Installation:

```bash
npm i -g @drstrain/strangebust
```

## Usage:

```bash
Usage: strangebust <command>

Commands:
    strangebust run      Run strangebust
    strangebust init     Set cached options, you don't need to set the options again
    strangebust check    Check current cached options

You need at least one command before moving on
```

Simplest usage:

```bash
strangebust run --url <url> -w <wordlist_file>
```

where <wordlist_file> is a file that contain newline seperated words. For example:

![demo](https://user-images.githubusercontent.com/25105395/148744354-8df39988-e802-4823-878d-e5d452455e14.png)

## Understanding methods and options

### Run method

```bash
strangebust run --help
```

```bash
Options:
      --version   Show version number                                  [boolean]
  -X, --method    Method for path fuzzing, please refer to
                  `require('http').METHODS` for NodeJS supported methods
                                                       [string] [default: "GET"]
  -u, --url       URL for path fuzzing                                  [string]
      --header    Header to include in request, you may include multiple header
                                                        [string] [default: null]
  -d, --data      Body to include in path fuzzing         [string] [default: ""]
  -f, --file      Run fuzz on URLs in <filename>, newline seperated     [string]
  -o, --output    Choose place to store output, will be stdout if not specified
                                                          [string] [default: ""]
      --verbose   Run fuzzer verbosely (default true)                  [boolean]
      --async     Number of async requests (default 5)                  [number]
      --sleep     Sleep for some miliseconds between requests (default 100ms)
                                                                        [number]
  -t, --timeout   Timeout in ms for each request (default 5000ms)       [number]
  -w, --wordlist  Wordlist file to start fuzzing (default ~/wordlists/dir.txt)
                                                                        [string]
  -h, --help      Show help                                            [boolean]
```

The 5 following options are cumbersome if each time you run you must specify them again: `verbose`, `async`, `sleep`, `timeout`, `wordlist`. Thus, you can cache these options using `strangebust init` and `strangebust check`.

### Init method

Check help at: `strangebust init --help`

For example, if you want to use wordlist at `~/wordlists/common.txt`:
```bash
strangebust init --wordlist ~/wordlists/common.txt
strangebust run -u https://codeforces.com/ # No need to specify wordlist again
```

Similarly, you can cache `verbose`, `async`, `sleep`, `timeout`, `wordlist` using the same trick.

### Check method

The check method checks your init variables are correctly set or not. Using unknown wordlist file will cause check method output error message

![demo2](https://user-images.githubusercontent.com/25105395/148746380-afd52218-1fe8-4380-8d24-5b48d801c10f.png)

