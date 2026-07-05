---
repo: afeiship/react-inline-edit
url: 'https://github.com/afeiship/react-inline-edit'
homepage: ''
starredAt: '2021-12-21T00:15:47Z'
createdAt: '2017-07-24T02:01:01Z'
updatedAt: '2021-12-21T00:15:47Z'
language: TypeScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:26.073Z'
description: Inline editing for react.
tags:
  - edit
  - editing
  - inline
  - react
---

# react-inline-edit
> Inline editing for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-inline-edit
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-inline-edit/dist/style.css";

  // or use sass
  @import "~@jswork/react-inline-edit/dist/style.scss";

  // customize your styles:
  $react-inline-edit-options: ()
  ```
2. import js
  ```js
  import React, { useState, useEffect } from 'react';
  import ReactInlineEdit from '@jswork/react-inline-edit';
  import styled from 'styled-components';
  import '../../src/components/style.scss';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default () => {
    const [value, setValue] = useState('Hello inline edit');

    useEffect(() => {
      console.log('value changed:', value);
    }, [value]);

    return (
      <Container>
        <ReactInlineEdit value={value} inputClassName='test-cls'
                         onChange={(e) => setValue(e.target.value)} />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/react-inline-edit/

## license
Code released under [the MIT license](https://github.com/afeiship/react-inline-edit/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-inline-edit
[version-url]: https://npmjs.org/package/@jswork/react-inline-edit

[license-image]: https://img.shields.io/npm/l/@jswork/react-inline-edit
[license-url]: https://github.com/afeiship/react-inline-edit/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-inline-edit
[size-url]: https://github.com/afeiship/react-inline-edit/blob/master/dist/react-inline-edit.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-inline-edit
[download-url]: https://www.npmjs.com/package/@jswork/react-inline-edit
