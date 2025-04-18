---
repo: bbody/CMD-Resume
url: 'https://github.com/bbody/CMD-Resume'
homepage: 'https://cmd-resume.bbody.io'
starredAt: '2019-11-01T05:40:38Z'
createdAt: '2013-09-08T02:38:21Z'
updatedAt: '2024-10-08T03:42:57Z'
language: JavaScript
license: MIT
branch: master
stars: 80
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:14.456Z'
description: Web-based Command Line Resume
tags:
  - javascript
  - jquery
  - jquery-mousewheel
  - jquery-plugin
  - jquery-terminal
  - json-resume
  - jsonresume
  - resume
---

[![Build Status][travis build img]][travis]
[![Maintainability][maintain img]][maintain]
[![npm version][npm version img]][npm version]

[maintain]: https://codeclimate.com/github/bbody/CMD-Resume/maintainability
[maintain img]: https://api.codeclimate.com/v1/badges/245ed2739858462f5337/maintainability
[npm version]: https://badge.fury.io/js/cmd-resume
[npm version img]: https://badge.fury.io/js/cmd-resume.svg
[travis build img]: https://travis-ci.org/bbody/CMD-Resume.svg?branch=master
[travis]: https://travis-ci.org/bbody/CMD-Resume

# CMD Resume
## Description
CMD-Resume is a Javascript based command line for demonstrating your resume.
[Here][cmd example] is an example of a resume in a command line.

![CMD Resume Screenshot][cmd example image]

- [Blog Post][blog]
- [Hacker News Discussion][hackernews]
- [Reddit Discussion][reddit]

## Setup
### Prerequisites
- [jQuery 3.X.X][jquery]
- [jQuery Terminal 2.0.1][jquery terminal]
- [Keyboard Polyfill][polyfill]

### Steps
1. Include [jQuery][]
2. Include [Keyboard Polyfill][polyfill]
3. Include [jQuery Terminal][]
4. Download *cmd-resume.js* ([Download latest version here][version])
5. Create a [JSON Resume][] file and upload to a remote directory or add to
   your website project
6. \[Optional] Create a
   ([custom CMD Resume data file and extra commands][schema]) and upload to a
   remote directory or add to your website project
7. Initialize CMD Resume. **Note:** Settings and CMD Resume custom data are
   both optional variables
```javascript
$(document).ready(function() {
	var settings = {
		showForks: false,
		title: {
			color: 'white',
			bold: false,
			italic: true
		},
		command: {
			color: 'green',
			bold: true,
			italic: false,
			backgroundColor: 'pink'
		},
		name: {
			color: 'purple'
		},
		extraDetails: 'responses/extra-details.json',
		customCommands: [
			{
				name: 'spiritanimal',
				title: 'Spirit Animal',
				description: 'the animal I most identify with',
				type: 'basic',
				data: ['extra', 'spiritanimal']
			},
			{
				name: 'geolocation',
				title: 'Geolocation',
				description: 'checks if geolocation is enabled',
				type: 'system',
				handler: function() {
					return 'Geolocation is ' +
					(navigator.geolocation ?  '' : 'not ') +
						'supported for this browser';
				}
			},
			{
				name: 'projectyears',
				title: 'Project Years',
				description: 'years since the project started',
				type: 'calculated',
				data: ['extra', 'project_start'],
				dataIsObject: true,
				handler: function(value) {
					var startYear = (new Date(value.unixtime)).getFullYear();
					var endYear = (new Date()).getFullYear();
					return 'Started ' + (endYear - startYear) +
						' years ago to ' + value.motivation;
				}
			},
			{
				name: 'countries',
				title: 'Countries',
				description: 'countries that I\'ve been to',
				type: 'array',
				data: ['extra', 'countriestravelledto'],
				handlers: {
					organisation: function(value) {
						return value.name;
					},
					title: function(value) {
						return value.cities.join(', ');
					},
					date: function(value) {
						return value.timeperiod;
					}
				}
			},
			{
				name: 'location',
				title: 'Location',
				description: 'current location',
				type: 'calculated',
				data: ['basics', 'location'],
				dataIsObject: true,
				handler: function(data) {
					return 'The great city of ' + data.city;
				}
			}
		]
	};
	$('body').CMDResume('responses/details.json', settings);
});

```
8. Upload to website

## Browser Compatibility
| ![Chrome][] | ![Firefox][] | ![Edge][]  | ![Safari][] | ![IE][]   |
|:-----------:|:------------:|:----------:|:-----------:|:---------:|
| 71 & 70 ✔   | 64 & 63 ✔    | 16 & 15 ✔  | 11 - 9 ✔    | 11 & 10 ✔ |

Assets from [Browser Logos][].

[browser logos]: https://github.com/alrra/browser-logos
[chrome]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[edge]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png
[firefox]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[ie]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer-tile_10-11/internet-explorer-tile_10-11_48x48.png
[opera]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[safari]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png

## Bugs and suggestions
If you find any bugs or have any suggestions on how to improve CMD Resume please
post in the [Github issues][issues].

## How to contribute
If you wish to work on existing issues please check out the
[Github issues][issues].

If you wish to contribute feel please read the [Contribution Guide][contribute].

[cmd example]: http://cmd-resume.bbody.io/
[cmd example image]: https://raw.githubusercontent.com/bbody/CMD-Resume/master/docs/images/output.gif "CMD Resume Screenshot"
[contribute]: CONTRIBUTING.md
[issues]: https://github.com/bbody/CMD-Resume/issues
[jquery]: https://jquery.com/
[jquery mousewheel]: https://github.com/jquery/jquery-mousewheel
[jquery terminal]: http://terminal.jcubic.pl/
[json resume]: https://jsonresume.org/
[polyfill]: https://rawgit.com/inexorabletash/polyfill/master/keyboard.js
[schema]: CMD-RESUME-DATA-SCHEMA.md
[version]: https://github.com/bbody/CMD-Resume/releases/latest
[blog]: https://www.brendonbody.com/2019/01/07/cmd-resume/
[hackernews]: https://news.ycombinator.com/item?id=21415593
[reddit]: https://www.reddit.com/r/SideProject/comments/dr10gi/command_line_r%C3%A9sum%C3%A9/
