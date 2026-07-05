---
repo: lifespikes/react-keybinds
url: 'https://github.com/lifespikes/react-keybinds'
homepage: ''
starredAt: '2022-11-26T19:03:46Z'
createdAt: '2022-11-15T02:26:24Z'
updatedAt: '2024-10-29T19:31:43Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:07.838Z'
description: A lightweight library to manage keyboard shortcuts for your React application
tags:
  - keybinds
  - keyboard
  - lifespikes
  - react
  - shortcuts
  - shortcuts-app
---

![image](https://user-images.githubusercontent.com/67383906/202308279-365ced49-ad3a-4f14-a272-fe8c0e080e2c.png)

# react-keybinds

[<img src="https://img.shields.io/npm/v/react-keybinds?style=for-the-badge">](https://www.npmjs.com/package/react-keybinds)
<img src="https://img.shields.io/npm/types/react-keybinds?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
<img src="https://img.shields.io/npm/dt/react-keybinds?style=for-the-badge" >
[<img src="https://img.shields.io/bundlephobia/minzip/react-keybinds?style=for-the-badge">](https://bundlephobia.com/package/react-keybinds)

A lightweight library to manage keyboard shortcuts for your React application

# Install

#### Using npm

```bash
npm i react-keybinds
```

#### Using Yarn

```bash
yarn add react-keybinds
```

#### Using pnpm

```bash
pnpm add react-keybinds
```

# Usage

<sub>You can take a look at the [example](./example) </sub>

### 1. Configuring the KeyBind provider

```tsx
import {KeyBindProvider} from 'react-keybinds';

const App = () => {
    return (
        <KeyBindProvider>
            hello world
        </KeyBindProvider>
    );
};
```

<sub>It is recommended that you place the provider at the beginning of the component tree.
</sub>

<sub>By default, the provider will have a debounce on key presses events of 1000ms, you can change this value by passing the `debounce` prop to the provider</sub>

```tsx
const App = () => {
  return (
          <KeyBindProvider debounce={500}>
            hello world
          </KeyBindProvider>
  );
}
```

### 2. Global shortcuts

You can register commands globally

```tsx
import {KeyBindProvider, ShortcutType} from 'react-keybinds';

const GLOBAL_COMMANDS: ShortcutType[] = [
    {
        keys: {
            Mac: ['Control', 'Shift', 'P'],
            Windows: ['Control', 'Shift', 'P'],
        },
        label: 'Test command',
        callback: () => {
            alert('Hello world');
        },
    },
];

const App = () => {
    return (
        <KeyBindProvider shortcuts={GLOBAL_COMMANDS}>
            hello world
        </KeyBindProvider>
    );
};
```

### 3. Register shortcuts

You can register a command in a specific part of your application. This is useful when we want to execute logic from a
handler that exists in a specific component.

```tsx
import {KeyBindProvider, useKeyBind} from 'react-keybinds';

const RegisterShortcutButton = () => {
    const {registerShortcut} = useKeyBind();

    const handleClickRegister = () => {
        registerShortcut({
            keys: {
                Mac: ['Shift', '*', '_'],
            },
            label: 'This is a keyboard shortcut',
            callback: () => {
                alert('Hello world');
            },
        });
    };

    return (
        <div>
            <button onClick={handleClickRegister}>Register shortcut</button>
        </div>
    );
};

const App = () => {
    return (
        <KeyBindProvider>
            <RegisterShortcutButton/>
        </KeyBindProvider>
    );
};
```

You can also register a shortcut when a component is mounted. Like this:

<sub>When you use the `useRegisterShortcut` hook it is necessary to use the `useMemo` hook</sub>
```tsx
import * as React from 'react';
import {useMemo, useState} from 'react';
import {ShortcutType, useKeyBind, useRegisterShortcut} from 'react-keybinds';
import inspire from '../data/inspire';

const RegisterOnMount = () => {
    const [text, setText] = useState(inspire[0]);

    const {getKeysByPlatform} = useKeyBind();

    const shortcut: ShortcutType = useMemo(
        () => ({
            keys: {
                Windows: ['Control', 'Enter'],
            },
            label: 'Inspired command',
            callback: () => {
                const randomIndex = Math.floor(Math.random() * inspire.length);
                setText(inspire[randomIndex]);
            },
        }),
        []
    );

    useRegisterShortcut(shortcut); // register on mount

    const keysForInspire = getKeysByPlatform(shortcut);

    return (
        <div>
            <h1>Inspire command</h1>
            <p>
                Press: <strong>{keysForInspire?.keys?.join(' + ')}</strong>{' '}
            </p>
            <blockquote>{`"${text}"`}</blockquote>
        </div>
    );
};

export default RegisterOnMount;

```

### 4. List registered shortcuts

You can list the registered shortcuts using the useKeyBind hook

```tsx
import {KeyBindProvider, useKeyBind} from 'react-keybinds';

const ShowShortcuts = () => {
    const {shortcuts} = useKeyBind();
    const shortcutsList = shortcuts?.map((shortcut, index) => {
        return (
            <div key={index}>
                <span>{shortcut.label}</span>
                <ul>
                    {Object.entries(shortcut.keys).map(([key, values], i) => (
                        <li key={`${key}-${i}`}>
                            {key}: <strong>{values.join(' + ')}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        );
    });
    return (
        <div>
            <h1>Registered Shortcuts</h1>
            {shortcutsList}
        </div>
    );
};
const App = () => {
    return (
        <KeyBindProvider>
            <ShowShortcuts/>
        </KeyBindProvider>
    );
};
```

## Notes

- If a user is using a platform for which you did not specify the keys, it will default to the keys of a platform that
  you have configured.
  If you want to see which platform the keys will be taken from, you can use the `getKeysByPlatform` method.

```tsx
const shortcut: ShortcutType = useMemo(
    () => ({
        keys: {
            Windows: ['Control', 'Enter'],
        },
        label: 'Inspired command',
        callback: () => {
        },
    }),
    []
);

const informationForInspire = getKeysByPlatform(shortcut); // {platform: 'Windows', keys: ['Control', 'Enter']}
```

- If you want to have more information about the current platform, you can use the usePlatform hook
```tsx
import { usePlatform } from 'react-keybinds';

const App = () => {
    const platform = usePlatform();
    return (
        <div>
            <h1>Current platform: {platform.currentPlatform()}</h1>
            <h1>Is Windows: {platform.isWindows()}</h1>
        </div>
    );
};
```

- If you want to take a look at a list of all the keys for different platforms, you can use the following [link](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)
