---
repo: orta/md-type-tables
url: 'https://github.com/orta/md-type-tables'
homepage: ''
starredAt: '2021-03-26T23:10:56Z'
createdAt: '2021-03-25T21:02:43Z'
updatedAt: '2021-11-25T10:37:35Z'
language: JavaScript
license: NA
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:56.083Z'
description: null
tags: []
---

We take this type:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./types.ts) -->
<!-- The below code snippet is automatically added from ./types.ts -->

```ts
type SomeType = {
  /**
   * Client ID of your GitHub/OAuth App. Find it on your app's settings page.
   *  @required
   */
  clientId: string;
  /**
   * Client Secret for your GitHub/OAuth App. Create one on your app's settings page.
   *  @required
   */
  clientSecret: string;
  /**
   * Either "oauth-app" or "github-app". Defaults to "oauth-app".
   */
  clientType: string;
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

And use it to generate this table:

<!-- AUTO-GENERATED-CONTENT:START (TYPES:src=./types.ts&symbol=SomeType) -->
<table width="100%">
<thead align=left>
  <tr>
    <th width=150>
      name
    </th>
    <th width=70>
      type
    </th>
    <th>
      description
    </th>
  </tr>
</thead>
<tbody align=left valign=top>

<tr>
  <th>
    <code>clientId</code>
  </th>
  <th>
    <code>string</code>
  </th>
  <td>

**Required**
Client ID of your GitHub/OAuth App. Find it on your app's settings page.

  </td>
</tr>

<tr>
  <th>
    <code>clientSecret</code>
  </th>
  <th>
    <code>string</code>
  </th>
  <td>

**Required**
Client Secret for your GitHub/OAuth App. Create one on your app's settings page.

  </td>
</tr>

<tr>
  <th>
    <code>clientType</code>
  </th>
  <th>
    <code>string</code>
  </th>
  <td>

Either "oauth-app" or "github-app". Defaults to "oauth-app".

  </td>
</tr>

   </tbody>
 </table>

<!-- AUTO-GENERATED-CONTENT:END -->

Using this code:

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./index.js) -->
<!-- The below code snippet is automatically added from ./index.js -->

```js
const ts = require("typescript");

module.exports = {
  transforms: {
    /* Match <!-- AUTO-GENERATED-CONTENT:START (TYPES:src=filepath&symbol=Type) --> */
    TYPES(_content, options) {
      const mds = [];
      let program = ts.createProgram([options.src], {});
      const sourceFile = program.getSourceFile(options.src);

      /** @type {import("typescript").TypeAliasDeclaration} */
      let typeNode = undefined;
      const findSymbol = (node) => {
        if (
          node &&
          node.name &&
          node.name.escapedText &&
          node.name.escapedText === options.symbol
        ) {
          typeNode = node;
        }
        if (!typeNode) ts.forEachChild(node, findSymbol);
      };

      findSymbol(sourceFile);
      if (!typeNode)
        throw new Error(`Could not find ${options.symbol} in ${options.src}`);

      mds.push(prefix);
      typeNode.type.members.forEach((member) => {
        const name = member.name.escapedText;
        const type = sourceFile.text.slice(
          member.type.pos + 1,
          member.type.end
        );

        const required =
          member.jsDoc &&
          !!member.jsDoc.find(
            (d) => d.tags && d.tags.find((t) => t.tagName.escapedText)
          );
        const info =
          member.jsDoc && member.jsDoc.map((jd) => jd.comment).join("\n\n");

        mds.push(`<tr>
  <th>
    <code>${name}</code>
  </th>
  <th>
    <code>${type}</code>
  </th>
  <td>

${required ? "**Required**" : ""}
${info}

  </td>
</tr>`);
      });

      mds.push(suffix);
      return mds.join("\n\n");
    },
  },
};

const prefix = `<table width="100%">
<thead align=left>
  <tr>
    <th width=150>
      name
    </th>
    <th width=70>
      type
    </th>
    <th>
      description
    </th>
  </tr>
</thead>
<tbody align=left valign=top>`;

const suffix = `
   </tbody>
 </table>
`;
```

<!-- AUTO-GENERATED-CONTENT:END -->

You can run it locally:

```sh
git clone https://github.com/orta/md-type-tables
cd md-type-tables
yarn
yarn readme
```
