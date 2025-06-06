---
repo: lusingander/stu
url: 'https://github.com/lusingander/stu'
homepage: 'https://lusingander.github.io/stu/'
starredAt: '2024-03-26T19:15:44Z'
createdAt: '2021-12-30T11:52:19Z'
updatedAt: '2025-02-23T12:27:14Z'
language: Rust
license: MIT
branch: master
stars: 275
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:33.295Z'
description: "TUI explorer application for Amazon S3 (AWS S3) \U0001FAA3"
tags:
  - amazon-s3
  - aws
  - aws-s3
  - ratatui
  - s3
  - s3-browser
  - s3-client
  - s3-explorer
  - terminal
  - tui
---

# STU

[![Crate Status](https://img.shields.io/crates/v/stu.svg)](https://crates.io/crates/stu)

S3 Terminal UI

## About

STU is the TUI explorer application for Amazon S3 (AWS S3) written in Rust using [ratatui](https://github.com/ratatui/ratatui).

<img src="./img/demo.gif">

## Installation

### [Cargo](https://crates.io/crates/stu)

```
$ cargo install --locked stu
```

### [Homebrew (macOS)](https://github.com/lusingander/homebrew-tap/blob/master/stu.rb)

```
$ brew install lusingander/tap/stu
```

### [AUR (Arch Linux)](https://aur.archlinux.org/packages/stu)

```
$ paru -S stu
```

### Binary

You can download binaries from [releases](https://github.com/lusingander/stu/releases).

## Usage

After installation, run the following command:

```
$ stu
```

Basically, you can use it in [the same way as the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

In other words, if the default profile settings exist or [the environment variables are set](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html), you do not need to specify any options.

### Options

```
STU - S3 Terminal UI

Usage: stu [OPTIONS]

Options:
  -r, --region <REGION>     AWS region
  -e, --endpoint-url <URL>  AWS endpoint url
  -p, --profile <NAME>      AWS profile name
  -b, --bucket <NAME>       Target bucket name
      --path-style <TYPE>   Path style type for object paths [default: auto] [possible values: auto, always, never]
      --debug               Enable debug logs
  -h, --help                Print help
  -V, --version             Print version
```

Here are some examples of how to run with options:

```sh
# Connect by specifying the profile
$ stu --profile foo-profile

# Show only the specified bucket objects
$ stu --bucket bar-bucket

# Connect to localstack, minio, etc.
$ stu --endpoint-url http://localhost:12345

# Connect by specifying environment variables
$ AWS_ACCESS_KEY_ID=abc AWS_SECRET_ACCESS_KEY=xyz stu
```

#### --path-style \<TYPE\>

Select the address model for S3 objects.

- `never` uses Virtual-Hosted Style, which is what AWS currently uses.
  - `https://bucket.s3.region.amazonaws.com/key`
- `always` uses Path Style, which is used when using localstack, minio, etc.
  - `https://s3.region.amazonaws.com/bucket/key`
- `auto` automatically determines which model to use, which is the default setting.

For other S3-compatible services, which one to use depends on the service.

### Keybindings

The basic key bindings are as follows:

| Key                  | Description                        |
| -------------------- | ---------------------------------- |
| <kbd>Ctrl-C</kbd>    | Quit app                           |
| <kbd>Esc</kbd>       | Quit app / Close dialog            |
| <kbd>Enter</kbd>     | Confirm / Open selected item       |
| <kbd>Backspace</kbd> | Go back to previous / Close dialog |
| <kbd>j/k</kbd>       | Select item / Scroll               |
| <kbd>?</kbd>         | Show help                          |

Detailed operations on each view can be displayed by pressing `?` key.

### Config

Config is loaded from `$STU_ROOT_DIR/config.toml`.

- If `STU_ROOT_DIR` environment variable is not set, `~/.stu` is used by default.
  - If the `STU_ROOT_DIR` directory does not exist, it will be created automatically.
- If the config file does not exist, the default values will be used for all items.
- If the config file exists but some items are not set, the default values will be used for those unset items.

#### Config file format

The values set in this example are the default values.

```toml
# The directory to save the downloaded objects.
# type: string
download_dir = "$STU_ROOT_DIR/download"
# The default region to use if the region cannot be obtained from the command line options or AWS settings.
# type: string
default_region = "us-east-1"

[ui.object_list]
# The date format of a last modified in the object list.
# The format must be specified in strftime format.
# https://docs.rs/chrono/latest/chrono/format/strftime/index.html
# type: string
date_format = "%Y-%m-%d %H:%M:%S"
# The width of a last modified in the object list.
# It is recommended to set this when setting date_format.
# type: u16
date_width = 19

[ui.object_detail]
# The date format of a last modified in the object detail.
# The format must be specified in strftime format.
# https://docs.rs/chrono/latest/chrono/format/strftime/index.html
# type: string
date_format = "%Y-%m-%d %H:%M:%S"

[preview]
# Whether syntax highlighting is enabled in the object preview.
# type: bool
highlight = false
# The name of the color theme to use for syntax highlighting in the object preview.
# type: string
highlight_theme = "base16-ocean.dark"
# Whether image file preview is enabled in the object preview.
# type: bool
image = false
```

### Syntax highlighting

In the object preview, Syntax highlighting using syntect is available. To enable this, set `preview.highlight = true` in the config file.

#### Color themes

You can change the color theme by specifying the theme name in `preview.highlight_theme`.

By default the following themes are available:

- `base16-ocean.dark`
- `base16-eighties.dark`
- `base16-mocha.dark`
- `base16-ocean.light`
  - https://github.com/SublimeText/Spacegray
- `InspiredGitHub`
  - https://github.com/sethlopez/InspiredGitHub.tmtheme
- `Solarized (dark)`
- `Solarized (light)`
  - https://github.com/altercation/solarized

Also, by creating `xxx.tmTheme` in `$STU_ROOT_DIR/preview_theme/`, you can use `xxx` and load it.

#### Syntax definitions

You can add syntax definitions for file types that are not supported by default. You can use it by creating a `.sublime-syntax` file in `$STU_ROOT_DIR/preview_syntax/`.

https://www.sublimetext.com/docs/syntax.html

## Features / Screenshots

### Bucket list

- Show list of buckets
  - filter/sort items
- Copy resource name to clipboard

<img src="./img/bucket-list.png" width=400> <img src="./img/bucket-list-filter.png" width=400> <img src="./img/bucket-list-sort.png" width=400> <img src="./img/bucket-list-copy.png" width=400>

### Object list

- Show list of objects in a hierarchy
  - filter/sort items
- Copy resource name to clipboard

<img src="./img/object-list-simple.png" width=400> <img src="./img/object-list-hierarchy.png" width=400> <img src="./img/object-list-many.png" width=400> <img src="./img/object-list-filter.png" width=400> <img src="./img/object-list-sort.png" width=400> <img src="./img/object-list-dir-copy.png" width=400> <img src="./img/object-list-file-copy.png" width=400>

### Object detail

- Show object details
- Show object versions
- Download object
  - Download the specified version
- Preview object
  - Preview the specified version
- Copy resource name to clipboard

<img src="./img/object-detail.png" width=400> <img src="./img/object-version.png" width=400> <img src="./img/object-download.png" width=400> <img src="./img/object-details-copy.png" width=400>

### Object preview

- syntax highlighting (by [syntect](https://github.com/trishume/syntect))
  - It must be enabled in the [config](#config-file-format)
- image preview (by [ratatui-image](https://github.com/benjajaja/ratatui-image))
  - It must be enabled in the [config](#config-file-format)

<img src="./img/object-preview.png" width=400> <img src="./img/object-preview-image.png" width=400>

## Troubleshooting

- If you cannot connect to AWS S3, first check whether you can connect using the AWS CLI with the same settings.
- By running with the `--debug` flag, logs will be output to `$STU_ROOT_DIR/debug.log`.
  - Currently, application events and AWS SDK logs are output.
  - Pressing `F12` while the application is running will dump the application state to the log.
- When reporting a problem, please include the information like the following.
  - Application version
  - Operating system and version
  - Terminal you are using
  - Steps to reproduce the issue
  - Relevant log files or error messages

## Contributing

To get started with contributing, please review [CONTRIBUTING.md](CONTRIBUTING.md).

Contributions that do not follow these guidelines may not be accepted.

## Related projects

- [DDV](https://github.com/lusingander/ddv) - Terminal DynamoDB Viewer ⚡️

## License

MIT
