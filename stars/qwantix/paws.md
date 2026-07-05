---
repo: qwantix/paws
url: 'https://github.com/qwantix/paws'
homepage: null
starredAt: '2018-09-30T05:22:17Z'
createdAt: '2018-01-21T21:37:30Z'
updatedAt: '2019-01-26T06:46:10Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:13.328Z'
description: null
tags: []
---

# PAWS


Simple AWS pricing cli



## Install 

```
npm install -g paws-cli
```

## Usage


```
paws <service> <action> [options]
```

Supported services:

 - lambda
 - apigateway
 - athena
 - cloudwatch
 - dynamodb
 - ec2
 - cache
 - kinesis
 - firehose
 - rds
 - redshift
 - s3


### quote

All services implements command `quote`.

This command allow to estimate cost of service.


**Quote service ec2**
```
> paws ec2 quote -r eu-west-1 -i m3.medium --lease 1yr --upfront partial

Monthly fees:
  Linux/UNIX (Amazon VPC), m3.medium reserved instance applied
   └─  0.027 USD * 730 (Hrs) = 19.710 USD

One-time initial fees:
  Upfront Fee
   └─  211.000 USD

Total:

└─ Total Monthly: $19.71 /month
└─ Initial Fee: $211.00
└─ Smoothed monthly: $37.29 /month

```

Here smoothed monthly is **Total Monthly** + **Initial fee** / (**leasing duration** * 12)   

**Quote service s3**
```
> paws s3 quote -r eu-west-1 --volume 16Go

Monthly fees:
  $0.023 per GB - first 50 TB / month of storage used
   └─  0.023 USD * 16 (GB-Mo) = 0.368 USD

Total:

└─ Total Monthly: $0.37 /month
```

**Paramaters tips**
To? Go? Ko? hours ? minutes? Don't worry with units! When you use parameters, PAW convert with the invoicing unit used by AWS

Paws understand suffix bellow :

- bytes: Kb, Mb, Gb, Tb, Pb, Eb, Ko, Mo, Go, To, Po, Eo, K, M, G, T, P, E
- duration: d, h, m, s
- ops/s: /d, /h, /m, /s

_e.g.:_
```
--storage 8Go
--duration 45h
--reads 10/s
```




**Important:**
To estimate cost, paws load pricing file from aws. Some files (like ec2) are heavy and may take time to load. Be patient, files are put in local cache `/tmp/paws`




### Quote from yml file

Speed up your cost estimation and quote from a simple yaml file !

```yml
vars:
  eventsByDay: 4000000

defaults:
  region: eu-west-1
  
services:
  lambda:
    myFooLambda:
      size: 128
      invocations: ${eventsByDay}

  ec2:
    myServer:
      lease: 1yr
      upfront: partial
      instanceType: m3.medium

  s3:
    myBucket:
      volume: 10Go

  dynamodb:
    myDynamo:
      reads: 10/s
      writes: 10/min
```

This file contains 3 parts :
- `vars`: Define your custom vars
- `defaults`: Define your defaut params
- `services`: List of your services

Each services must be named (eg: myFooLambda) 


```
> paws quote sample.yml

lambda/ myFooLambda
──────────────────────────────────
Monthly fees:
   AWS Lambda - Total Requests - EU (Ireland)
    └─  2e-7 USD * 4000000 (Requests) = 0.800 USD
   AWS Lambda - Total Compute - EU (Ireland)
    └─  0.0000166667 USD * 500000 (Second) = 8.333 USD

Total:

 └─ Total Monthly: $9.13 /month

ec2/ myServer
──────────────────────────────────
Monthly fees:
   Linux/UNIX (Amazon VPC), m3.medium reserved instance applied
    └─  0.027 USD * 730 (Hrs) = 19.710 USD

One-time initial fees:
   Upfront Fee
    └─  211.000 USD

Total:

 └─ Total Monthly: $19.71 /month
 └─ Initial Fee: $211.00
 └─ Smoothed monthly: $37.29 /month

s3/ myBucket
──────────────────────────────────
Monthly fees:
   $0.023 per GB - first 50 TB / month of storage used
    └─  0.023 USD * 10 (GB-Mo) = 0.230 USD

Total:

 └─ Total Monthly: $0.23 /month

dynamodb/ myDynamo
──────────────────────────────────
Monthly fees:
   $0.00 per hour for 25 units of write capacity for a month (free tier)
    └─  0 USD * 7300 (WriteCapacityUnit-Hrs) = 0.000 USD
   $0.00 per hour for 25 units of read capacity for a month (free tier)
    └─  0 USD * 7300 (ReadCapacityUnit-Hrs) = 0.000 USD
   $0.00 per GB-Month of storage for first 25 free GB-Months
    └─  0 USD * 1 (GB-Mo) = 0.000 USD

Total:

 └─ Total Monthly: $0.00 /month


══════════════════════════════════
TOTAL/
──────────────────────────────────

Total:

 └─ Total Monthly: $29.07 /month
 └─ Initial Fee: $211.00
 └─ Smoothed monthly: $46.66 /month

```

### regions

All services implements command `regions` like this:

```
> paws ec2 regions

Available regions:
 -  ap-northeast-1
 -  ap-northeast-2
 -  ap-south-1
 -  ap-southeast-1
 -  ap-southeast-2
 -  ca-central-1
 -  eu-central-1
 -  eu-west-1
 -  eu-west-2
 -  eu-west-3
 -  sa-east-1
 -  us-east-1
 -  us-east-2
 -  us-gov-west-1
 -  us-west-1
 -  us-west-2

```


### other commands

Each service implemnts customs commands like `instanceTypes` for `ec2` 

You can use `paws [service] --help` to print available commands

List instances 
```
> paws ec2 instanceTypes -r eu-west-1 --family general

Available instances:

 -  m3.2xlarge
 -  m3.large
 -  m3.medium
 -  m3.xlarge
 -  m4.10xlarge
 -  m4.16xlarge
 -  m4.2xlarge
 -  m4.4xlarge
 -  m4.large
 -  m4.xlarge
 -  m5.12xlarge
 -  m5.24xlarge
 -  m5.2xlarge
 -  m5.4xlarge
 -  m5.large
 -  m5.xlarge
 -  t2.2xlarge
 -  t2.large
 -  t2.medium
 -  t2.micro
 -  t2.nano
 -  t2.small
```

Get more informations
```
> paws ec2 instanceTypes -r eu-west-1  --search m3.medium --details

Available instances:

 -  m3.medium
        Family                     :    General purpose
        Current Generation         :    Yes
        vCPU                       :    1
        ecu                        :    3
        Physical Processor         :    Intel Xeon E5-2670 v2 (Ivy Bridge/Sandy Bridge)
        Processor Features         :    Intel AVX; Intel Turbo
        Architecture               :    64-bit
        Clock Speed                :    2.5 GHz
        Memory                     :    3.75 GiB
        Storage                    :    1 x 4 SSD
        Network Performance        :    Moderate
        Normalization Size Factor  :    2
        Operating System           :    Windows, RHEL, SUSE, Linux
```




