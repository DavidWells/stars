---
repo: pacocoursey/writer
url: 'https://github.com/pacocoursey/writer'
homepage: 'https://writer.paco.sh'
starredAt: '2021-09-23T01:43:51Z'
createdAt: '2021-09-22T16:38:03Z'
updatedAt: '2025-02-23T21:13:18Z'
language: JavaScript
license: NA
branch: main
stars: 513
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:45.139Z'
description: plain text editor
tags: []
---

# writer

Plain text editor from scratch, made for the web. Drag and drop files to open them.

### Architecture

- Buffer is an array of array of lines
- Text is manually measured and wrapped with canvas
- Lines are virtualized on scroll and drawn as divs
- Cursor and selection are also divs
- Word boundary operations are emulated with textarea
- Styling through CSS variables

### Future

- B-tree buffer with height map
- History system
- Operational transform
- Alternate canvas renderer with FreeType and Harfbuzz
