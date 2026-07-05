---
repo: hotoo/unistring
url: 'https://github.com/hotoo/unistring'
homepage: null
starredAt: '2021-11-30T02:29:31Z'
createdAt: '2021-09-23T03:05:39Z'
updatedAt: '2024-01-10T07:31:17Z'
language: TypeScript
license: NA
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.537Z'
description: Unicode String for JavaScript
tags: []
---

# UniString

Fast Unicode String.

![benchmark image](https://user-images.githubusercontent.com/143572/135718223-c8f70cd8-7092-4476-8d7e-b8c202f7d930.png)


## USAGE

```js
import unistring from '@hotoo/unistring';

// length:   1  2  2  4  8  11
// unilength:1  1  1  1  1  1
const str = '张 𤰉 😀 👦🏿 👨‍👩‍👧 👨‍👩‍👧‍👦';
const unistr = unistring(str);

str.length; // 33
unistr.length; // 9

str.substr(2, 1); // '�'
unistr.substr(2, 1); // '𤰉'

str.substr(5, 1); // '�'
str.substr(5, 2); // '😀'
unistr.substr(5, 1); // ' '
unistr.substr(5, 2); // ' 👦🏿'

str.split('');
// [ '张', ' ',
//   '�', '�', ' ',
//   '�', '�', ' ',
//   '�', '�', '�', '�', ' ',
//   '�', '�',  '‍',  '�', '�', '‍',  '�', '�', ' ',
//   '�', '�', '‍',  '�', '�', '‍', '�',  '�', '‍',  '�', '�'
// ]

unistr.split('');
// [ '张', ' ',
//   '𤰉', ' ',
//   '😀', ' ',
//   '👦🏿', ' ',
//   '👨‍👩‍👧', ' ',
//   '👨‍👩‍👧‍👦'
// ]
```

## References

- [String.prototype.split() - JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [javascript - How to get character array from a string? - Stack Overflow](https://stackoverflow.com/questions/4547609/how-to-get-character-array-from-a-string/34717402#34717402)
