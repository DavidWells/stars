---
repo: yash-deore/react-ipfs-uploader
url: 'https://github.com/yash-deore/react-ipfs-uploader'
homepage: 'https://www.npmjs.com/package/react-ipfs-uploader'
starredAt: '2022-01-28T02:15:29Z'
createdAt: '2021-11-21T13:12:09Z'
updatedAt: '2023-11-20T20:51:35Z'
language: JavaScript
license: NA
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:17.438Z'
description: 'React Components that enable you to upload file , files or folder to IPFS .'
tags:
  - create-react-library
  - ipfs-http-client
  - it-all
  - react-bootstrap
  - reactjs
---

# react-ipfs-uploader

## React Components that enable you to upload a file(Images,PDFs,Text,etc.) , multiple files or a folder to IPFS .

[![NPM](https://img.shields.io/npm/v/react-ipfs-uploader.svg)](https://www.npmjs.com/package/react-ipfs-uploader)
![downloads](https://img.shields.io/npm/dt/react-ipfs-uploader.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Note

> This package uses Infura's public gateway to upload files to IPFS. Infura's public gateway is not available anymore since it has become a paid service and will require a projectId and API key to upload files. Due to this the compoenents are unable to upload files to IPFS. <br/>
>
> -- Yash Deore (creator of react-ipfs-uploader)

## Install

### npm :

```bash
npm install react-ipfs-uploader
```

### yarn :

```bash
yarn add react-ipfs-uploader
```

## Features

## Single File Upload Components :

1 . FileUpload : Uploads the selcted File and returns the URL after uploading the file . <br />
2 . ImageUpload : Shows the user a preview of the selected Image and returns the URL after uploading . <br />
3 . PdfUpload : Shows the user a preview of the selected PDF and returns the URL after uploading . <br />
4 . TextUpload : Returns the URL of the Text after uploading . <br />

## Multiple Files Upload Components :

1 . MultipleFilesUpload : Uploads the selcted Files and returns the URL after uploading the files . <br />
2 . FolderUpload : Uploads the selected Folder and returns the URL after uploading the folder . <br />

## Usage

1 . Declare an `useState` hook that can hold a string as its current state . <br/>
2 . Pass the `setFunction` to the component you are using ie. `setUrl={setFunction}` <br/>
3 . As you upload the file , files or folder the url will be returned .

> ### FileUpload : Uploads the selcted File and returns the URL after uploading the file .

> Example : https://codesandbox.io/s/fileupload-81g84

```jsx
// FileUpload Component : Uploads the selcted File and returns the URL after uploading the file .
import React, { useState } from 'react'
import { FileUpload } from 'react-ipfs-uploader'

const YourComponent = () => {
    const [fileUrl, setFileUrl] = useState('')

    return (
        <div>
            <FileUpload setUrl={setFileUrl} />
            FileUrl : <a
                href={fileUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {fileUrl}
            </a>
        </div>
    )
}

export default YourComponent
```

> ### MultipleFilesUpload : Uploads Multiple Files and returns the URL after uploading the files .

> Example : https://codesandbox.io/s/multiplefilesupload-uf6yw

```jsx
// MultipleFilesUpload Component : Uploads Multiple files to IPFS and returns the URL
import React, { useState } from 'react'
import { MultipleFilesUpload } from 'react-ipfs-uploader'

const YourComponent = () => {
    const [multipleFilesUrl, setMultipleFilesUrl] = useState('')

    return (
        <div>
            <MultipleFilesUpload setUrl={setMultipleFilesUrl} />
            MultipleFilesUrl : <a
                href={multipleFilesUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {multipleFilesUrl}
            </a>
        </div>
    )
}

export default YourComponent
```

> ### FolderUpload : Uploads Folder and returns the URL after uploading the folder .

> Example : https://codesandbox.io/s/folderupload-y6j2b

```jsx
// FolderUpload Component : Uploads a Folder to IPFS and returns the URL
import React, { useState } from 'react'
import { FolderUpload } from 'react-ipfs-uploader'

const YourComponent = () => {
    const [folderUrl, setFolderUrl] = useState('')

    return (
        <div>
            <FolderUpload setUrl={setFolderUrl} />
            FolderUrl : <a
                href={folderUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {folderUrl}
            </a>
        </div>
    )
}

export default YourComponent
```

> ### ImageUpload : Shows the user a preview of the selected Image and returns the URL after uploading .

> Example : https://codesandbox.io/s/imageupload-65kpl

```jsx
// ImageUpload : Shows the user a preview of the selected Image and returns the URL after uploading .
import React, { useState } from 'react'
import { ImageUpload } from 'react-ipfs-uploader'

const YourComponent = () => {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <div>
            <ImageUpload setUrl={setImageUrl} />
            ImageUrl : <a
                href={imageUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {imageUrl}
            </a>
        </div>
    )
}

export default YourComponent
```

> ### PdfUpload : Shows the user a preview of the selected PDF and returns the URL after uploading .

> Example : https://codesandbox.io/s/pdfupload-ce4ch

```jsx
// PdfUpload : Shows the user a preview of the selected PDF and returns the URL after uploading .
import React, { useState } from 'react'
import { PdfUpload } from 'react-ipfs-uploader'

const YourComponent = () => {
    const [pdfUrl, setPdfUrl] = useState('')

    return (
        <div>
            <PdfUpload setUrl={setPdfUrl} />
            Pdfurl : <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
                {pdfUrl}
            </a>
        </div>
    )
}

export default YourComponent
```

> ### TextUpload : Returns the URL of the Text after uploading

> Example : https://codesandbox.io/s/textupload-vpcst

```jsx
// TextUpload : Returns the URL of the Text after uploading
import React, { useState } from 'react'
import { Textupload } from 'react-ipfs-uploader'

const YourComponent = () => {
    const [textUrl, setTextUrl] = useState('')

    return (
        <div>
            <TextUpload setUrl={setTextUrl} />
            TextUrl : <a
                href={textUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {textUrl}
            </a>
        </div>
    )
}

export default YourComponent
```

## Links

Developer Chat : https://discord.gg/bgY4TZecVu <br/>
CodeSandBox : https://codesandbox.io/u/yash-deore <br/>
NPM Package : https://www.npmjs.com/package/react-ipfs-uploader <br/>
GitHub Repository : https://github.com/yash-deore/react-ipfs-uploader <br/>

## License

MIT © [yash-deore](https://github.com/yash-deore)

> ### Made with react , create-react-library , react-bootstrap , ipfs-http-client , it-all
