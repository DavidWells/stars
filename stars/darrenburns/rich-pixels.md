---
repo: darrenburns/rich-pixels
url: 'https://github.com/darrenburns/rich-pixels'
homepage: ''
starredAt: '2025-06-27T21:25:25Z'
createdAt: '2022-11-07T23:53:36Z'
updatedAt: '2025-06-28T06:13:16Z'
language: Python
license: MIT
branch: master
stars: 314
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-28T22:31:12.895Z'
description: >-
  A Rich-compatible library for writing pixel images and ASCII art to the
  terminal.
tags:
  - ascii
  - ascii-art
  - console
  - rich
  - terminal
  - textual
---

# Rich Pixels

A Rich-compatible library for writing pixel images and other colourful grids to the
terminal.

<p align="center">
<img width="700" src="https://user-images.githubusercontent.com/5740731/200676207-8e9c9465-628b-40de-ba0b-410612f2bd7c.svg" />
</p>

## Installation

Get `rich-pixels` from PyPI.

```
pip install rich-pixels
```

## Basic Usage

### Images

#### Image from a file

You can load an image file from a path using `from_image_path`:

```python
from rich_pixels import Pixels
from rich.console import Console

console = Console()
pixels = Pixels.from_image_path("pokemon/bulbasaur.png")
console.print(pixels)
```

#### Pillow image object

You can create a PIL image object yourself and pass it in to `from_image`.

```python
from rich_pixels import Pixels
from rich.console import Console
from PIL import Image

console = Console()

with Image.open("path/to/image.png") as image:
    pixels = Pixels.from_image(image)

console.print(pixels)
```

Using this approach means you can modify your PIL `Image` beforehard.

#### ASCII Art

You can quickly build shapes using a tool like [asciiflow](https://asciiflow.com), and
apply styles the ASCII characters. This provides a quick way of sketching out shapes.

```python
from rich_pixels import Pixels
from rich.console import Console
from rich.segment import Segment
from rich.style import Style

console = Console()

# Draw your shapes using any character you want
grid = """\
     xx   xx
     ox   ox
     Ox   Ox
xx             xx
xxxxxxxxxxxxxxxxx
"""

# Map characters to different characters/styles
mapping = {
    "x": Segment(" ", Style.parse("yellow on yellow")),
    "o": Segment(" ", Style.parse("on white")),
    "O": Segment(" ", Style.parse("on blue")),
}

pixels = Pixels.from_ascii(grid, mapping)
console.print(pixels)
```

### Using with Textual

`Pixels` can be integrated into [Textual](https://github.com/Textualize/textual)
applications just like any other Rich renderable.
