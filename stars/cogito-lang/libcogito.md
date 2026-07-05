---
repo: cogito-lang/libcogito
url: 'https://github.com/cogito-lang/libcogito'
homepage: ''
starredAt: '2020-09-12T01:28:01Z'
createdAt: '2016-07-15T17:59:38Z'
updatedAt: '2023-01-28T12:24:02Z'
language: C
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:34.496Z'
description: The cogito language implementation
tags:
  - cogito
---

# libcogito

[![Build Status](https://github.com/cogito-lang/libcogito/workflows/Main/badge.svg)](https://github.com/cogito-lang/libcogito/actions)

Cogito allows you to define your AWS IAM policies using a smaller, easier-to-read format. By writing:

```sql
allow dynamodb:Batch*, dynamodb:DeleteItem on dynamodb:::table/push*;
allow s3:PutRecord on kinesis:::stream/push*;
```

cogito will generate:

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "dynamodb:Batch*",
      "dynamodb:DeleteItem"
    ],
    "Resource": [
      "arn:aws:dynamodb:::table/push*"
    ]
  },
  {
    "Effect": "Allow",
    "Action": [
      "s3:PutRecord"
    ],
    "Resource": [
      "arn:aws:kinesis:::stream/push*"
    ]
  }
]
```

## Installation

### Mac

Cogito is hosted as a [homebrew formula](https://github.com/cogito-lang/homebrew-formulae), you can install by running:
 
```sh
brew tap cogito-lang/formulae
brew install cogito
```

### Amazon

You can download the appropriate object file from the GitHub release here:
 
```sh
wget https://github.com/cogito-lang/libcogito/releases/download/v0.2.0/libcogito.so
```

### Debian

You can download the appropriate object file from the GitHub release here:
 
```sh
FILE=$(mktemp)
wget 'https://github.com/cogito-lang/libcogito/releases/download/v0.2.0/libcogito_0.2.0-1_amd64.deb' -qO $FILE
sudo dpkg -i $FILE && rm $FILE
```

### Source

To install from source, checkout this repository and run:

```sh
autoreconf -i
./configure
make
make install
```

## Binary usage

You can convert between JSON and Cogito syntax on the command line:

```bash
$ cogito to-json 'ALLOW ec2:DescribeInstances ON *;'
[
  {
    "Effect": "Allow",
    "Action": [
      "ec2:DescribeInstances"
    ],
    "Resource": [
      "*"
    ]
  }
]

$ cogito to-iam '[{ "Effect": "Allow", "Action": "ec2:DescribeInstances", "Resource": "*" }]'
ALLOW
  ec2:DescribeInstances
ON
  *;
```

## Library usage

You can link against `libcogito` after it has been installed by including `cogito.h` in your C program. This will give you a `buffer` struct:

```c
typedef struct {
  size_t length;
  size_t capacity;
  char *content;
} cg_buf_t;
```

and two functions: `cg_to_json` and `cg_to_iam`. The call signature for these functions is:

```c
int cg_to_json(cg_buf_t *buffer, char *str);
int cg_to_iam(cg_buf_t *buffer, char *str);
```

where the return value will be a 0 in the case of success and an error code otherwise.

## Development

You need to install autoconf and automake for the `autoreconf -i` command to
work, like so:

    $ brew install autoconf automake

This program depends on [GNU Bison](https://www.gnu.org/software/bison/) and [flex](http://flex.sourceforge.net/). On Mac OSX you can install them using [homebrew](http://brew.sh/) like so:

    $ brew install flex bison

You may need to link them manually depending on your configuration, which you can do with:

    $ brew link flex --force

Once you have the depedencies installed, you can generate all of the necessary files by running:

    $ autoreconf -i
    $ ./configure
    $ make

### Testing

In order to work with the tests, ensure you have `check` installed on your system:

    $ brew install check

Now you can run:

    $ make check

to run the unit tests. In order to run the integration tests, run:

    $ tests/integration/test

### Building

To build the necessary artifacts, make sure `docker` is running on your machine. Then, ensure that you've built the necessary autotools files with `autoreconf -i` and `./configure`. Then, to build the debian package, run:

    $ make debian-build

And to build the Amazon Linux package, run:

    $ make amazon-build

### Releasing

Releasing a new version requires updating things in a couple places - follow the below script:

- Update the [amazon rpm spec](amazon/libcogito.spec) and the [debian changelog](debian/changelog).
- Merge the changes into master.
- Tag a release off of master with the new version and update the GitHub release docs.
- Build the packages artifacts (see Building above).
- Upload the package artifacts to the GitHub release.
- Update the [homebrew formula](https://github.com/cogito-lang/homebrew-formulae/blob/master/Formula/cogito.rb) to point to the latest version.

## Credits

The [CCAN](https://ccodearchive.net/) JSON library is used by libcogito uses for parsing and generating JSON.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/cogito-lang/libcogito.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
