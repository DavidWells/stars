---
repo: shuttle-hq/parallax
url: 'https://github.com/shuttle-hq/parallax'
homepage: ''
starredAt: '2020-06-09T23:50:23Z'
createdAt: '2020-03-18T10:37:40Z'
updatedAt: '2025-02-24T11:44:38Z'
language: Rust
license: NOASSERTION
branch: master
stars: 47
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:49.500Z'
description: A privacy-aware SQL query engine
tags: []
---

![parallax ci/cd](https://github.com/openquery-io/core/workflows/parallax%20ci/cd/badge.svg) ![parallax tests](https://github.com/openquery-io/core/workflows/parallax%20tests/badge.svg) [![version: 0.1](https://img.shields.io/badge/version-0.1-orange.svg)](./) [![license: BSL1.1](https://img.shields.io/badge/license-BSL1.1-green.svg)](./LICENSE)

# Parallax

[`Parallax`] is a distributed query engine for private/sensitive data. Its main features are:

- **Privacy as Code**: It lets you write privacy policies in a simple YAML manifest and enforces them rigorously at query-time.
- **Horizontally Scalable**: It scales as much as the database where your data is.
- **Declarative**: You state what you need and it figures out how to do it. With no unpredictable side-effect and with complete reproducibility.

At a high-level, [`Parallax`] works by recursively pattern-matching and transforming input user queries to adhere to the administrator's policies.

Parallax then re-writes queries into semantically equivalent private queries which are executed against the underlying backend.

## Getting started

The fastest way to get hacking with [`Parallax`] is to run it straight from our offical containers registry
```console
$ docker run -it --rm eu.gcr.io/openquery/parallax
```
The image will start a single [`parallax-worker`] node in the background. This lets you issue commands against it using the `parallax` CLI. The first thing you will want to do is initialize the deployment with
```console
root@xxxxxxxx:/opt/work# parallax init
```
which will configure an initial cluster state for us. That's it! We're up and running with the basics.

Should you wish to quickly onboard some data so we can start doing some queries, the easiest is to use the example manifests under [`example/manifest`]. In the rest of this guide we'll walk through that.

In the example we will link up with a public dataset on BigQuery. Of course, it does not need any anonymization or privacy features, but it will be enough to demonstrate the most basic features of [`Parallax`]. For this part you will need a [Service Account Key](https://cloud.google.com/iam/docs/service-accounts) for Google Cloud Platform (GCP) so that [`Parallax`] can authenticate with GCP to run queries on your behalf. That service account will need [write access](https://cloud.google.com/bigquery/docs/access-control-primitive-roles) to a blank BigQuery dataset (called a 'staging' dataset) so that [`Parallax`] can store staging artifacts. The queries in this example never exceed 5gb in size so you should comfortably stay within the [BigQuery free-tier](https://cloud.google.com/bigquery/pricing) of 1TiB at the time of writing this.

Let's use the public BigQuery [`london_bicycles`] dataset, which has some data on individual usage of rental bikes in London between 2015 and mid 2017. We have already made a simple set of policies for it [here](example/manifest/london_bicycles.yaml). That manifest declares a dataset "safe_dataset" consisting of two underlying BigQuery tables: `london_bicycles.cycle_hire` and `london_bicycles.cycle_stations`. After this manifest is applied to [`Parallax`], these tables will show up to be queried under `safe_dataset.cycle_hire` and `safe_dataset.cycle_stations`. The policies in the manifest ensure that only some select columns (e.g. `start_date`, `start_station_id`, etc) are allowed to be queried as-is through [`Parallax`], while some values must be obfuscated (e.g. `start_station_name`, etc) before being released to the user. All the columns not mentioned explicitly in the manifest will cause the query to be denied (the default is to not reveal anything).

The very first thing we need to do is get the current configuration state of [`Parallax`] checked out in the working directory. [`Parallax`] is completely declarative, a bit like [Terraform](https://www.terraform.io/) (we do not use HCL currently but we definitely want to). So the workflow is to add/modify/remove items from a collection of local manifest files, then run `parallax gov apply` to commit the changes back to [`Parallax`]. 

To check out the entire state in the file `state.yaml` we run
```console
root@xxxxxxxx:/opt/work# parallax --disable-tls gov fetch --output=state.yaml
```
At this point the `state.yaml` file will look something like this:
```yaml
- group:
    name: wheel
    members:
      - resource.user.root
- user:
    name: root
    email: ""
    public_keys:
      - "{SOME PEM ENCODED PUBLIC KEY}"
    auth_provider: ~
    primary_group: resource.group.wheel
    super_user: true
```
So it only contains a `root` user and an administrators group called `wheel`. Both were generated by our first call to `parallax init`. Note that we had to use the `--disable-tls` flag as the worker node on the image has TLS disabled by default.

Now copy your service account key into the running container (see [docker cp](https://docs.docker.com/engine/reference/commandline/cp/)) and set the following environment variables
```console
root@xxxxxxxx:/opt/work# export SERVICE_ACCOUNT_KEY={where my key is}
root@xxxxxxxx:/opt/work# export STAGING_PROJECT_ID={a GCP project_id}
root@xxxxxxxx:/opt/work# export STAGING_DATASET_ID={a GCP dataset_id}
```
We append the example manifest to our existing `state.yaml` with something like
```console
root@xxxxxxxx:/opt/work# curl https://raw.githubusercontent.com/openquery-io/core/master/parallax/example/manifest/london_bicycles.yaml |\
    envsubst >> state.yaml
```
Finally we have to apply the new manifest back to [`Parallax`] so that it actually uses it. This can be done with
```console
root@xxxxxxxx:/opt/work# parallax --disable-tls gov apply
```
We can then start running SQL queries to the protected dataset. Queries are managed via the `parallax jobs` subcommand. For example
```console
root@xxxxxxxx:/opt/work# cat<<EOF | parallax --disable-tls jobs insert
SELECT start_station_id, start_station_name
FROM safe_dataset.cycle_hire
EOF
```
We can find out the state of submitted jobs with `parallax jobs list` and `parallax jobs get`. When it is done (should only take a few seconds, depending on BigQuery's mood) we can fetch the result as a csv with
```console
root@xxxxxxxx:/opt/work# parallax jobs fetch {JOB_ID} --format=csv
```

## Building Parallax

You will first need to clone this repository locally, including all the submodules with,
```console
$ git clone --recursive git@github.com:openquery-io/core.git openquery-core
```

### Building in Docker
The easiest is to build the whole thing in Docker. Simply navigate to the root of the `core` repository and run 
```console
$ docker build -f parallax/docker/Dockerfile.build .
```

### Building locally
Run `cargo build` in this workspace. Building [`Parallax`] currently requires Rust nightly.

## Running tests

Most tests can be run locally as usual with `cargo test`. Some will require additional credentials to query which by default have to supplied by filling in a `secret/` folder at the root of the repository (currently used by the BigQuery backend looking for a GCP service account key to run under). The easiest way to find out what is missing is trying to run them and filling them in as required. We're actually working on a solution to make these publically runnable using our credentials so hang tight!

Apart from that you will need a quick and dirty Redis box for integration tests. This can be done simply by running off the official Redis docker image. For example:
```console
$ docker run -it --rm -p 6379:6379 redis
```

## Contributing

First of all, we sincerely appreciate any contributions large or small - so thank you.

See the [contributing](CONTRIBUTING.md) page for more details.

## License

This project is licensed under the [BSL license](LICENSE).

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in Parallax by you, shall be licensed as [BSL license](LICENSE), without any additional
terms or conditions.


[`Parallax`]: https://github.com/openquery-io/parallax
[`parallax-worker`]: ./worker
[`example/manifest`]: ./example/manifest
[`london_bicycles`]: https://console.cloud.google.com/marketplace/details/greater-london-authority/london-bicycles?filter=solution-type:dataset&id=95374cac-2834-4fa2-a71f-fc033ccb5ce4
