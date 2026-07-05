---
repo: Barnard-PL-Labs/IaCAnalysis
url: 'https://github.com/Barnard-PL-Labs/IaCAnalysis'
homepage: null
starredAt: '2024-02-09T19:46:19Z'
createdAt: '2022-10-19T19:35:01Z'
updatedAt: '2024-04-01T18:38:47Z'
language: Python
license: Apache-2.0
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:37.147Z'
description: Static Analysis of Infrastructure as Code
tags: []
---

# IaC Analysis

https://arxiv.org/html/2402.15632v1

## 1. Prerequisites

### 1.1. Install `poetry`
The project is built with [poetry](https://python-poetry.org/). Please install it first.

After installing `poetry`, I recommend using the following command to configure `poetry` to put the python virtual environments in the directory of each project:

```shell
poetry config virtualenvs.in-project true
```

This helps VSCode to identify and start using the virtual environments.

### 1.2. Install project dependencies
Inside the project directory, you need to install the project's dependencies. You can do this by running the following command:

```shell
poetry install
```

This will create a virtual environment and install all the project's dependencies into it.


## 2. Usage

The main command, `iac-analysis`:
```shell
poetry run iac-analysis --help
```

To output a graph of the infrastruture, use `poetry run iac-analysis graph [CFN_FILE]`.

To output resource usage estimates template, use `poetry run iac-analysis estimates-template [CFN_FILE]`.

To show more information about the infrastructure and generated constraints, use `poetry run iac-analysis constrain [CFN_FILE]`.

This `check` sub-command checks whether the usage estimates satisfy the constraints of the infrastructure.
```shell
poetry run iac-analysis check [CFN_FILE] [USAGE_ESTIMATES]
```

The `constrain` and `check` subcommands support `-c` flag to supply custom constraint generator in the form of a Python module, which should export a function named `compute_constraints`. You may look at `./example_custom_constraints.py` as an example.

## 3. Benchmark

The project provides a benchmark script to reproduce the statistics in the paper.

First, enter the project shell/virtual environment:
```sh
poetry shell
```

Then you may produce statistics for the full set of benchmarks:
```sh
iac-analysis-benchmark all
```

If you want to, you may aldo produce statistics for any CFN template:
```sh
iac-analysis-benchmark single [CFN_TEMPLATE] --custom_smt2 [CUSTOM_SMT2]
```
