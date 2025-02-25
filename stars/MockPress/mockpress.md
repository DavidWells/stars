---
repo: MockPress/mockpress
url: 'https://github.com/MockPress/mockpress'
homepage: ''
starredAt: '2022-10-31T02:51:43Z'
createdAt: '2022-09-14T10:50:13Z'
updatedAt: '2024-09-01T04:09:10Z'
language: TypeScript
license: NA
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:14.252Z'
description: 'Mock data generator, simple and flexible.'
tags:
  - fake
  - json
  - mock
---

# MockPress

Mock data generator, simple and flexible.

[Test On Browser](https://mockpress.site)

# Features

- easy to use
- generate random(fake) data
- support korean name/address
- support custom data generator
- access to other data in current loop

# Quick Start

## Install

```
npm install mockpress
```

## Example

```javascript
import { mock, generate } from "mockpress";

const personSchema = {
  id: mock.autoIncrement(),
  index: (current, loopIndex) => `${loopIndex + 1} 번째 Object`,
  name: mock.koreanName(),
  introduce: mock.koreanSentence(),
  parents: {
    mother: {
      name: mock.koreanName("female"),
    },
  },
  parentIntroduce: (current, loopIndex) =>
    `저희 어머니 성함은 ${current.parents.mother.name} 입니다!`,
  profileImage: mock.image(200, 200),
  age: mock.integer(10, 20),
  address: mock.koreanAddress(),
  hobby: {
    id: mock.autoIncrement(),
    name: mock.koreanWord(),
    cost: mock.money(1000, 10000, 100),
  },
};

const result = generate(personSchema, 2);
console.dir(result, { depth: null });
```

```javascript
[
  {
    id: 1,
    index: "1 번째 Object",
    name: "손소윤",
    introduce: "국가는 모성의 보호를 위하여 노력하여야 한다.",
    parents: { mother: { name: "허린아" } },
    parentIntroduce: "저희 어머니 성함은 허린아 입니다!",
    profileImage: "https://picsum.photos/200/200?random=0",
    age: 10,
    address: "나래도 미르시 파라대로 269",
    hobby: { id: 1, name: "권한", cost: 9600 },
  },
  {
    id: 2,
    index: "2 번째 Object",
    name: "임지석",
    introduce:
      "민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
    parents: { mother: { name: "허하빈" } },
    parentIntroduce: "저희 어머니 성함은 허하빈 입니다!",
    profileImage: "https://picsum.photos/200/200?random=1",
    age: 15,
    address: "아리시 동구 나차로 744",
    hobby: { id: 2, name: "대법원", cost: 1000 },
  },
];
```

# Maintainers

- [@airman5573](https://github.com/airman5573)
- [@uk960214](https://github.com/uk960214)
