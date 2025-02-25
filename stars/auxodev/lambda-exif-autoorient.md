---
repo: auxodev/lambda-exif-autoorient
url: 'https://github.com/auxodev/lambda-exif-autoorient'
homepage: null
starredAt: '2020-01-15T05:42:40Z'
createdAt: '2015-02-09T18:35:55Z'
updatedAt: '2023-01-10T13:01:15Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:08.629Z'
description: >-
  AWS Lambda Function to autoorient photos using the exif information when
  uploaded to one bucket and stored to another.
tags: []
---

#How to use this code

1. Go to the AWS Lambda Console and create a new lambda function.
2. You'll need to setup one S3 buckets, one is the source that will trigger the lambda function and the other one is the destiny bucket where the auto-oriented photos will be stored.
3. You'll also need to setup two IAM Roles one for the bucket to be able to call the lambda function, and one for the lambda function to be able to read, write and modify the permissions of the objects in the S3 buckets.

This is the IAM policy used in the lambda function:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:*"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
 "s3:DeleteObject",
"s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::*"
      ]
    }
  ]
}
```

This is the IAM used to invoke the lambda function:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "lambda:InvokeFunction"
      ]
    }
  ]
}

```
In the AWS S3 Console in the bucket property list you must configure the event dispatch from the bucket.

In the events field select `ObjectCreated(All)`
Send to Lambda function
You can check the Lambda ARN in the lambda section of the console, and the IAM role to invoke it in the IAM section of the console.

##Using the aws cli:

If you have never used the aws cli you'll need to install it and run `aws config`.

Then to zip the contents of this folder run `zip -r archive.zip ./*`

Then to upload the code:

		aws lambda upload-function \
		   --region us-east-1 \
		   --function-name ViuAutoOrient  \
		   --function-zip ./archive.zip \
		   --role arn:aws:iam::446362648863:role/lambda_exec_role_viu_autoorient \
		   --mode event \
		   --handler index.handler \
		   --runtime nodejs \
		   --debug \
		   --timeout 60 \
		   --memory-size 1024

Take into account that this code mutates the original object and stores the corrected version under the exact same bucket and key.
