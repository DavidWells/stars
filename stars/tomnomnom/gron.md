---
repo: tomnomnom/gron
url: 'https://github.com/tomnomnom/gron'
homepage: ''
starredAt: '2025-05-30T21:32:17Z'
createdAt: '2012-09-08T00:46:07Z'
updatedAt: '2025-05-31T15:00:51Z'
language: Go
license: MIT
branch: master
stars: 14085
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-31T21:04:40.326Z'
description: Make JSON greppable!
tags:
  - cli
  - json
---

# gron
[![Build Status](https://travis-ci.org/tomnomnom/gron.svg?branch=master)](https://travis-ci.org/tomnomnom/gron)

Make JSON greppable!

gron transforms JSON into discrete assignments to make it easier to `grep` for what you want and see the absolute 'path' to it.
It eases the exploration of APIs that return large blobs of JSON but have terrible documentation.

<pre>
▶ <b>gron</b> "https://api.github.com/repos/tomnomnom/gron/commits?per_page=1" | fgrep "commit.author"
json[0].commit.author = {};
json[0].commit.author.date = "2016-07-02T10:51:21Z";
json[0].commit.author.email = "mail@tomnomnom.com";
json[0].commit.author.name = "Tom Hudson";
</pre>

gron can work backwards too, enabling you to turn your filtered data back into JSON:
<pre>
▶ gron "https://api.github.com/repos/tomnomnom/gron/commits?per_page=1" | fgrep "commit.author" | <b>gron --ungron</b>
[
  {
    "commit": {
      "author": {
        "date": "2016-07-02T10:51:21Z",
        "email": "mail@tomnomnom.com",
        "name": "Tom Hudson"
      }
    }
  }
]
</pre>

> Disclaimer: the GitHub API has fantastic documentation, but it makes for a good example.

## Installation

gron has no runtime dependencies. You can just [download a binary for Linux, Mac, Windows or FreeBSD and run it](https://github.com/tomnomnom/gron/releases).
Put the binary in your `$PATH` (e.g. in `/usr/local/bin`) to make it easy to use:
```
▶ tar xzf gron-linux-amd64-0.1.5.tgz
▶ sudo mv gron /usr/local/bin/
```

If you're a Mac user you can also [install gron via brew](http://braumeister.org/formula/gron):
```
▶ brew install gron
```

Or if you're a Go user you can use `go install`:

```
▶ go install github.com/tomnomnom/gron@latest
```

It's recommended that you alias `ungron` or `norg` (or both!) to `gron --ungron`. Put something like this in your shell profile (e.g. in `~/.bashrc`):
```
alias norg="gron --ungron"
alias ungron="gron --ungron"
```
Or you could create a shell script in your $PATH named `ungron` or `norg` to affect all users:
```
gron --ungron "$@"
```

## Usage

Get JSON from a file:

```
▶ gron testdata/two.json 
json = {};
json.contact = {};
json.contact.email = "mail@tomnomnom.com";
json.contact.twitter = "@TomNomNom";
json.github = "https://github.com/tomnomnom/";
json.likes = [];
json.likes[0] = "code";
json.likes[1] = "cheese";
json.likes[2] = "meat";
json.name = "Tom";
```

From a URL:

```
▶ gron http://headers.jsontest.com/
json = {};
json.Host = "headers.jsontest.com";
json["User-Agent"] = "gron/0.1";
json["X-Cloud-Trace-Context"] = "6917a823919477919dbc1523584ba25d/11970839830843610056";
```

Or from `stdin`:

```
▶ curl -s http://headers.jsontest.com/ | gron
json = {};
json.Accept = "*/*";
json.Host = "headers.jsontest.com";
json["User-Agent"] = "curl/7.43.0";
json["X-Cloud-Trace-Context"] = "c70f7bf26661c67d0b9f2cde6f295319/13941186890243645147";
```

Grep for something and easily see the path to it:

```
▶ gron testdata/two.json | grep twitter
json.contact.twitter = "@TomNomNom";
```

gron makes diffing JSON easy too:

```
▶ diff <(gron two.json) <(gron two-b.json)
3c3
< json.contact.email = "mail@tomnomnom.com";
---
> json.contact.email = "contact@tomnomnom.com";
```

The output of `gron` is valid JavaScript:

```
▶ gron testdata/two.json > tmp.js
▶ echo "console.log(json);" >> tmp.js
▶ nodejs tmp.js
{ contact: { email: 'mail@tomnomnom.com', twitter: '@TomNomNom' },
  github: 'https://github.com/tomnomnom/',
  likes: [ 'code', 'cheese', 'meat' ],
  name: 'Tom' }
```

It's also possible to obtain the `gron` output as JSON stream via
the `--json` switch:

```
▶ curl -s http://headers.jsontest.com/ | gron --json
[[],{}]
[["Accept"],"*/*"]
[["Host"],"headers.jsontest.com"]
[["User-Agent"],"curl/7.43.0"]
[["X-Cloud-Trace-Context"],"c70f7bf26661c67d0b9f2cde6f295319/13941186890243645147"]
```

## ungronning
gron can also turn its output back into JSON:
```
▶ gron testdata/two.json | gron -u
{
  "contact": {
    "email": "mail@tomnomnom.com",
    "twitter": "@TomNomNom"
  },
  "github": "https://github.com/tomnomnom/",
  "likes": [
    "code",
    "cheese",
    "meat"
  ],
  "name": "Tom"
}
```

This means you use can use gron with `grep` and other tools to modify JSON:
```
▶ gron testdata/two.json | grep likes | gron --ungron
{
  "likes": [
    "code",
    "cheese",
    "meat"
  ]
}
```

or


```
▶ gron --json testdata/two.json | grep likes | gron  --json --ungron
{
  "likes": [
    "code",
    "cheese",
    "meat"
  ]
}
```

To preserve array keys, arrays are padded with `null` when values are missing:
```
▶ gron testdata/two.json | grep likes | grep -v cheese
json.likes = [];
json.likes[0] = "code";
json.likes[2] = "meat";
▶ gron testdata/two.json | grep likes | grep -v cheese | gron --ungron
{
  "likes": [
    "code",
    null,
    "meat"
  ]
}
```

If you get creative you can do [some pretty neat tricks with gron](ADVANCED.mkd), and
then ungron the output back into JSON.

## Get Help

```
▶ gron --help
Transform JSON (from a file, URL, or stdin) into discrete assignments to make it greppable

Usage:
  gron [OPTIONS] [FILE|URL|-]

Options:
  -u, --ungron     Reverse the operation (turn assignments back into JSON)
  -v, --values     Print just the values of provided assignments
  -c, --colorize   Colorize output (default on tty)
  -m, --monochrome Monochrome (don't colorize output)
  -s, --stream     Treat each line of input as a separate JSON object
  -k, --insecure   Disable certificate validation
  -j, --json       Represent gron data as JSON stream
      --no-sort    Don't sort output (faster)
      --version    Print version information

Exit Codes:
  0	OK
  1	Failed to open file
  2	Failed to read input
  3	Failed to form statements
  4	Failed to fetch URL
  5	Failed to parse statements
  6	Failed to encode JSON

Examples:
  gron /tmp/apiresponse.json
  gron http://jsonplaceholder.typicode.com/users/1 
  curl -s http://jsonplaceholder.typicode.com/users/1 | gron
  gron http://jsonplaceholder.typicode.com/users/1 | grep company | gron --ungron
```

## FAQ
### Wasn't this written in PHP before?
Yes it was! The original version is [preserved here for posterity](https://github.com/tomnomnom/gron/blob/master/original-gron.php).

### Why the change to Go?
Mostly to remove PHP as a dependency. There's a lot of people who work with JSON who don't have PHP installed.

### Why shouldn't I just use jq?
[jq](https://stedolan.github.io/jq/) is *awesome*, and a lot more powerful than gron, but with that power comes
complexity. gron aims to make it easier to use the tools you already know, like `grep` and `sed`.

gron's primary purpose is to make it easy to find the path to a value in a deeply nested JSON blob
when you don't already know the structure; much of jq's power is unlocked only once you know that structure.
