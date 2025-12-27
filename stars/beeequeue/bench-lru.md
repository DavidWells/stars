---
repo: beeequeue/bench-lru
url: 'https://github.com/beeequeue/bench-lru'
homepage: null
starredAt: '2025-12-26T14:40:56Z'
createdAt: '2025-08-11T17:06:05Z'
updatedAt: '2025-12-26T14:40:56Z'
language: TypeScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-12-27T22:31:48.324Z'
description: null
tags: []
---

# bench-lru

A set of simple benchmarks for various LRU packages.

---

<!-- BENCHMARKS START -->

node 24.12.0 (x64-win32)

5.01GHz AMD Ryzen 7 9800X3D 8-Core Processor

---

```mermaid
xychart-beta
  title "downloads in last month"
  x-axis ["flru", "hashlru", "lru.min", "lru_map", "picolru", "quick-lru", "tiny-lru", "ylru"]
  y-axis "downloads" 0 --> 126098786
  bar [446231, 796883, 22178365, 9222208, 11, 126098786, 5173069, 13570791]
```

Hidden outliers:

- `lru-cache`: `1,154,015,643`
<details>

<summary>Complete graph with outliers</summary>

```mermaid
xychart-beta
  title "downloads in last month"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "tiny-lru", "ylru"]
  y-axis "downloads"
  bar [446.231, 796.883, 1154015.643, 22178.365, 9222.208, 0.011, 126098.786, 5173.069, 13570.791]
```

</details>

---

```mermaid
xychart-beta
  title "minified bundle size"
  x-axis ["flru", "hashlru", "lru.min", "lru_map", "picolru", "quick-lru", "tiny-lru", "ylru"]
  y-axis "bytes" 0 --> 7128
  bar [1890, 2286, 4256, 7128, 4252, 6552, 4784, 1972]
```

Hidden outliers:

- `lru-cache`: `34,276`
<details>

<summary>Complete graph with outliers</summary>

```mermaid
xychart-beta
  title "minified bundle size"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "tiny-lru", "ylru"]
  y-axis "bytes"
  bar [1.89, 2.286, 34.276, 4.256, 7.128, 4.252, 6.552, 4.784, 1.972]
```

</details>

---

```mermaid
xychart-beta
  title "INIT"
  x-axis ["flru", "hashlru", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest" 1 --> 2.8141
  bar [2.8141, 2.2554, 1.0978, 1.0757, 2.3777, 1, 1.0035, 1.7131]
```

Hidden outliers:

- `lru-cache`: `2,798.81`
- `lru.min`: `4,363`
<details>

<summary>Complete graph with outliers</summary>

```mermaid
xychart-beta
  title "INIT"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest"
  bar [0.0028, 0.0023, 2.7988, 4.363, 0.0011, 0.0011, 0.0024, 0.001, 0.001, 0.0017]
```

</details>

---

```mermaid
xychart-beta
  title "SET STRING (10 000)"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest" 1 --> 2.26
  bar [1, 1.1281, 2.1713, 2.191, 2.2185, 2.26, 2.1613, 2.1328, 1.7033, 2.1319]
```

---

```mermaid
xychart-beta
  title "SET LONG STRING (10 000)"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest" 1 --> 1.4597
  bar [1, 1.0594, 1.366, 1.3807, 1.4597, 1.3781, 1.3966, 1.3054, 1.4286, 1.371]
```

---

```mermaid
xychart-beta
  title "GET STRING (10 000)"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest" 1 --> 3.5221
  bar [1, 1.1437, 2.0363, 1.9562, 1.993, 2.158, 1.9281, 3.5221, 1.6742, 1.9473]
```

---

```mermaid
xychart-beta
  title "GET LONG STRING (10 000)"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest" 1 --> 3.8069
  bar [1, 1.1889, 2.1978, 2.1779, 2.2066, 2.6864, 2.1279, 3.8069, 1.9394, 1.7968]
```

---

```mermaid
xychart-beta
  title "SET WITH EVICTION (10 000)"
  x-axis ["flru", "hashlru", "lru-cache", "lru.min", "lru_map", "picolru", "quick-lru", "semver", "tiny-lru", "ylru"]
  y-axis "speed relative to fastest" 1 --> 1.5163
  bar [1, 1.03, 1.5163, 1.4173, 1.3519, 1.3659, 1.3578, 1.2798, 1.2119, 1.3379]
```

<!-- BENCHMARKS END -->
