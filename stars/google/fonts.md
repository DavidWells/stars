---
repo: google/fonts
url: 'https://github.com/google/fonts'
homepage: 'https://fonts.google.com'
starredAt: '2015-06-06T00:13:10Z'
createdAt: '2015-02-11T23:34:54Z'
updatedAt: '2025-02-25T18:21:20Z'
language: HTML
license: NA
branch: main
stars: 18566
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:41.968Z'
description: >-
  Font files available from Google Fonts, and a public issue tracker for all
  things Google Fonts
tags: []
---

[![CI Status](https://github.com/google/fonts/workflows/Continuous%20Test/badge.svg?branch=main)](https://github.com/google/fonts/actions/workflows/ci.yml?query=workflow%3ATest+branch%3Amain)

# Google Fonts Files

This project mainly contains the binary font files served by Google Fonts ([fonts.google.com](https://fonts.google.com))

The top-level directories indicate the license of all files found within them.
Subdirectories are named according to the family name of the fonts within.

Each family subdirectory contains the `.ttf` font files served by Google Fonts, plus a `METADATA.pb` file with metadata for the family (such as information on the project designer(s), genre category, and license - [learn more](https://github.com/googlefonts/gf-docs/tree/master/METADATA)) and a `DESCRIPTION.en_us.html` with a description of the family in US English.

The `/catalog` subdirectory contains additional metadata, such as profile texts and portrait/avatar images of font designers, and this is open for contributions and corrections from anyone via GitHub.

The `/axisregistry` subtree contains metadata for the GF Axis Registry, containing information on variable font axes that can be found in the collection, including experimental axes.
As a subtree, no changes should be made directly to this repo, instead please use the upstream, [github.com/googlefonts/axisregistry](http://github.com/googlefonts/axisregistry)

The `/lang` subtree contains language support data, and should also not be changed here but instead upstream.
[github.com/googlefonts/lang](https://github.com/googlefonts/lang)

## Bug Reports and Improvement Requests

If you find a problem with a font file or have a request for the future development of a font project, please [create a new issue in this project's issue tracker](https://github.com/google/fonts/issues).

## Contribute Fonts

If you need more context on how to create issues in a GitHub issue tracker, or if you want to contribute a font directly, see [CONTRIBUTING](https://github.com/google/fonts/blob/main/CONTRIBUTING.md)

## Contributor Code of Conduct

However you choose to contribute, please abide by our [code of conduct](CODE_OF_CONDUCT.md) to keep our community a healthy and welcoming place.

## Self Host Fonts Available From Google Fonts

Since all the fonts available here are licensed with permission to redistribute, subject to the license terms, you can self-host using a variety of third-party projects.

One popular service is [Fontsource](https://github.com/fontsource/fontsource), which offers bundled NPM packages.

## Local installation package managers

For Linux, macOS, FreeBSD, or HaikuOS you can also use [fnt](https://github.com/alexmyczko/fnt), to install single fonts. For [RPM](http://bootes.ethz.ch/fonts/rpm/), [DEB](http://bootes.ethz.ch/fonts/deb/) based systems, feel free to try the linked URLs for individual fonts. Others can also use the [webservice](http://bootes.ethz.ch/fonts/).

## Download All Google Fonts

You can download all Google Fonts in a simple ZIP snapshot (over 1GB) from <https://github.com/google/fonts/archive/main.zip>

#### Sync With Git

You can also sync the collection with git so that you can update by only fetching what has changed. To learn how to use git, GitHub provides [illustrated guides](https://guides.github.com), a [youtube channel](https://www.youtube.com/user/GitHubGuides), and an [interactive learning site](https://skills.github.com/).
Free, open-source git applications are available for [Windows](https://git-scm.com/download/gui/windows) and [Mac OS X](https://git-scm.com/download/gui/mac).

## License

It is important to always read the license for every font that you use.
Each font family directory contains the appropriate license file for the fonts in that directory.
The fonts files themselves also contain licensing and authorship metadata.

Most of the fonts in the collection use the SIL Open Font License, v1.1.
Some fonts use the Apache 2 license.
The Ubuntu fonts use the Ubuntu Font License v1.0.

The SIL Open Font License has an option for copyright holders to include a Reserved Font Name requirement, and this option is used with some of the fonts.
If you modify those fonts, please take care of this important detail.

## Source Files

Source files for each family are often available from the designer, or from [github.com/googlefonts](https://github.com/googlefonts)

These fonts are usually the result of collaborative projects, where you are invited to discuss issues with the designers and even contribute to their ongoing development.

When customizing or remixing fonts, please do contact the designers to understand what they might need in order to include your improvements.

Most of all: Enjoy the fonts!

– The Google Fonts team
