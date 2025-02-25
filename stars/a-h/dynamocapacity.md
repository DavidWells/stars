---
repo: a-h/dynamocapacity
url: 'https://github.com/a-h/dynamocapacity'
homepage: null
starredAt: '2019-05-28T19:32:45Z'
createdAt: '2019-05-03T11:35:36Z'
updatedAt: '2024-09-10T18:02:53Z'
language: Go
license: NA
branch: master
stars: 65
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:37.008Z'
description: >-
  Compare cost of DynamoDB On Demand versus your current Provisioned Capacity
  setup.
tags: []
---

# dynamocapacity

Compare cost of DynamoDB On Demand versus your current Provisioned Capacity setup.

## Get stats for a single table.

```
go run main.go -region=eu-west-2 -table=your-table-name -day=2019-05-02
```

```
your-table-name
  Estimated daily:
    On Demand Read: $0.00075
    On Demand Write: $0.00075
    Provisioned Read: $0.01930
    Provisioned Write: $0.09264
  Estimated monthly:
    On Demand Read: $0.02282
    On Demand Write: $0.02282
    Provisioned Read: $0.58704
    Provisioned Write: $2.81780
```

## Get stats for a region.

```
go run main.go -region=eu-west-2 -allTables=true -day=2019-05-02
```

```
your-table-name
  Estimated daily:
    On Demand Read: $0.00075
    On Demand Write: $0.00075
    Provisioned Read: $0.01930
    Provisioned Write: $0.09264
  Estimated monthly:
    On Demand Read: $0.02282
    On Demand Write: $0.02282
    Provisioned Read: $0.58704
    Provisioned Write: $2.81780
    
your-table-name2
  Estimated daily:
    On Demand Read: $0.00075
    On Demand Write: $0.00075
    Provisioned Read: $0.01930
    Provisioned Write: $0.09264
  Estimated monthly:
    On Demand Read: $0.02282
    On Demand Write: $0.02282
    Provisioned Read: $0.58704
    Provisioned Write: $2.81780
    
Switch table your-table-name to on-demand to save $0.11044 per day
Switch table your-table-name2 to on-demand to save $0.11044 per day

Total saved per day: $0.22088
Total saved per month: $9.674544
```
