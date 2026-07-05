---
repo: andrewiggins/collect-react-stats
url: 'https://github.com/andrewiggins/collect-react-stats'
homepage: null
starredAt: '2020-09-20T02:59:12Z'
createdAt: '2020-09-17T03:35:31Z'
updatedAt: '2024-01-09T02:14:22Z'
language: JavaScript
license: MIT
branch: main
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:30.361Z'
description: CLI to collect stats about React usage on a website
tags: []
---

# collect-react-stats

CLI to collect stats about React usage on a website

## Usage

```shell
$ npx collect-react-stats https://reactjs.org
```

## Options

```shell
$ npx collect-react-stats --help

  Description
    Collect stats about React usage on a website

  Usage
    $ collect-react-stats [file] [options]

  Options
    -o, --output     File to output results to  (default collect-react-stats.json)
    -g, --graphs     Display graphs related to stats  (default false)
    -d, --debug      Enable extra logging and debugging  (default false)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ collect-react-stats https://reactjs.org

```

## Features

- Get stats on:
  - The type of VNodes rendered and how many children they were rendered with
  - When a VNode only has one child, what type it is
  - Estimate of how quickly VNodes are created when a render is started
- Allows user to browser whatever websites they want to and it tries to collect
  stats on any website that uses React.

If `puppeteer` is installed, this project will try to use that to run the
collection. If not, it will then try to use the local version of Chrome
installed along with `puppeteer-core` to drive the browser.

## Sample output

```text
$ npx collect-react-stats https://reactjs.org

Close the browser when you are finished collecting your sample to see your results.

Results for https://reactjs.org/

Render Frequency:
(Columns are number of children. Data is number of times that type rendered with that number of children)
┌───────────────────────────┬───────┬─────┬──────┬─────┬────┬────┬───┬───┬───┬────┬────┐
│ Type                      │ Total │ 0   │ 1    │ 2   │ 3  │ 4  │ 5 │ 8 │ 9 │ 12 │ 22 │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ class                     │ 212   │ 33  │ 60   │ 113 │ 3  │    │   │   │ 3 │    │    │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ dom                       │ 845   │ 217 │ 223  │ 344 │ 37 │ 15 │ 3 │ 2 │ 2 │ 1  │ 1  │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ function                  │ 557   │ 94  │ 426  │ 26  │ 7  │ 3  │   │   │ 1 │    │    │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ Symbol(react.context)     │ 446   │     │ 446  │     │    │    │   │   │   │    │    │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ Symbol(react.forward_ref) │ 292   │     │ 80   │ 206 │ 6  │    │   │   │   │    │    │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ Symbol(react.fragment)    │ 2     │     │      │ 2   │    │    │   │   │   │    │    │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ Symbol(react.provider)    │ 14    │     │ 14   │     │    │    │   │   │   │    │    │
├───────────────────────────┼───────┼─────┼──────┼─────┼────┼────┼───┼───┼───┼────┼────┤
│ Totals                    │ 2368  │ 344 │ 1249 │ 691 │ 53 │ 18 │ 3 │ 2 │ 6 │ 1  │ 1  │
└───────────────────────────┴───────┴─────┴──────┴─────┴────┴────┴───┴───┴───┴────┴────┘

Single child type:
┌───────────────────────────┬───────┐
│ Type                      │ Total │
├───────────────────────────┼───────┤
│ class                     │ 11    │
├───────────────────────────┼───────┤
│ dom                       │ 93    │
├───────────────────────────┼───────┤
│ function                  │ 818   │
├───────────────────────────┼───────┤
│ null                      │ 6     │
├───────────────────────────┼───────┤
│ Symbol(react.forward_ref) │ 1     │
├───────────────────────────┼───────┤
│ Symbol(react.provider)    │ 4     │
├───────────────────────────┼───────┤
│ text                      │ 316   │
├───────────────────────────┼───────┤
│ Total                     │ 1249  │
└───────────────────────────┴───────┘


VNode creation rate:
Min: 0.2 Average: 1.6731789167606441 Max: 5.914414414414415
```

```
> npx collect-react-stats --graphs https://facebook.com
npx: installed 94 in 19.679s
Close the browser when you are finished collecting your sample to see your results.
Puppeteer not found. Trying local Chrome installation.
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...
Skipping non http(s) URL: data:application/x-javascript; charset=utf-8;base64,aWYgKHNlbGYuQ2F2YWxyeUxvZ2dlcikgeyBDYXZhbHJ5TG9n...

Results for https://www.facebook.com/

Render Frequency:
(Columns are number of children. Data is number of times that type rendered with that number of children)
┌─────────────────────────────┬───────┬───────┬───────┬──────┬─────┬─────┬─────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│ Type                        │ Total │ 0     │ 1     │ 2    │ 3   │ 4   │ 5   │ 6  │ 7  │ 8  │ 9  │ 10 │ 12 │ 13 │ 14 │ 15 │ 20 │ 21 │ 29 │ 57 │ 59 │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ class                       │ 1714  │ 891   │ 821   │ 2    │     │     │     │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ dom                         │ 10944 │ 1483  │ 6280  │ 2215 │ 541 │ 111 │ 213 │ 33 │ 11 │ 1  │ 21 │    │ 14 │ 20 │    │    │ 1  │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ function                    │ 16934 │ 9185  │ 6978  │ 613  │ 69  │ 19  │ 18  │ 2  │    │ 8  │ 2  │ 4  │    │ 14 │    │    │    │ 4  │ 2  │ 9  │ 7  │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.context)       │ 23    │       │ 23    │      │     │     │     │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.forward_ref)   │ 6505  │ 1614  │ 4532  │ 185  │ 155 │ 13  │ 2   │    │    │    │    │    │    │    │    │    │    │ 4  │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.fragment)      │ 2417  │ 1     │ 194   │ 1546 │ 61  │ 597 │ 8   │    │    │    │ 3  │    │    │    │    │ 7  │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.legacy_hidden) │ 553   │       │ 469   │ 49   │ 35  │     │     │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.memo)          │ 485   │ 435   │ 50    │      │     │     │     │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.provider)      │ 4129  │ 1     │ 3847  │ 181  │ 63  │ 31  │     │    │    │    │    │    │    │    │    │    │    │ 6  │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.scope)         │ 636   │       │ 600   │ 18   │ 18  │     │     │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.suspense)      │ 687   │       │ 97    │ 590  │     │     │     │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Symbol(react.suspense_list) │ 32    │       │       │ 6    │ 6   │ 2   │ 2   │    │    │ 2  │ 4  │ 2  │    │ 5  │ 3  │    │    │    │    │    │    │
├─────────────────────────────┼───────┼───────┼───────┼──────┼─────┼─────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ Totals                      │ 45059 │ 13610 │ 23891 │ 5405 │ 948 │ 773 │ 243 │ 35 │ 11 │ 11 │ 30 │ 6  │ 14 │ 39 │ 3  │ 7  │ 1  │ 14 │ 2  │ 9  │ 7  │
└─────────────────────────────┴───────┴───────┴───────┴──────┴─────┴─────┴─────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘

Single child type:
┌─────────────────────────────┬───────┐
│ Type                        │ Total │
├─────────────────────────────┼───────┤
│ class                       │ 139   │
├─────────────────────────────┼───────┤
│ dom                         │ 3331  │
├─────────────────────────────┼───────┤
│ function                    │ 9666  │
├─────────────────────────────┼───────┤
│ null                        │ 1102  │
├─────────────────────────────┼───────┤
│ Symbol(react.forward_ref)   │ 3566  │
├─────────────────────────────┼───────┤
│ Symbol(react.fragment)      │ 1804  │
├─────────────────────────────┼───────┤
│ Symbol(react.legacy_hidden) │ 553   │
├─────────────────────────────┼───────┤
│ Symbol(react.memo)          │ 797   │
├─────────────────────────────┼───────┤
│ Symbol(react.provider)      │ 2008  │
├─────────────────────────────┼───────┤
│ Symbol(react.scope)         │ 55    │
├─────────────────────────────┼───────┤
│ Symbol(react.suspense)      │ 1     │
├─────────────────────────────┼───────┤
│ text                        │ 869   │
├─────────────────────────────┼───────┤
│ Total                       │ 23891 │
└─────────────────────────────┴───────┘


VNode creation rate:
Min: 0 Average: 7.860486063947004 Max: 60

      60.00 ┼                             ╭╮
      58.80 ┤                             ││
      57.60 ┤                             ││
      56.40 ┤                             ││
      55.20 ┤                             ││
      54.00 ┤                   ╭╮        ││
      52.80 ┤                   ││        ││
      51.60 ┤                   ││        ││
      50.40 ┤                   ││        ││
      49.20 ┤                   ││        ││
      48.00 ┤                   ││        ││
      46.80 ┤                   ││        ││
      45.60 ┤                   ││        ││
      44.40 ┤                   ││        ││
      43.20 ┤                   ││        ││
      42.00 ┤                   ││        ││
      40.80 ┤                   ││        ││
      39.60 ┤                   ││        ││
      38.40 ┤                   ││        ││
      37.20 ┤                   ││        ││
      36.00 ┤                   ││        ││
      34.80 ┤                   ││        ││
      33.60 ┤                   ││        ││
      32.40 ┤                   ││        ││              ╭╮
      31.20 ┤                   ││        ││              ││
      30.00 ┤                ╭╮ ││        ││              ││
      28.80 ┤                ││ ││        ││              ││
      27.60 ┤                ││ ││        ││              ││
      26.40 ┤                ││ ││        ││              ││
      25.20 ┤                ││ ││        ││              ││
      24.00 ┤                ││ ││        ││              ││
      22.80 ┤                ││ ││        ││              ││
      21.60 ┤                ││ ││        ││              ││
      20.40 ┤              ╭╮││ ││        ││   ╭╮      ╭╮ ││
      19.20 ┤              ││││ ││        ││   ││      ││ ││
      18.00 ┤              ││││ ││        ││   ││      ││ ││
      16.80 ┤              ││││ ││        ││   ││      ││ ││
      15.60 ┤              ││││ ││        ││   ││      ││ ││
      14.40 ┤              ││││ ││        ││╭╮ ││      ││ ││
      13.20 ┤              ││││ ││        ││││ ││      ││ ││
      12.00 ┤              ││││ ││        ││││ ││      ││ ││    ╭
      10.80 ┤              ││││ │╰╮   ╭╮  ││││ ││      ││ ││    │
       9.60 ┤              ││││ │ │   ││  ││││╭╯│      ││ ││  ╭╮│
       8.40 ┤              ││││ │ │   ││  │││││ │╭─╮   ││ ││  │││
       7.20 ┤              ││││ │ │   ││╭╮│││││ ││ ╰╮  ││╭╯│  │││
       6.00 ┤        ╭╮    ││││ │ │  ╭╯││││╰╯││ ││  │  │││ │  │││
       4.80 ┤╭╮      ││    ││││ │ │╭╮│ ││││  ││ ││  │  │││ ╰╮╭╯││
       3.60 ┤││     ╭╯│ ╭╮ ││││╭╯ ││╰╯ ╰╯││  ││ ││  │  │││  ││ ╰╯
       2.40 ┤│╰─╮   │ │╭╯│╭╯││││  ││     ││  ││ ││  │  │││  ││
       1.20 ┤│  │╭─╮│ ││ ╰╯ ││││  ╰╯     ││  ││ ││  ╰╮ │││  ││
       0.00 ┼╯  ╰╯ ╰╯ ╰╯    ╰╯╰╯         ╰╯  ╰╯ ╰╯   ╰─╯╰╯  ╰╯

VNode count:

   45059.00 ┼                                                  ╭─
   44158.24 ┤                                        ╭─────────╯
   43257.48 ┤                                    ╭───╯
   42356.72 ┤                                    │
   41455.96 ┤                                    │
   40555.20 ┤                                    │
   39654.44 ┤                                    │
   38753.68 ┤                                    │
   37852.92 ┤                                    │
   36952.16 ┤                                    │
   36051.40 ┤                                    │
   35150.64 ┤                                    │
   34249.88 ┤                                    │
   33349.12 ┤                                    │
   32448.36 ┤                                    │
   31547.60 ┤                                    │
   30646.84 ┤                              ╭─────╯
   29746.08 ┤                           ╭──╯
   28845.32 ┤                           │
   27944.56 ┤                           │
   27043.80 ┤                           │
   26143.04 ┤                           │
   25242.28 ┤                           │
   24341.52 ┤                           │
   23440.76 ┤                           │
   22540.00 ┤                           │
   21639.24 ┤                           │
   20738.48 ┤                           │
   19837.72 ┤                           │
   18936.96 ┤                           │
   18036.20 ┤                         ╭─╯
   17135.44 ┤                         │
   16234.68 ┤                         │
   15333.92 ┤                         │
   14433.16 ┤                   ╭─────╯
   13532.40 ┤           ╭───────╯
   12631.64 ┤          ╭╯
   11730.88 ┤        ╭─╯
   10830.12 ┤        │
    9929.36 ┤        │
    9028.60 ┤        │
    8127.84 ┤        │
    7227.08 ┤        │
    6326.32 ┤        │
    5425.56 ┤        │
    4524.80 ┤     ╭──╯
    3624.04 ┤  ╭──╯
    2723.28 ┤ ╭╯
    1822.52 ┤ │
     921.76 ┤ │
      21.00 ┼─╯
```
