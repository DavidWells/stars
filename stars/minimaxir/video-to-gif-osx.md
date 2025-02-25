---
repo: minimaxir/video-to-gif-osx
url: 'https://github.com/minimaxir/video-to-gif-osx'
homepage: null
starredAt: '2022-01-25T02:01:40Z'
createdAt: '2015-08-13T04:24:57Z'
updatedAt: '2025-01-31T18:29:13Z'
language: Shell
license: MIT
branch: master
stars: 393
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.012Z'
description: >-
  A set of utilities that allow the user to easily convert video files to
  very-high-quality GIFs on OS X.
tags: []
---

# Convert Video to GIF on OSX

This repository contains a set of utilities that allow the user to easily convert video files to high-quality, low file size GIFs on OS X. This post is a complement to my blog post [Making a Video-to-GIF Right-Click Menu Item in OS X](http://minimaxir.com/2015/08/gif-to-video-osx/)

![](http://minimaxir.com/img/video-to-gif-osx/convert_to_gif.gif)

The primary intent for this tool is used with Quicktime Movie files obtained from using the Screen Recording feature on OS X or iOS input.

The tool comes in three forms, depending on user needs:

* **[Convert Video to GIF](https://github.com/minimaxir/video-to-gif-osx/raw/master/Convert%20Video%20to%20GIF.zip)** - A OS X Service which adds a "Convert Video to GIF" right-click menu item to all video files, which outputs a GIF of the video in the same folder of the source(s). (file must be unzipped on desktop)
* **[video_to_gif_osx.sh](https://raw.githubusercontent.com/minimaxir/video-to-gif-osx/master/video_to_gif_osx.sh)** - A Shell script which accepts video(s) as parameter(s) and outputs a GIF of the video in the same folder of the source(s).
* **[Convert Video to GIF App](https://github.com/minimaxir/video-to-gif-osx/raw/master/Convert%20Video%20to%20GIF%20App.zip)** - An Application which prompts the user for video(s) and outputs a GIF of the video in the same folder of the source(s). (file must be unzipped on desktop; when prompted for security warning go to "Security and Privacy" in System Preference and allow Convert Video to GIF App to run)

There is also a special fourth tool, [Convert Video to GIF App Custom](https://github.com/minimaxir/video-to-gif-osx/raw/master/Convert%20Video%20to%20GIF%20App%20Custom.zip) app, which is less streamlined but also allows you to specify a custom start time, end time, maximum width, frame rate, and # of colors. For example, here's a GIF of [Freedom Planet](https://en.wikipedia.org/wiki/Freedom_Planet) from a test video of 2:00 to 2:05, a max width of 640px, and 4 colors:

![](http://i.imgur.com/ZSY6RM7.gif)

## Installation

*Note: Installation may have issues depending on system config, particularly step #2. If you run into issues, let me know.*

1. Open up Terminal and install [Homebrew](http://brew.sh) by running this command and following the instructions:

		ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
		
2. Install the three GIF-making applications using this Homebrew command:

		brew install ImageMagick mplayer gifsicle

3. Download the tool of choice. To install the Convert Video to GIF Service, download and double-click.

## Tests

When running into the script, you may run into an issue where the .GIF is generated, but the file size is zero bytes. That means the script errored out at some point except the "create a GIF" line.

The `tests` folder contains a basic test case to debug the script. To activate the test, `cd` into the folder and run:

	sh test.sh test_video.mov
	
This outputs a `test_results.txt` in addition to the test GIF. If `test_results.txt` matches `expected_results.txt`, you should be good to go. If there is a discrepency, send me the output of `test_results.txt`.

## Notes

All forms have a max GIF width of 480px; this is a value chosen to both manage file size and compatability with all applications. If you wish to create larger GIFs, open up the tool and change the value of `GIF_MAX_SIZE` at the beginning of the file.

## Known Issues

* If the video has unusual dimensions (e.g. 7.00 aspect ratio), the GIF output will not be resized correctly. (in fairness, you probably do not want a GIF with an unusual aspect ratio)
* If the video file or the parent directory has spaces, the tool may throw errors.
* Convert Video to GIF Custom has no sanity check for input validation yet. (e.g. don't increase the frame rate beyond 60fps or bad things happen). If you encounter any issues *specific to the Custom app*, let me know.

## Maintainer
* Max Woolf [(@minimaxir)](http://minimaxir.com)
