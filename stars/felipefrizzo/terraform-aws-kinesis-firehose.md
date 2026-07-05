---
repo: felipefrizzo/terraform-aws-kinesis-firehose
url: 'https://github.com/felipefrizzo/terraform-aws-kinesis-firehose'
homepage: ''
starredAt: '2019-10-06T07:41:25Z'
createdAt: '2018-10-19T13:30:35Z'
updatedAt: '2024-07-16T20:15:15Z'
language: HCL
license: MIT
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.861Z'
description: This code creates a Kinesis Firehose in AWS to send CloudWatch log data to S3.
tags:
  - analytics
  - big-data
  - big-data-processing
  - cloudwatch-logs
  - etl-job
  - kinesis-firehose
  - parquet
  - terraform
  - terraform-aws
  - terraform-provider
---

# terraform-aws-kinesis-firehose

This code creates a [Kinesis Firehose]('https://aws.amazon.com/kinesis/data-firehose/') in AWS to send CloudWatch log data to S3.

## Usage

```terraform
module "kinesis-firehose" {
  source                                = "git::https://github.com/felipefrizzo/terraform-aws-kinesis-firehose.git?ref=master"
  region                                = "aws_region"
  kinesis_firehose_stream_name          = "stream_name"
  kinesis_firehose_stream_backup_prefix = "bucket_backup_prefix"
  bucket_name                           = "bucket_name"
  root_path                             = false
  lambda_function_name                  = "lambda_function_name"
  lambda_function_file_name             = "kinesis-firehose-cloudwatch-logs-json-processor-python"
  glue_catalog_database_name            = "glue_catalog_database_name"
  glue_catalog_table_name               = "glue_catalog_table_name"
  glue_catalog_table_columns            = {
    "column_name" = {
      name = "column_name"
      type = "column_type"
    }
  }
  cloudwatch_subscription_filter_name   = "cloudwatch_subscription_filter_name"
  cloudwatch_log_group_name             = "cloudwatch_log_group_name"
  cloudwatch_filter_pattern             = "cloudwatch_filter_pattern"
}
```

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-------:|:--------:|
| kinesis_firehose_stream_name | Name to be use on kinesis firehose stream (e.g. `poc_logs`) | string | - | yes |
| kinesis_firehose_stream_backup_prefix | The prefix name to use for the kinesis backup (e.g. `backup_prefix`) | string | `` | no |
| bucket_name | Bucket name | string | - | yes |
| root_path | The path where the lambda function file is located is root or module path (e.g. `true`) | boolean | `` | no |
| lambda_function_name | Lambda function name (e.g. `lambda_kinesis`) | string | - | yes |
| lambda_function_file_name | Lambda function file name | string | - | yes |
| glue_catalog_database_name | Glue catalog database name | string | - | yes |
| glue_catalog_table_name | Glue catalog database table name | string | - | yes |
| glue_catalog_table_columns | A map of object of table columns | map | `<map>` | yes |
| cloudwatch_subscription_filter_name | Subscription filter name | string | - | yes |
| cloudwatch_log_group_name | Cloudwatch log group name | string | - | yes |
| cloudwatch_filter_pattern | Cloudwatch filter pattern | string | - | yes |
