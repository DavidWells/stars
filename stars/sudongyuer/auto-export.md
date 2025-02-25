---
repo: sudongyuer/auto-export
url: 'https://github.com/sudongyuer/auto-export'
homepage: ''
starredAt: '2022-07-11T18:44:59Z'
createdAt: '2022-07-08T17:57:05Z'
updatedAt: '2023-07-26T19:50:20Z'
language: TypeScript
license: MIT
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:39.436Z'
description: ✨ A cli can automatically export files of the same type
tags: []
---

# auto-export

A cli can automatically export files

[![NPM version](https://img.shields.io/github/package-json/v/sudongyuer/auto-export)](https://www.npmjs.com/package/auto-export)


<p align='center'>
<img src='https://git.poker/sudongyuer/image-bed/blob/master/20220710/---assets----images----a.159jjelqs5hc.png?raw=true' width='200'/>
</p>

## Why

When you want to export many files of the same type in one folder, you may cost a lot of time to `copy and paste` the same code. eg if you want to export all `images `in one folder, you need to copy and paste the same code for each image, and export these images in a `index.ts` file.Why not have a try to use `auto-export`👻

## 🚀 Features
- Multiple directory generate support
- Nested directory generate support
- Custom output directory support
- Custom import statement support
- Auto Prefix support

## Usage

### Install

```ball
pnpm add -D auto-export
```

### Config `export.config.ts`

- targetDir (require) : the directory to export files

- outputDir (optional,default targetDir) : the directory to generate the `index.ts` file to export files

- customImport (optional) : custom the import statement to use in the `index.ts` file 

- depth (optional , default true) : traverse all subdirectories

- autoPrefix (optional , default false) : auto add prefix to the file name. Note that the if you open the customImport option,this option will be ignored

```js
import { defineExportConfig } from 'auto-export'
export default defineExportConfig({
  configs: [
    {
      targetDir: './src/assets/images',
    },
    {
      targetDir: './src/assets/img',
      depth: true,
      autoPrefix: true
    },
    {
      targetDir: './src/assets/css',
      outputDir: './src/assets/css',
    },
    {
      targetDir: './src/assets/svgs',
      customImport: (fileName, file) => {
        return `import { ReactComponent as ${fileName} } from '${file}'`
      },
    },
    {
      targetDir: './src/assets/gif',
      customImport: (fileName, file, fileType) => {
        return `import ${fileType}${fileName} from '${file}'`
      },
      depth: true
    },
  ],
})

```

### Generate `index.ts`

```bash
pnpm run autoexport
```

## Author

sudongyuer email:976499226@qq.com

## License

[MIT](./LICENSE) License © 2021 [SuDongYu](https://github.com/sudongyuer)
