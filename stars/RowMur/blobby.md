---
repo: RowMur/blobby
url: 'https://github.com/RowMur/blobby'
homepage: ''
starredAt: '2024-07-02T00:05:15Z'
createdAt: '2024-06-22T18:12:24Z'
updatedAt: '2024-07-06T13:54:49Z'
language: Go
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:28.836Z'
description: 'A JSON blob analyser, breaking down by field to visualise blob makeup.'
tags: []
---

# blobby

blobby is a JSON blob analyzer. It breaks down JSON by field so that you can visualize the makeup of it.

Inspiration for this tool came from a ticket I worked on recently where we wanted to improve our FCP (first content paint) by reducing the size of the data we were fetching in NextJS' `GetServerSideProps`. I wanted to see which fields were the biggest contributors to a fairly chunky JSON blob and then (assuming it wasn't first paint critical for SEO reasons for example) would be left to fetch on the client later on.

<details>
    <summary>Example Response</summary>

```
# From PokeAPI

blob (23.5KB)
├── sprites (12.0KB)
│   ├── versions (10.3KB)
│   │   ├── generation-ii (2.5KB)
│   │   ├── generation-iv (2.0KB)
│   │   ├── generation-i (1.6KB)
│   │   ├── generation-iii (1.4KB)
│   │   ├── generation-v (1.3KB)
│   │   ├── generation-vi (681.0B)
│   │   ├── generation-vii (523.0B)
│   │   └── generation-viii (161.0B)
│   ├── other (1.2KB)
│   │   ├── showdown (563.0B)
│   │   ├── home (271.0B)
│   │   ├── official-artwork (249.0B)
│   │   └── dream_world (138.0B)
│   ├── back_shiny (93.0B)
│   ├── front_shiny (88.0B)
│   ├── back_default (87.0B)
│   ├── front_default (82.0B)
│   ├── front_female (4.0B)
│   ├── back_female (4.0B)
│   ├── back_shiny_female (4.0B)
│   └── front_shiny_female (4.0B)
├── moves (4.6KB)
│   ├── version_group_details (4.5KB)
│   └── move (64.0B)
├── held_items (3.5KB)
│   ├── version_details (3.4KB)
│   └── item (134.0B)
├── game_indices (1.8KB)
│   ├── version (1.2KB)
│   └── game_index (57.0B)
├── stats (584.0B)
│   ├── stat (367.0B)
│   ├── base_stat (12.0B)
│   └── effort (6.0B)
├── abilities (208.0B)
│   ├── ability (128.0B)
│   ├── is_hidden (9.0B)
│   └── slot (2.0B)
├── cries (187.0B)
│   ├── latest (83.0B)
│   └── legacy (83.0B)
├── types (79.0B)
│   ├── type (59.0B)
│   └── slot (1.0B)
├── species (71.0B)
│   ├── url (48.0B)
│   └── name (7.0B)
├── forms (70.0B)
│   ├── url (45.0B)
│   └── name (7.0B)
├── location_area_encounters (50.0B)
├── name (7.0B)
├── is_default (4.0B)
├── base_experience (3.0B)
├── id (3.0B)
├── order (3.0B)
├── past_abilities (2.0B)
├── weight (2.0B)
├── past_types (2.0B)
└── height (1.0B)
```

</details>

## Usage

### Basic

**Specify a JSON file**

```bash
blobby blob.json
```

**Pipe into it**

```bash
curl -s https://pokeapi.co/api/v2/pokemon/ditto | blobby
```

### Flags

**Depth (`-d`, default: 3)**

Specify how deep to parse into the JSON.

```bash
blobby -d 5 blob.json
```

**Root (`-r`, default: "")**

Specify a path down to the root of the blob that you want to parse. Takes a "." separated list of keys or indexes.

```bash
blobby -r sprites.versions blob.json
```

## Installation

### Go

```bash
go install github.com/RowMur/blobby@master
```

### Homebrew

To get an app in the core Homebrew formulae, you have to pass some set of requirements. So, I've made [my own tap](https://github.com/RowMur/homebrew-tap).

```bash
brew install rowmur/homebrew-tap/blobby

# or

brew tap rowmur/homebrew-tap && brew install blobby

```

### Binaries

On the [releases page](https://github.com/RowMur/blobby/releases), find the release that you want. There will be a list of assets for various OS's, install the appropriate asset for you.

## Development

1. Install [Golang](https://go.dev/doc/install)
2. Install dependencies with `go get .` (at time of writing there are no dependencies outside of the Go standard library so technically not necessary)
3. Build with `go build`
4. Run with either `./blobby` (the generated executable) or `go run main.go`
