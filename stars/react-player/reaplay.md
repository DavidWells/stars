---
repo: react-player/reaplay
url: 'https://github.com/react-player/reaplay'
homepage: 'https://npmjs.com/reaplay'
starredAt: '2022-03-08T05:23:28Z'
createdAt: '2021-12-15T09:02:25Z'
updatedAt: '2024-05-21T07:52:15Z'
language: TypeScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:02.259Z'
description: >-
  React Music Player | the react HOC for create custom players with any styles
  you like
tags:
  - audio
  - audio-player
  - creative-coding
  - custom-player
  - hoc
  - media-player
  - npm-package
  - player
  - react
  - react-audio-player
  - react-music-player
  - react-player
  - reaplay
  - reaplay-react
  - typescript
---

# React Music Player - Reaplay
## React Custom Music Player (with custom HOC component)

> the react HOC for create custom players with any styles you like <br />
> give me your tracks, i will give you the all function and variable you need to create a player

[![NPM](https://img.shields.io/npm/v/reaplay.svg)](https://www.npmjs.com/package/reaplay)
[![License](https://img.shields.io/npm/l/reaplay.svg)](LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Installation

```
npm install --save reaplay
```

```
yarn add reaplay
```

Also be sure you have `react` and `react-dom` installed in your app



## Usage

### tsx
```tsx
import React from 'react';

import { Reaplay, PlayerType } from 'reaplay'

const songList:string[] = [
  "songSrc", // url song
  "songSrc", // url song
   require("./songSrc"), //local song
]

//                         optional ↓
<Reaplay tracks={songList} startIndex={2} >
      {(player: PlayerType) => {
          // player have functions and variables
      }
</Reaplay>
```

### jsx
```jsx
import React from 'react';

import { Reaplay } from 'reaplay'

const songList = [
  "songSrc", // url song
  "songSrc", // url song
   require("./songSrc"), //local song
]

<Reaplay tracks={songList} >
      {(player) => {
          // player have functions and variables
      }
</Reaplay>
```

## Example
See the example directory for a basic working example of using this project.  To run it locally, run `npm install` in the [example directory](https://github.com/Amir-Alipour/reaplay/tree/master/example) and then `npm start`.

or 
<br />

```jsx
<Reaplay tracks={songList} >
      {(player) => {
          
          return (
            <>
              <input
                  type='range'
                  value={player.trackProgress}
                  step='1'
                  min='0'
                  max={player.duration ? player.duration : `${player.duration}`}
                  onChange={(e) => player.onScrub(e.target.value)}
                  onMouseUp={(e) => player.onScrubEnd(e)}
                  onKeyUp={(e) => player.onScrubEnd(e)}
                />

                <button onClick={() => player.toPrevTrack()}>prev</button>
                <button onClick={() => player.play()}>Play</button>
                <button onClick={() => player.pause()}>Pause</button>
                <button onClick={() => player.toNextTrack()}>next</button>

                <input
                  type='range'
                  value={player.volume}
                  step='1'
                  min='0'
                  max='100'
                  onChange={(e) => player.setVolume(+e.target.value)}
                />
                <button onClick={() => player.mute()}>mute</button>
                <button onClick={() => player.unmute()}>unmute</button>
            </>
          )
        }
      }
</Reaplay>
```

<br/>
<br/>

### Props - HOC Parametrs
Param | Type | Default | Notes
--- | --- | --- | ---
`tracks` | String Array | null | it's the main param, the required param for "reaplay" working
`startIndex` | Number | 0 | use it for start at custom index of your tracks array
`children` | Any | Null | ---

<br/>
<br/>

## player props :

### Props - properties
Prop | Type | Default | Notes
--- | --- | --- | ---
`isLoading` | Boolean | false | if use Uri tracks, you need wait for the uri will be load
`isHaveError` | Boolean | false | if your track returned error, it give you a boolean
`trackIndex` | Number | 0 | the playing index of the tracks array
`duration` | Number | song duration | the duration of the playing song
`durationText` | String | song duration converted | the duration of the playing song converted to 00:00 string
`trackProgress` | Number | played duration | the duration of the played of song
`trackStyling` | string | --- | the generated style of track progress
`isPlaying` | Boolean | false | the player on playing or not
`isRepeat` | Boolean | false | the player on `Repeat` the song mode or not
`volume` | Number | 100 | the player volume. <br/> `0` to `100`
`speed` | Number | 1 | the player playbackRate. <br/> `0.5` or `1` or `2`
`isStopPlayMoreSong` | Boolean | false | if the song will be end, dont play more anything
`isShuffle` | Boolean | false | if shuffleList will be true, any action do random </br> (next, prev, ended)
`isMute` | Boolean | false | the player mute status
`buffered` | Number | 0 | the buffered value of the song <br/> `0` to `100`
`bufferedText` | String | 0 | the buffered value of the song <br/> `0%` to `100%`

### Props - Events
Event | param | Description | Example
--- | --- | --- | ---
`Logger` | () | the Logger, console.log the properties seconds by seconds for debug or your testing | player.Logger()
`onScrub` |<pre>(value: number)</pre>| for change track progress on custom duration | `onChange`={(e) => player.onScrub(e.target.value)}
`onScrubEnd` | () | `optional` -- use it on keyUp or ... on your (slider, range, any custom player duration controller) | `onMouseUp`={player.onScrubEnd} <br /> `onKeyUp`={player.onScrubEnd}
`setIsPlaying` | (isPlaying: boolean) | for play or pause the song, use it. | `onClick`={() => player.setIsPlaying((isPlay) => !isPlay)}
`play` | () |  for play the song, use it. | `onClick`={() => player.play()}
`pause` | () | for pause the song, use it. | `onClick`={() => player.pause()}
`setTrackIndex` | (trackIndex: number) | for change handly playing index. | `onClick`={() => player.setTrackIndex(5)}
`toNextTrack` | () | go to next track of the tracks list | player.toNextTrack()
`toPrevTrack` | () | go to prev track of the tracks list | player.toPrevTrack()
`repeat` | (isRepeat: boolean) | turn on or off for repeat the playing song | player.repeat((isRepeat) => !isRepeat)
`setVolume` | (volume: number) | set player volume, `0` to `100` | player.setVolume(70)
`playSlow` | () | set player playbackRate (speed) to `0.5` | player.playSlow()
`playNormal` | () | set player playbackRate (speed) to `1` | player.playNormal()
`playFast` | () | set player playbackRate (speed) to `2` | player.playFast()
`StopPlayMoreSong` | (stopped: boolean) | dont play more anything after the playing song will be ended | player.StopPlayMoreSong(true)
`playRandom` | () | play a random track of your tracks list | player.playRandom()
`playShuffle` | (shuffle: boolean) | the all player action will be random </br> `next` `prev` `ended` | player.playShuffle((isShuffle) => !isShuffle)
`mute` | () | mute  the player | player.mute()
`unmute` | () | unmute  the player | player.unmute()
`forward` | () | forward to 5s later | player.forward()
`backward` | () | backward to 5s before | player.backward()
`forceUpdatePlayer` | () | forece Re-Render player | player.forceUpdatePlayer()
`update` | () | update player | player.update()

</br>
</br>

### Fix Browser Condition : 
browsers don't give access to play sound without at least one user interaction with website <br/>

<img width="798" alt="242920537-9cedf5bb-ad7e-4488-aa03-29765826182b" src="https://github-production-user-asset-6210df.s3.amazonaws.com/73488911/267464235-98384f28-a7f8-440b-9c2c-6745bfe9135a.png">


</br>

## License

MIT © [amir-alipour](https://github.com/amir-alipour) - [LICENSE](https://github.com/Amir-Alipour/reaplay/blob/master/LICENSE)
