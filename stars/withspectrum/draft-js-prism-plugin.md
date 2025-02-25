---
repo: withspectrum/draft-js-prism-plugin
url: 'https://github.com/withspectrum/draft-js-prism-plugin'
homepage: ''
starredAt: '2018-02-15T16:03:28Z'
createdAt: '2017-09-21T13:39:37Z'
updatedAt: '2024-09-24T18:27:14Z'
language: JavaScript
license: MIT
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:28.383Z'
description: Add syntax highlighting support to your DraftJS editor
tags:
  - draft-js
  - draft-js-plugins
  - draftjs
  - draftjs-plugins
  - prism
  - prismjs
  - syntax-highlighting
---

# `draft-js-prism-plugin`

A DraftJS plugin to add syntax highlighting support to your code blocks. Use in combination with [`draft-js-plugins`](https://github.com/draft-js-plugins/draft-js-plugins).

## Usage

First, create the plugin and add it to the `plugins` array of your PluginsEditor:

```JS
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import "prismjs/themes/prism.css"; // add prism.css to add highlights  

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    const prismPlugin = createPrismPlugin({
      // It's required to provide your own instance of Prism
      prism: Prism
    });

    this.state = {
      plugins: [prismPlugin]
    }
  }

  render() {
    return (
      <PluginsEditor
        plugins={this.state.plugins}
      />
    )
  }
}
```

Now add a `language` key to the data of the code block you want to highlight:

```JS
// TODO: Somehow get a code block and its key, this is up to you
const { block, key } = getCurrentBlock();
if (block.getType() !== "code-block") return;

// Replace the code block with a new one with the data.language changed to "javascript"
const data = block.getData().merge({ language: 'javascript' });
const newBlock = block.merge({ data });
const newContentState = currentContent.merge({
  blockMap: blockMap.set(key, newBlock),
  selectionAfter: currentSelection
})

// Now that code block will be highlighted as JavaScript!
this.setState({
  editorState: EditorState.push(editorState, newContentState, "change-block-data")
})
```

## License

This code uses the [`draft-js-prism` decorator](https://github.com/SamyPesse/draft-js-prism) by [@SamyPesse](https://github.com/SamyPesse) and is based on code extracted from the [`draft-js-markdown-shortcuts-plugin`](https://github.com/ngs/draft-js-markdown-shortcuts-plugin) by [@ngs](https://github.com/ngs).

Licensed under the MIT License, Copyright ©️  2017 Space Program Inc. See [LICENSE.md](LICENSE.md) for more information.
