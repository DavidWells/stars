---
repo: niloysikdar/react-awesome-audio
url: 'https://github.com/niloysikdar/react-awesome-audio'
homepage: 'https://www.npmjs.com/package/react-awesome-audio'
starredAt: '2022-01-02T05:45:31Z'
createdAt: '2022-01-01T09:45:20Z'
updatedAt: '2023-12-03T08:49:23Z'
language: TypeScript
license: MIT
branch: main
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:24.274Z'
description: "A package with Optimized and Supercharged React hook to play audio without any DOM element \U0001F4AA\U0001F3A7"
tags:
  - audio-player
  - hacktoberfest
  - hacktoberfest-accepted
  - hacktoberfest2022
  - hooks
  - npm-package
  - react
---

# react-awesome-audio

### Optimized and Supercharged React hook to play audio without any DOM element 💪🎧

Find the npm package [here](https://www.npmjs.com/package/react-awesome-audio)

<p>
  <a href="https://badge.fury.io/js/react-awesome-audio"><img src="https://badge.fury.io/js/react-awesome-audio.svg" alt="npm version" /></a>
</p>

### Star the [GitHub repo](https://github.com/niloysikdar/react-awesome-audio) to keep the developer motivated ✨

## Installation

- using npm

```
npm i react-awesome-audio
```

or

```
npm install --save react-awesome-audio
```

- using yarn

```
yarn add react-awesome-audio
```

Also be sure you have `react` installed in your app at version 16.8 or above.

## Usage

### Using audio URL

    import { useAudio } from "react-awesome-audio";

    const App = () => {
        const { isPlaying, play, pause, toggle } = useAudio({
            src: "https://p.scdn.co/mp3-preview/d09498fe7e41e26b90682c3b5a0819bbcc3378e2",
            loop: true,
        });

        return (
            <div>
                <button onClick={toggle}>{isPlaying ? "Pause" : "Play"}</button>
            </div>
        );
    };

    export default App;

### Using asset audio

```
import { useAudio } from "react-awesome-audio";
import song from "./assets/song.mp3";

const App = () => {
  const { isPlaying, play, pause, toggle } = useAudio({
    src: song,
    loop: true,
  });

  return (
    <div>
      <button onClick={toggle}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default App;
```

**_Note: To import audio file from assets in TypeScript, you need to use require() instead of ES6 import, [see this](https://stackoverflow.com/a/59456219) for more details._**

### Example

See the [example directory](https://github.com/niloysikdar/react-awesome-audio/tree/main/example) for a basic working example of using this project. To run it locally, run `npm install` in the example directory and then `npm start`.

## Options

| Option         | Type     | Default    | Description                                                                                 |
| -------------- | -------- | ---------- | ------------------------------------------------------------------------------------------- |
| `src`          | String   | `required` | Audio source                                                                                |
| `loop`         | Boolean  | false      | Loop the audio                                                                              |
| `volume`       | Number   | 1 (max)    | Volume of the audio, ranging from 0(min) to 1(max)                                          |
| `muted`        | Boolean  | false      | Mute the audio, `Note`: if you pass both volume and `muted: true`, then audio will be muted |
| `onLoadedData` | Function | () => {}   | call the function when the audio data has been loaded                                       |
| `onError`      | Function | () => {}   | call the function when the audio encounters an error                                        |
| `onEnded`      | Function | () => {}   | call the function when the audio ends                                                       |

## Bugs and Features

See the [issues](https://github.com/niloysikdar/react-awesome-audio/issues) for a list of proposed features (and known issues). Feel free to raise new issues.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/niloysikdar/react-awesome-audio/blob/main/LICENSE) for more information.

## Author

### Niloy Sikdar

- [niloysikdar30@gmail.com](mailto:niloysikdar30@gmail.com)
- [GitHub](https://github.com/niloysikdar)
- [LinkedIn](https://www.linkedin.com/in/niloysikdar)
