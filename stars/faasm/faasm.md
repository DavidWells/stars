---
repo: faasm/faasm
url: 'https://github.com/faasm/faasm'
homepage: 'https://faasm.readthedocs.io'
starredAt: '2020-07-15T19:14:11Z'
createdAt: '2018-10-02T14:49:29Z'
updatedAt: '2025-02-22T08:06:43Z'
language: C++
license: Apache-2.0
branch: main
stars: 888
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:43.311Z'
description: High-performance stateful serverless runtime based on WebAssembly
tags:
  - cpp
  - faas
  - kubernetes
  - mpi
  - openmp
  - serverless
  - wasi
  - wasm
  - webassembly
---

<div align="center">
<img src="https://raw.githubusercontent.com/faasm/faasm/main/faasm_logo.png"></img>
</div>

# Faasm [![Tests](https://github.com/faasm/faasm/workflows/Tests/badge.svg?branch=main)](https://github.com/faasm/faasm/actions)  [![License](https://img.shields.io/github/license/faasm/faasm.svg)](https://github.com/faasm/faasm/blob/main/LICENSE.md)  [![Release](https://img.shields.io/github/release/faasm/faasm.svg)](https://github.com/faasm/faasm/releases/)  [![Contributors](https://img.shields.io/github/contributors/faasm/faasm.svg)](https://github.com/faasm/faasm/graphs/contributors/) [![codecov](https://codecov.io/gh/faasm/faasm/branch/main/graph/badge.svg?token=F7HBQ84OSD)](https://codecov.io/gh/faasm/faasm)

Faasm is a high-performance stateful serverless runtime.

Faasm provides multi-tenant isolation, yet allows functions to share regions of
memory. These shared memory regions give low-latency concurrent access to data,
and are synchronised globally to support large-scale parallelism across multiple
hosts.

Faasm combines software fault isolation from WebAssembly with standard Linux
tooling, to provide security and resource isolation at low cost. Faasm runs
functions side-by-side as threads of a single runtime process, with low
overheads and fast boot times.

Faasm defines a custom host interface that extends [WASI](https://wasi.dev/) to
include function inputs and outputs, chaining functions, managing state,
accessing the distributed filesystem, dynamic linking, pthreads, OpenMP and MPI.

Our paper from Usenix ATC '20 on Faasm can be found
[here](https://www.usenix.org/conference/atc20/presentation/shillaker).

Please see the [full documentation](https://faasm.readthedocs.io/en/latest/) for
more details on the code and architecture.

## Quick start

Update submodules and activate the virtual environment:

```bash
git submodule update --init --recursive
source ./bin/workon.sh
```

Start a Faasm cluster locally using `docker compose`:

```bash
faasmctl deploy.compose
```

To compile, upload and invoke a C++ function using this local cluster you can
use the [faasm/cpp](https://github.com/faasm/cpp) container:

```bash
faasmctl cli.cpp

# Compile the demo function
inv func demo hello

# Upload the demo "hello" function
inv func.upload demo hello

# Invoke the function
inv func.invoke demo hello
```

For more information on next steps you can look at the [getting started
docs](https://faasm.readthedocs.io/en/latest/source/getting_started.html)

## Acknowledgements

This project has received funding from the European Union's Horizon 2020
research and innovation programme under grant agreement No 825184 (CloudButton),
the UK Engineering and Physical Sciences Research Council (EPSRC) award 1973141,
and a gift from Intel Corporation under the TFaaS project.
