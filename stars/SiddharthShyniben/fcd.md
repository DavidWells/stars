---
repo: SiddharthShyniben/fcd
url: 'https://github.com/SiddharthShyniben/fcd'
homepage: null
starredAt: '2022-03-13T06:49:22Z'
createdAt: '2021-04-12T11:22:03Z'
updatedAt: '2024-12-25T06:17:18Z'
language: JavaScript
license: GPL-3.0
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:00.194Z'
description: Faster cd-ing.
tags: []
---

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Downloads][downloads-shield]][downloads-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/SiddharthShyniben/fcd">
    <img src="assets/logo.svg" alt=">_" width="80" height="80">
  </a>

  <h3 align="center">fcd</h3>

  <p align="center">
    Better <code>cd</code>ing for macOS
    <br />
    <a href="#documentation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SiddharthShyniben/fcd/issues">Report Bug</a>
    ·
    <a href="https://github.com/SiddharthShyniben/fcd/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

> Please star this repo if you found this tool useful :star2:

![fcd Screen Shot][product-gif]

`fcd` is a utility which helps you `cd` faster on macOS. 

Ever had to type out a long `cd ~/Sites/Projects/project`, find out the path is wrong, rewrite it to `cd ~/Sites/Sandbox/project`? You just wasted a minute or two. 
This inspired me to create this tool: `fcd`.

`fcd` automatically reads the <abbr title="the directory name of a path, similar to the Unix dirname command">dirname</abbr> and the <abbr title="the last portion of a path, similar to the Unix basename">basename</abbr> of the input and searches for any folder with basename as the name in the dirname folder (Basically, if you input `"some/where/else"`, the program returns the path to `"some/where/**/else"`). Once it finishes:
* If there is more than one folder named basename, it gives you a list of options to choose from, then it copies the `cd <path-to-folder>` command to your clipboard.
* If there is only one folder named basename, it directly copies the `cd <path-to-folder>` command to your clipboard.

I originally meant to automatically execute the `cd <path-to-folder>` command, but then I realized that **it is impossible**, so the `cd <path-to-folder>` command is copied to clipboard instead.



### Built With

* [Node.js][node-url]


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have [Node.js][node-url] (and npm) installed.

### Installation

1. Install using npm
  ```console
    $ npm i -g fcd
  ```
2. Be more productive :smile:
  ```console
    $ fcd ./project
  ```

<!-- USAGE EXAMPLES -->
## Usage

```console
$ fcd path/to/search/foldername-to-search-for
```

_For more examples, please refer to the [Documentation](#documentation)_



<!-- Documentation -->
## Documentation

The usage of this cli is very simple. It boasts two commands:

* The `fcd` command
* The `fcd-config` command

### `fcd`

`fcd` takes one argument `"path"` to search. You can optionally use the `"-v"`/`"--verbose"` option to run it in verbose mode, which shows you all the searched folders.

Example:

```console
$ fcd path -v
```

### `fcd-config`

The `fcd-config` command is used to configure the `fcd` command. It currently has only configurable three options: 

* `ignoredFolders`: List of folders to be ignored. Defaults to `node_modules,Trash,Library`
* `ignoreDotFolders`: Whether to ignore `.folders` like `.git` or `.bin`. Defaults to `true`
* `addNewlineToCopy`: Whether to add a newline to the copied `cd` command. When set to `true`, the copied `cd` command will automatically run when pasted and vice-versa. Defaults to `true`

There are quite a few sub-commands, namely:

* `get <key>`: Used to get the value of a configuration.
  
  Example:
  ```console
  $ fcd-config get ignoredFolders
  fcd SUC! `ignoredFolders`: `["Trash","node_modules","Library"]`
  $ fcd-config get ignoreDotFolders
  fcd SUC! `ignoreDotFolders`: `true`
  ```
* `set <key> <value>`: Used to set the value of a configuration.

  `set`ting completely overwrites the previous configuration. If you meant to add a value to, for example, `ignoredFolders` use the `add` command.
  
  Example:
  ```console
  $ fcd-config set ignoredFolders Trash,node_modules,Library,Music
  fcd WARN! Setting array values directly will overwrite all values
  fcd WARN! not add to them. Use the add command if you meant to add
  fcd SUC! Set `ignoredFolders` to `Trash,node_modules,Library,Music`
  $ fcd-config set ignoreDotFolders false
  fcd SUC! Set `ignoreDotFolders` to `false`
  ```
* `add <key> <values...>`: Used to add a value to a configuration with an array as a value.

  This command can currently be used only for the `ignoreDotFolders` setting. If you set any other property using this command, that setting will become `false`, even if the success message does not say so.
  <!-- I didn't mean to, but yeah, I got lazy -->
  
  Example:
  ```console
  $ fcd-config add ignoredFolders Music
  fcd SUC! Added `Music` to `ignoredFolders`
  $ fcd-config add ignoreDotFolders true
  fcd SUC! Added `true` to `ignoreDotFolders`
  $ fcd-config get ignoreDotFolders
  fcd SUC! `ignoreDotFolders`: `false`
  ```
* `path`: Used to get the path to the configuration file (JSON)
  
  Example:
  ```console
  $ fcd-config path
  fcd SUC! Path: `/Users/apple/Library/Preferences/fcd-nodejs/config.json`
  ```
* `reset [keys...]`: Used to reset all keys **or** the provided keys to their default values
  
  Example:
  ```console
  $ fcd-config reset ignoredFolders
  fcd SUC! `ignoredFolders` reset successfully
  $ fcd-config reset ignoredFolders,ignoreDotFolders
  fcd SUC! `ignoredFolders,ignoreDotFolders` reset successfully
  $ fcd-config reset
  fcd SUC! Config reset successfully
  ```



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/SiddharthShyniben/fcd/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Discuss the contribution
2. Fork the Project
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

More info is available in the [CONTRIBUTING file](./CONTRIBUTING.md)



<!-- LICENSE -->
## License

Distributed under the GNU GPL-3.0 License. See [`LICENSE`](./LICENSE) for more information.



<!-- CONTACT -->
## Contact

Siddharth Shyniben - siddharth.muscat@gmail.com

Project Link: [https://github.com/SiddharthShyniben/fcd](https://github.com/SiddharthShyniben/fcd)





<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/SiddharthShyniben/fcd.svg?style=for-the-badge
[contributors-url]: https://github.com/SiddharthShyniben/fcd/graphs/contributors
[downloads-shield]: https://img.shields.io/npm/dw/fcd?style=for-the-badge
[downloads-url]: https://www.npmjs.com/package/fcd
[forks-shield]: https://img.shields.io/github/forks/SiddharthShyniben/fcd.svg?style=for-the-badge
[forks-url]: https://github.com/SiddharthShyniben/fcd/network/members
[stars-shield]: https://img.shields.io/github/stars/SiddharthShyniben/fcd.svg?style=for-the-badge
[stars-url]: https://github.com/SiddharthShyniben/fcd/stargazers
[issues-shield]: https://img.shields.io/github/issues/SiddharthShyniben/fcd.svg?style=for-the-badge
[issues-url]: https://github.com/SiddharthShyniben/fcd/issues
[license-shield]: https://img.shields.io/github/license/SiddharthShyniben/fcd.svg?style=for-the-badge
[license-url]: https://github.com/SiddharthShyniben/fcd/blob/master/LICENSE
[product-gif]: ./assets/demo/fcdemo.gif
[node-url]: https://nodejs.org
