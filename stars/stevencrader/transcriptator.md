---
repo: stevencrader/transcriptator
url: 'https://github.com/stevencrader/transcriptator'
homepage: 'https://transcriptator.com/'
starredAt: '2023-04-17T18:43:00Z'
createdAt: '2023-03-09T04:38:30Z'
updatedAt: '2024-11-18T14:07:06Z'
language: TypeScript
license: MIT
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:52.319Z'
description: Library for converting the various transcript file formats to a common format.
tags:
  - podcasting
  - transcripts
---

# Transcriptator

<div align="center">

[![GitHub forks](https://img.shields.io/github/forks/stevencrader/transcriptator.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/stevencrader/transcriptator/network/)
[![GitHub stars](https://img.shields.io/github/stars/stevencrader/transcriptator.svg?style=social&label=Star&maxAge=2592000)](https://github.com/stevencrader/transcriptator/stargazers/)
<br>

[![npm](https://img.shields.io/npm/v/transcriptator)](https://www.npmjs.com/package/transcriptator)
[![npm](https://img.shields.io/npm/v/transcriptator?label=yarn)](https://yarnpkg.com/package?name=transcriptator)
[![install size](https://packagephobia.com/badge?p=transcriptator)](https://packagephobia.com/result?p=transcriptator)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Number of Contributors](https://img.shields.io/github/contributors/stevencrader/transcriptator?style=flat&label=Contributors)](https://github.com/stevencrader/transcriptator/graphs/contributors)
<br/>

[![Issues opened](https://img.shields.io/github/issues/stevencrader/transcriptator?label=Issues)](https://github.com/stevencrader/transcriptator)
[![PRs open](https://img.shields.io/github/issues-pr/stevencrader/transcriptator?label=Pull%20Requests)](https://github.com/stevencrader/transcriptator/pulls)
[![PRs closed](https://img.shields.io/github/issues-pr-closed/stevencrader/transcriptator?label=Pull%20Requests)](https://github.com/stevencrader/transcriptator/pulls?q=is%3Apr+is%3Aclosed)
[![codecov](https://codecov.io/gh/stevencrader/transcriptator/branch/master/graph/badge.svg?token=KZMGXY8LIH)](https://codecov.io/gh/stevencrader/transcriptator)
<br/>

</div>

Library for converting the various transcript file formats to a common format.

Originally designed to help users of the [Podcast Namespace](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#transcript) `podcast:transcript` tag.

## Installation

This is a Node.js module available through npm or yarn.

### Using npm:

```bash
npm install transcriptator
```

### Using yarn:

```bash
yarn add transcriptator
```

### Using CDN:

[transcriptator jsDelivr CDN](https://www.jsdelivr.com/package/npm/transcriptator)

## Usage

There are three primary methods and two types. See the jsdoc for additional information.

The `convertFile` function accepts the transcript file data and parses it in to an array of `Segment`.
If `transcriptFormat` is not defined, will use `determineFormat` to attempt to identify the type.

    convertFile(data: string, transcriptFormat: TranscriptFormat = undefined): Array<Segment>

The `determineFormat` function accepts the transcript file data and attempts to identify the `TranscriptFormat`.

    determineFormat(data: string): TranscriptFormat

The `TranscriptFormat` enum defines the allowable transcript types supported by Transcriptator.

The `Segment` type defines the segment/cue of the transcript.

### Custom timestamp formatter

To change the way the `startTime` and `endTime` are formatted in `startTimeFormatted` and `endTimeFormatted`,
register a custom formatter to be used instead.

The formatter function shall accept a single argument as a number and return the value formatted as a string.

```javascript
import { TimestampFormatter } from "transcriptator"

function customFormatter(timestamp) {
    return timestamp.toString()
}

TimestampFormatter.registerCustomFormatter(customFormatter)
```

### Options for segments

Additional options are available for combining or formatting two or more segments

To change the options, use the `Options.setOptions` function.

The options only need to be specified once and will be used when parsing any transcript data.

To restore options to their default value, call `Options.restoreDefaultSettings`.

The `IOptions` interface used by `Options` defines options for combining and formatting parsed segments.

-   `combineEqualTimes`: boolean
    -   Combine segments if the `Segment.startTime`, `Segment.endTime`, and `Segment.speaker` match between the current and prior segments
    -   Can be used with `combineSegments`. The `combineEqualTimes` rule is applied first.
    -   Can be used with `speakerChange`. The `speakerChange` rule is applied last.
    -   Cannot be used with `combineSpeaker`
    -   Default: false
-   `combineEqualTimesSeparator`: string
    -   Character to use when `combineEqualTimes` is true.
    -   Default: `\n`
-   `combineSegments`: boolean
    -   Combine segments where speaker is the same and concatenated `body` fits in the `combineSegmentsLength`
    -   Can be used with `combineEqualTimes`. The `combineSegments` rule is applied first.
    -   Can be used with `speakerChange`. The `speakerChange` rule is applied last.
    -   Cannot be used with `combineSpeaker`
    -   Default: false
-   `combineSegmentsLength`: number
    -   Max length of body text to use when `combineSegments` is true
    -   Default: See `DEFAULT_COMBINE_SEGMENTS_LENGTH`
-   `combineSpeaker`: boolean
    -   Combine consecutive segments from the same speaker.
    -   Note: If this is enabled, `combineEqualTimes` and `combineSegments` will not be applied.
    -   Warning: if the transcript does not contain speaker information, resulting segment will contain entire transcript text.
    -   Default: false
-   `speakerChange`: boolean
    -   Only include `Segment.speaker` when speaker changes
    -   May be used in combination with `combineSpeaker`, `combineEqualTimes`, or `combineSegments`
    -   Default: false

```javascript
import { Options } from "transcriptator"

Options.setOptions({
    combineSegments: true,
    combineSegmentsLength: 32,
})
```

## Supported File Formats

### SRT

Transcripts which follow the SRT/SubRip format

```text
1
00:00:00,780 --> 00:00:06,210
Adam Curry: podcasting 2.0 March
4 2023 Episode 124 on D flat

2
00:00:06,210 --> 00:00:12,990
formable hello everybody welcome
to a delayed board meeting of

```

The timestamp may contain the hour and minutes but is not required. The millisecond may be separated with either a comma or decimal.

Attempts to find the speaker's name from the beginning of the first line of each segment.

References:

-   https://en.wikipedia.org/wiki/SubRip

### HTML

HTML data in format below are considered to be transcripts.

The elements `cite`, `time`, and `p` are used to define a segment.
The `cite` element is not required. The order is also not required.

The elements may either be a child of the document directly or a direct child of the `html` or `body` element.

Elements do not need to be on separate lines.

**Example 1**

```html
<html>
    <body>
        <cite>Alban:</cite>
        <time>0:00</time>
        <p>
            It is so stinking nice to like, show up and record this show. And Travis has already put together an
            outline. Kevin's got suggestions, I throw my thoughts into the mix. And then Travis goes and does all the
            work from there, too. It's out into the wild. And I don't see anything. That's an absolute joy for at least
            two thirds of the team. Yeah, I mean, exactly.
        </p>
        <cite>Kevin:</cite>
        <time>0:30</time>
        <p>
            You guys remember, like two months ago, when you were like, We're going all in on video Buzzcast. I was
            like, that's, I mean, I will agree and commit and disagree, disagree and commit, I'll do something. But I
            don't want to do this.
        </p>
    </body>
</html>
```

**Example 2**

```html
<p>
    It is so stinking nice to like, show up and record this show. And Travis has already put together an outline.
    Kevin's got suggestions, I throw my thoughts into the mix. And then Travis goes and does all the work from there,
    too. It's out into the wild. And I don't see anything. That's an absolute joy for at least two thirds of the team.
    Yeah, I mean, exactly.
</p>
<time>0:00</time>
<p>
    You guys remember, like two months ago, when you were like, We're going all in on video Buzzcast. I was like,
    that's, I mean, I will agree and commit and disagree, disagree and commit, I'll do something. But I don't want to do
    this.
</p>
<time>0:30</time>
```

### JSON

JSON data in one of the formats below are considered to be transcripts.

In both formats, the data does not need to be in pretty print format.

**Format 1**

```json
{
    "version": "1.0.0",
    "segments": [
        {
            "speaker": "Alban",
            "startTime": 0.0,
            "endTime": 4.8,
            "body": "It is so stinking nice to"
        },
        {
            "speaker": "Alban",
            "startTime": 0.0,
            "endTime": 4.8,
            "body": "like, show up and record this"
        }
    ]
}
```

There must be a `segments` list of objects containing `speaker`, `startTime`, `endTime`, and `body`.

The `startTime` and `endTime` are assumed to be in seconds.

**Format 2**

```json
[
    {
        "start": 1,
        "end": 5000,
        "text": "Subtitles: @marlonrock1986 (^^V^^)"
    },
    {
        "start": 25801,
        "end": 28700,
        "text": "It's another hot, sunny day today\nhere in Southern California."
    }
]
```

The top level element must be a list of objects containing `start`, `end`, and `text`.

The `start` and `end` are assumed to be in milliseconds.

Attempts to find the speaker's name from the beginning of the `text` value.

### WebVTT

Transcripts which follow the WebVTT/VTT format

```
WEBVTT

1
00:00:00.001 --> 00:00:05.000
Subtitles: @marlonrock1986 (^^V^^)

2
00:00:25.801 --> 00:00:28.700
It's another hot, sunny day today
here in Southern California.

```

The index number is optional:

```
WEBVTT

00:00:00.000 --> 00:00:11.840
 Buenas, bienvenidas de vuelta a KDE Express. Esta vez para no perder el ritmo volvemos a la

00:00:11.840 --> 00:00:16.800
 versión movilidad que no tenemos a los compañeros disponibles y hoy quería haceros un especial
```

The timestamp may contain the hour and minutes but is not required. The millisecond may be separated with either a comma or decimal.

Attempts to find the speaker's name from the beginning of the first line of each segment.

References:

-   https://www.w3.org/TR/webvtt1/
-   https://en.wikipedia.org/wiki/WebVTT

## Test Transcripts

Transcripts used for testing are excerpts from the following shows.

-   [Podcasting 2.0](https://podcastindex.org/podcast/920666)
    -   podcasting_20_episode_124.srt (from Episode 124)
-   [Buzzcast](https://buzzcast.buzzsprout.com/231452/9092843)
    -   buzzcast.html
    -   buzzcast.srt
    -   buzzcast.json
-   [How to Start a Podcast](https://feeds.buzzsprout.com/1/2562823/)
    -   how_to_start_a_podcast.json
    -   how_to_start_a_podcast.html
-   [Podnews Daily (2024-01-25)](https://podnews.net/update/nz-podcast-summit-2024)
    -   podnews_daily_2024-01-25.vtt
-   [Podnews Weekly Review (2023-03-17)](https://feeds.buzzsprout.com/1538779/12458004/)
    -   podnews_weekly_review_2023-03-17.html
-   [Podnews Weekly Review (2023-05-05)](https://feeds.buzzsprout.com/1538779/12782529/)
    -   podnews_weekly_review_2023-05-05.json
-   [Podnews Weekly Review (2024-01-19)](https://feeds.buzzsprout.com/1538779/14338472/)
    -   podnews_weekly_review_2024-01-19.vtt
-   [subtitle.js](https://github.com/gsantiago/subtitle.js)
    -   LaLaLand.vtt
    -   LaLaLand.json
-   [KDE Express](https://kdeexpress.gitlab.io/posts/kdeexpress/16-kde-express/)
    -   kde_express-16_kde_en_telegram.vtt

## Contributing

Please see the [Contribution Guide](Contributing.md)
