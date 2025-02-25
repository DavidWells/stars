---
repo: radulucut/cleed
url: 'https://github.com/radulucut/cleed'
homepage: ''
starredAt: '2024-08-17T05:26:50Z'
createdAt: '2024-08-14T04:48:06Z'
updatedAt: '2025-02-21T13:14:41Z'
language: Go
license: MIT
branch: main
stars: 188
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:26.222Z'
description: Feed reader for the command line.
tags:
  - atom
  - cli
  - feed
  - go
  - reader
  - rss
  - terminal
---

# cleed

Simple feed reader for the command line.

![Test](https://github.com/radulucut/cleed/actions/workflows/tests.yml/badge.svg)

![Screenshot](./screenshot.png)

## Installation

#### MacOS - Homebrew

```bash
brew tap radulucut/cleed
brew install cleed
```

#### Windows - Scoop

```bash
scoop bucket add cleed https://github.com/radulucut/scoop-cleed
scoop install cleed
```

#### From source

```bash
go run main.go
```

#### Binary

Download the latest binary from the [releases](https://github.com/radulucut/cleed/releases) page.

## Usage

#### Follow a feed

```bash
# Add a feed to the default list
cleed follow https://example.com/feed.xml

# Add multiple feeds to a list
cleed follow https://example.com/feed.xml https://example2.com/feed --list mylist
```

#### Display feeds

```bash
# Display feeds from all lists
cleed

# Display feeds from a specific list
cleed --list my-list

# Display feeds since a specific date
cleed --since "2024-01-01 12:03:04"

# Display feeds since a specific period
cleed --since "1d"

# Display feeds since the last run
cleed --since last

# Display feeds from a specific list and limit the number of items
cleed --list my-list --limit 10

# Search for items
cleed --search "keyword" --limit 10
```

#### Unfollow a feed

```bash
# Remove a feed from the default list
cleed unfollow https://example.com/feed.xml

# Remove multiple feeds from a list
cleed unfollow https://example.com/feed.xml https://example2.com/feed --list mylist
```

#### List feeds

```bash
# Show all lists
cleed list

# Show all feeds in a list
cleed list mylist

# Rename a list
cleed list mylist --rename newlist

# Merge a list. Move all feeds from anotherlist to mylist and remove anotherlist
cleed list mylist --merge anotherlist

# Remove a list
cleed list mylist --remove

# Import feeds from a file
cleed list mylist --import-from-file feeds.txt

# Import feeds from an OPML file
cleed list mylist --import-from-opml feeds.opml

# Export feeds to a file
cleed list mylist --export-to-file feeds.txt

# Export feeds to an OPML file
cleed list mylist --export-to-opml feeds.opml
```

#### Configuration

```bash
# Display configuration
cleed config

# Disable styling
cleed config --styling=2

# Map color 0 to 230 and color 1 to 213
cleed config --map-colors=0:230,1:213

# Remove color mapping for color 0
cleed config --map-colors=0:

# Clear all color mappings
cleed config --map-colors=

# Display color range. Useful for finding colors to map
cleed config --color-range

# Enable run summary
cleed config --summary=1
```

#### Explore feeds

```bash
# Explore feeds from the default repository (https://github.com/radulucut/cleed-explore)
cleed explore

# Fetch the latest changes and explore feeds from the default repository
cleed explore --update

# Explore feeds from a repository
cleed explore https://github.com/radulucut/cleed-explore.git

# Limit the number of items to display from each list
cleed explore --limit 5

# Search for items (title, description)
cleed explore --search "news"

# Import all feeds into my feeds
cleed explore --import --limit 0

# Remove a repository
cleed explore https://github.com/radulucut/cleed-explore.git --remove
```

> **Note**
>
> The explore command expects git to be installed in order to fetch the repository, and it will only look at `.opml` files when exploring a repository.

#### Help

```bash
cleed --help
```

> **Color mapping**
>
> You can map the colors used in the feed reader to any color you want. This is useful if certain colors are not visible in your terminal based on the color scheme that you are using.
>
> Run `cleed config --color-range` to see the color range and map the colors that you want using the `cleed config --map-colors` command.
