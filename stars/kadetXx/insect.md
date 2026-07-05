---
repo: kadetXx/insect
url: 'https://github.com/kadetXx/insect'
homepage: 'https://www.npmjs.com/package/react-insect'
starredAt: '2022-01-18T04:23:30Z'
createdAt: '2022-01-15T21:40:25Z'
updatedAt: '2024-11-18T11:38:46Z'
language: TypeScript
license: MIT
branch: main
stars: 35
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:20.608Z'
description: "\U0001F6E0 Highly customisable, minimalistic input x select field for React."
tags:
  - dropdown
  - forms
  - input
  - react-component
  - react-select
  - react-select-multi
  - react-select-search
  - select
---

# Insect

<div align="center">
  <br />
  <br />
  <img src="https://res.cloudinary.com/kadet/image/upload/v1642358094/insect/logo_dbzodw.svg" width="200" height="auto" alt="insect logo" align="center" />
  <br />
  <br />
  <h3 align="center">🛠 Highly customisable, minimalistic input x select field for React.</h3>

  <p align="center">
  <a href="https://npm.im/react-insect"><img src="https://img.shields.io/npm/v/react-insect.svg?color=brightgreen&style=flat-square" alt="Package version."></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="Make a pull request."></a>
  </p>
</div>

<br />

## ⚡️ Features

- Tiny size (~4kb Gzip)
- 100% responsive.
- Highly customisable.
- Supports custom rem unit.
- Zero third party dependency (asides react's recommended prop-types).
- Typescript ready
- Multi select options
- Options search
- Custom icons support

<br />
<br />

## 💾 Installation

```
$ yarn add react-insect
```

<br />
<br />

## 📄 Basic Usage

```jsx
// Import Insect component
import { Insect } from 'react-insect';

// Use it in your code like so
export const MyComponent = () => {
  return (
    <>
      <Insect
        name="username"
        type="text"
        placeholder="Choose a username"
      />
    </>
  );
};
```

<br />
<br />

## 🪄 Props

Insect can be either an input field, a single select field or a multi select field. The props passed in determines what Insect is. Here's a table of all available props for input and for select.

<br />
<br />

### 🧩 General props
| Prop | Description | Type | default
| --- | --- | --- | --- |
| name | Sets the name of the input field. | *`string`* | 
| type | Sets type of input field | *`text \| textarea \| number \| password \| email \| select`* | text
| label | Adds a label to the top of insect component. | *`string`* | 
| placeholder | Sets the placeholder for insect component. | *`string`* | Input or select an option
| prefixIcon | Adds an icon at the left of insect field | *`string \| React.ReactNode \| null`* | 
| suffixIcon | Adds an icon at the right of insect field | *`string \| React.ReactNode \| null`* | 
| className | Custom classname for main insect container | *`string`* | 
| labelClass | Custom classname for insect label | *`string`* | 
| inputWrapperClass | Custom classname for the input field wrapper div | *`string`* | 
| inputClass | Custom classname for the main input field  | *`string`* |  
| iconsClass | Custom classname for all icons  | *`string`* |  
| onFocus | Function to trigger when input field is focused on. | *`(e: React.FocusEvent<HTMLInputElement>) => void`* | 
| onBlur | Function to trigger when input field goes out of focus. | *`(e: React.FocusEvent<HTMLInputElement>) => void`* | 

<br />
<br />

### 🏁 For Input field type

| Prop | Description | Type | default
| --- | --- | --- | --- |
| value | Sets the value of the input field. | *`string`* | 
| rows | Sets the number of rows for textarea | *`number`* | 
| onChange | Function to trigger when input field value is changed. | *`(e: React.FormEvent<HTMLInputElement>) => void`* | 

<br />
<br />

### 🔮 For Select field type

| Prop | Description | Type | default
| --- | --- | --- | --- |
| allowMultiple | Enables multi select by setting the number of selectable items | *`number`* | 
| search | Toggles option search | *`boolean`* |  (false)
| options | A list of options for the select field | *`{ title: string; value: string; }[]`* | [  ]
| onSelect | Funtion to trigger when an item is selected. It returns the field name and then returns a single string for single select and an array of strings for multi select | *`(value: string \| string[] \| null, name: string) => void`* | 
| dropdownIcon | Custom icon for dropdown caret | *`string \| React.ReactNode \| null`* | 
| checkmarkIcon | Custom selected item indicator icon | *`string \| React.ReactNode \| null`* | 
| dropdownClass | Custom classname for the dropdown container div. This div wraps the *ul* tag which in turn wraps the individual *li* tags | *`string`* |  
| checkerClass | Custom classname for the selected items indicator icon | *`string`* |  
| closeOnBlur | Determines if the dropdown should close when outside is clicked or not | *`boolean`* | true

<br />
<br />

## 🦄 Usage with custom PX - REM unit

Sometimes, you may want to set the default rem unit to 10rem/1px (or any value at all) by adding `font-size: 10px` (or some kind of viewport based value) to the html tag in order to simplify rem/px unit conversion. This will cause a lot of problems with third party components but don't worry, insect got you!

Just add the following css variable to your main stylesheet and insect will adapt to your new unit.

```css
:root {
  --insect-rem: 10 !important;
}
```

<br />
<br />

## 👷🏽 Contribution Guide

Insect is an opensource project and public contribution is very welcome. You can check [Issues](https://github.com/kadetXx/insect/issues) for bugs to fix or features to add.

1. Fork this repository.
2. Clone the forked repository to your local machine.
3. Create a new branch with a name like this - feature/name-of-feature.
4. Run `yarn` to install dependencies.
5. Write code and then commit changes.
6. Run `yarn build` to compile a build into the dist folder.
7. Now You can decide to manually copy the index.tsx and index.scss file from here into a local project in order to test the feature/bug you have fixed.
8. Alternatively, run `yarn link` in your local insect root folder.
9. On the local project you want to test the features on, run `yarn link 'insect'`.
10. Now navigate back to the terminal on your local insect folder and then run `npm link ../path-to-test-project/node_modules/react`. This will make insect use the copy of react from your local test project. Now you can test your changes.
11. After all is done, push to your forked repository and then send a pull request.

<br />
<br />

## ⚖️ Licence

MIT (c) [Collins Enebeli](https://kadet.dev).

  
  
  
