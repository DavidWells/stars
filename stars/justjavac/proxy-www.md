---
repo: justjavac/proxy-www
url: 'https://github.com/justjavac/proxy-www'
homepage: ''
starredAt: '2021-05-01T04:49:09Z'
createdAt: '2021-02-22T15:01:58Z'
updatedAt: '2025-02-11T15:51:17Z'
language: JavaScript
license: Unlicense
branch: main
stars: 879
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:45.244Z'
description: 学会 Proxy 就可以为所欲为吗？对，学会 Proxy 就可以为所欲为！
tags:
  - es6
  - javascript
  - proxy
  - typescript
---

# proxy-www

> 学会 Proxy 就可以为所欲为吗？
> 
> 对，学会 Proxy 就可以为所欲为！

原始来源：https://twitter.com/RReverser/status/1138788910975397888 #14

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        let o = Reflect.get(target, prop);
        if (typeof o === 'function') {
            return o.bind(target)
        }
        if (typeof prop !== 'string') {
            return o;
        }
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        target = new URL(target);
        target.hostname += `.${prop}`;
        return new Proxy(target, { get });
    }
});
```

访问百度

```js
www.baidu.com.then(response => {
    console.log(response.status);
    // ==> 200
})
```

使用 `async`/`await` 语法：

```js
const response = await www.baidu.com

console.log(response.ok)
// ==> true

console.log(response.status);
// ==> 200
```
