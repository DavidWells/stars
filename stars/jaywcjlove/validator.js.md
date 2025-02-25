---
repo: jaywcjlove/validator.js
url: 'https://github.com/jaywcjlove/validator.js'
homepage: 'https://git.io/validatorjs'
starredAt: '2021-10-30T04:19:49Z'
createdAt: '2016-03-10T15:43:17Z'
updatedAt: '2025-02-21T00:14:17Z'
language: TypeScript
license: NA
branch: master
stars: 554
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:40.998Z'
description: >-
  :interrobang: Lightweight JavaScript form validation, that had minimal
  configuration and felt natural to use. No dependencies, support UMD. 
tags:
  - assert
  - form
  - form-validation
  - javascript
  - sanitize
  - validate
  - validation
  - validator
  - validatorjs
---

validator.js
===

<!--dividing-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build & Deploy](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml)
[![No Dependencies](https://shields.io/badge/no-dependencies-green?style=flat)](https://www.npmjs.com/package/validator.tool)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/validator.tool)](https://bundlephobia.com/package/validator.tool)
[![npm version](https://img.shields.io/npm/v/validator.tool.svg)](https://www.npmjs.com/package/validator.tool)
[![Coverage Status](https://jaywcjlove.github.io/validator.js/coverage/badges.svg)](https://jaywcjlove.github.io/validator.js/coverage/lcov-report)

Lightweight JavaScript form validation, that had minimal configuration and felt natural to use. No dependencies, support UMD.

> ⚠️ The [`v1`](https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html) version document preview is [here](https://raw.githack.com/jaywcjlove/validator.js/v1-doc/index.html).

[Install](#install) · [Usage](#usage) · [React](#used-in-the-react-app) · [Hook](#support-react-hook) · [React Native](#used-in-the-react-native-app) · [Form](#used-in-the-browser-client) · [API](#api) · [npm](http://npm.im/validator.tool) · [License](#license)

## Used in the browser client

Refer to the [`validator.min.js`](https://unpkg.com/validator.tool/) file in the application, manually download and link [validator.min.js](https://github.com/jaywcjlove/validator.js/tree/master/packages/core/dist) in HTML.

```html
<script type="text/javascript" src="dist/validator.min.js"></script>
```

It can also be downloaded via [UNPKG](https://unpkg.com/validator.tool/):

CDN: [UNPKG](https://unpkg.com/validator.tool/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/validator.tool/) | [Githack](https://raw.githack.com/jaywcjlove/validator.js/master/packages/core/dist/validator.min.js) | [Statically](https://cdn.statically.io/gh/jaywcjlove/validator.js/master/packages/core/dist/validator.min.js) | [bundle.run](https://bundle.run/validator.tool)

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/quirky-bohr-m75fx?fontsize=14&theme=dark)

```html
<form id="form">
  <div>
    <label for="email">EMail:</label>
    <input type="email" name="email" placeholder="" />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" name="password" />
  </div>
  <div>
    <label for="repassword">Confirm Password:</label>
    <input type="repassword" name="repassword" />
  </div>
  <div>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </div>
</form>
<script type="text/javascript" src="https://unpkg.com/validator.tool/dist/validator.min.js"></script>
<script type="text/javascript">
var validator = new Validator({
  form: document.getElementById('form'),
  rules: {
    email: {
      validate: (val) => val ? '' : 'Required!',
    },
    password: {
      // validate: (val) => val < 5 || val > 15 ? '字数大于5，小于15' : ''
    },
    repassword: {
      validate: (val) => !val ? 'Required!' : '',
    },
  }
});

validator.form.onsubmit = (evn) => {
  evn.preventDefault();
  const values = validator.getValues();
  console.log(values);
}

validator.form.onreset = (evn) => {
  const data = validator.reset();
  console.log(data);
}
</script>
```

## Install

```bash
$ npm install validator.tool --save
# Or
$ npm install @validator.tool/hook --save
```

## Usage

```jsx
import { useState, useRef } from 'react';
import Validator from 'validator.tool';

function Example() {
  const [data, setData] = useState({
    email: 'kennyiseeyou@gmail.com'
  });
  const validator = useRef(
    new Validator({
      initValues: { ...data },
    })
  );
  return (
    <form>
      <div>
        <label htmlFor="email">EMail:</label>
        <input type="email" name="email" defaultValue={data.email} />
        <span>
          {validator.current.message('email', data.email, {
            validate: (val) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </span>
      </div>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}
```

```jsx
import { useState } from 'react';
import { useValidator } from '@validator.tool/hook';

function Example() {
  const [data, setData] = useState({
    email: 'kennyiseeyou@gmail.com'
  });
  const { validator } = useValidator({
    initValues: { ...data },
  });
  return (
    <form onSubmit={...} onReset={...} onChange={...} onBlur={...}>
      <div>
        <label htmlFor="email">EMail:</label>
        <input type="email" name="email" defaultValue={data.email} />
        <span>
          {validator.message('email', data.email, {
            validate: (val) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </span>
      </div>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}
```

### Used in the React App

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/used-in-the-react-app-andras-dbzbz-forked-7li45?fontsize=14&hidenavigation=1&theme=dark)

```jsx
import { useRef, useState } from 'react';
import { useValidator } from '@validator.tool/hook';

function Demo() {
  const [data, setData] = useState({
    email: 'kennyiseeyou@gmail.com'
  });
  const { validator, handleReset, handleSubmit } = useValidator({
    initValues: data,
    validate: (value, values, field) => {
      if (field === 'password' && !value) {
        return 'Required!';
      }
    }
  });

  const onSubmit = (value: Values) => {
    console.log('value', value)
  }
  const onReset = (value: Values) => {
    setData({ ...value });
  }

  function handleChange(env) {
    const target = env.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset(onReset)}
      onChange={handleChange}
      onBlur={handleChange}
      // onInput={handleChange}
    >
      <div>
        <label htmlFor="email">EMail:</label>
        <input type="email" name="email" defaultValue={data.email} />
        <span>
          {validator.message('email', data.email, {
            validate: (val) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </span>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <span>{validator.message('password', data.password)}</span>
      </div>
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
```

### [Support React Hook](https://github.com/jaywcjlove/validator.js/tree/master/packages/hook/README.md)

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@validator.tool/hook)](https://bundlephobia.com/package/@validator.tool/hook)
[![npm version](https://img.shields.io/npm/v/@validator.tool/hook.svg)](https://www.npmjs.com/package/@validator.tool/hook)
[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/validator-js-support-hook-andras-dbzbz-dbzbz?fontsize=14&hidenavigation=1&theme=dark)

```jsx
import { useValidator } from '@validator.tool/hook';

const { validator, forceUpdate } = useValidator({});
```

### Used in the React Native App

You need to wrap validator with `<Text>` Element.

[![](https://img.shields.io/badge/style-Expo-green?label=Open%20In&logo=expo&style=flat&color=#333)](https://snack.expo.dev/@jaywcjlove/validatorjs-test)

```jsx
import React, { useRef } from 'react';
import { Text, View, Button } from 'react-native';
import { useValidator } from '@validator.tool/hook';

const WelcomeScreen = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const { validator, forceUpdate } = useValidator({
    initValues: { text },
    validate: (value = '', values, field) => {
      if (field === 'username' && value.length > 3) {
        return '!! username > 3';
      }
    },
  });
  return (
    <View>
      <TextInput onChangeText={onChangeText} value={text} />
      <Text>
        {validator.message('username', text)}
      </Text>
      <Button
        onPress={() => {
          validator.showMessages();
          forceUpdate();
        }}
        title="Submit"
        color="#841584"
      />
    </View>
  );
};
```

## API

```ts
export declare type Value = (number | FormDataEntryValue)[] | number | boolean | null | FormDataEntryValue;
export declare type Values = Partial<Record<string, Value>>;
export declare type Fields = Partial<Record<string, boolean>>;
export declare type Rules = Partial<Record<string, RulesOption>>;
export interface RulesOption {
  /** Validate the form's values with function. */
  validate?(value?: Value, values?: Validator['values'], field?: string): string;
}
export declare type ValidatorOption = {
  messagesShown?: boolean;
  rules?: Rules;
  initValues?: Values;
  form?: HTMLFormElement | null;
  validate?: RulesOption['validate'];
};
export default class Validator {
  constructor(options?: ValidatorOption);
  validate?: RulesOption['validate'];
  form?: HTMLFormElement | null;
  fields: Fields;
  rules: Rules;
  values: Values;
  initValues?: Values;
  set resetInitValue(val: Values);
  messagesShown: boolean;
  errorMessages: Partial<Record<string, string>>;
  showMessages: () => boolean;
  hideMessages: () => boolean;
  getForm: () => HTMLFormElement | null | undefined;
  setForm: (form: HTMLFormElement) => void;
  /** How you define validation rules and add messages into the form. */
  message: (field: string, inputValue?: Value | undefined, options?: RulesOption | undefined) => string | undefined;
  setValues: (values?: Values) => void;
  getValues: () => Values;
  reset: () => Values;
  fieldValid: (field: string) => boolean;
  /**
   * Returns a boolean if all the fields pass validation or not.
   * @returns Boolean
   */
  allValid(): boolean;
}
```

## Use with third-party packages

### [validator.js](https://github.com/validatorjs/validator.js)

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/validator)](https://bundlephobia.com/package/validator)

String validation

```jsx
import isEmail from 'validator/es/lib/isEmail';

function Demo() {
  return (
    <p>
      {validator.current.message('email', data.email, {
        validate: (val) => !isEmail(val) ? `The ${val} must be a valid email address.` : ''
      })}
    </p>
  );
}
```

### [Zod](https://github.com/vriad/zod)

TypeScript-first schema validation with static type inference

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/zod)](https://bundlephobia.com/package/zod)

## Development

To develop, Install dependencies, Get the code:

```bash
$ git https://github.com/jaywcjlove/validator.js.git
$ cd validator.js     # Into the directory
$ npm install         # or  yarn install
$ npm install --workspaces  # Install monorepo dependency
```

To develop, run the self-reloading build:

```bash
$ npm run lib:watch   # Monitor the compiled package `validator.tool`
$ npm run hook:watch  # Monitor the compiled package `@validator.tool/hook`
```

Run Document Website Environment.

```bash
$ npm run start
```

To contribute, please fork Hotkeys.js, add your patch and tests for it (in the `<rootDir>/packages/**/__tests__/*.{js,jsx,ts,tsx}` folder) and submit a pull request.

```bash
$ npm run coverage
$ npm run test # Development model
```

## Related

- [chriso/validator.js](https://github.com/chriso/validator.js) String validation
- [rickharrison/validate.js](https://github.com/rickharrison/validate.js) Lightweight JavaScript form validation library inspired by CodeIgniter.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/validator.js/graphs/contributors">
  <img src="https://jaywcjlove.github.io/validator.js/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
