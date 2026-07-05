---
repo: kevinslin/lambda-when-will-i-coldstart
url: 'https://github.com/kevinslin/lambda-when-will-i-coldstart'
homepage: null
starredAt: '2019-02-05T22:14:54Z'
createdAt: '2019-02-01T22:50:30Z'
updatedAt: '2021-01-31T15:27:04Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T21:19:47.504Z'
description: >-
  Experiment to find out how long your function would need to be idle for for it
  to be recycled
tags: []
---

# lambda-coldstart-time
Experiment to find out how long your function would need to be idle for for it to be recycled

# Setup

1. Setup lambda functions using serverless

```
sls deploy

```

2.  Create a StepFunction in region you plan on performing exeriment in using the configuration in `stepfunction.json`. Make sure you update `Resource` with the ARN of the corresponding lambda function that you created in step 1

3. Create a `.env` file in the root directory. Add the ARN of your state function to it

```
STATE_MACHINE_ARN={YOUR_SF_RUN}
```

3. Run the experiment

```
node analysis/run.js| bunyan
```

4. Gather results
- add the following to your `.env` file. by default, this will be the {month}{day}{year}T{hour}{minute} that the Lambda function was run on
```
FUNCTION_SUFFIX={YOUR_LAMBDA_SUFFIX}
```

- run results (by default, output is stored in `/tmp/out.csv`)
```
node analysis/gatherResults.js| bunyan
```

