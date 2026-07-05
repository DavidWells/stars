---
repo: miguelmota/merkletree-viz
url: 'https://github.com/miguelmota/merkletree-viz'
homepage: 'https://github.com/miguelmota/merkletree-viz'
starredAt: '2022-11-19T01:05:35Z'
createdAt: '2022-11-13T08:59:30Z'
updatedAt: '2025-01-30T12:09:17Z'
language: JavaScript
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:08.876Z'
description: 'Merke tree visualization library for browser, works with merkletreejs'
tags:
  - chart
  - leaves
  - merkle-tree
  - merkletree
  - merkletreejs
  - nodes
  - raphael
  - raphaeljs
  - root
  - treant
  - treantjs
  - visual
  - visualization
  - viz
---

# merkletree-viz

> Merke tree visualization library for browser, works with [`merkletreejs`](https://github.com/miguelmota/merkletreejs).

## Example

[https://lab.miguelmota.com/merkletree-viz](https://lab.miguelmota.com/merkletree-viz)

### CDN

Available on [jsDelivr](https://www.jsdelivr.com/) CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/merkletree-viz@latest/merkletreeviz.js"></script>
```

## Usage

Import js libs for hash function, merkletreejs, and merkletree-viz

```html
<script src="https://cdn.jsdelivr.net/npm/keccak256@latest/keccak256.js"></script>
<script src="https://cdn.jsdelivr.net/npm/merkletreejs@latest/merkletree.js"></script>
<script src="https://cdn.jsdelivr.net/npm/merkletree-viz@latest/merkletreeviz.js"></script>
```

Generate merkle tree and render visualization

```js
const leaves = ['a', 'b', 'c', 'd'].map(keccak256)
const tree = new MerkleTree(leaves, keccak256)
const viz = new MerkleTreeViz('#viz')
viz.renderTree(tree)
// viz.destroy()
```

<img src="https://user-images.githubusercontent.com/168240/201514143-52cc3627-d606-445d-94f3-e8d515f57b9e.png" width="500px" alt="viz" />

## License

[MIT](LICENSE)
