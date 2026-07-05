---
repo: readysetcloud/blog-content-analyzer
url: 'https://github.com/readysetcloud/blog-content-analyzer'
homepage: null
starredAt: '2023-05-17T16:47:03Z'
createdAt: '2023-05-11T12:55:14Z'
updatedAt: '2024-12-19T15:18:43Z'
language: JavaScript
license: NA
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:49.342Z'
description: Runs text analysis on Markdown files with Step Functions
tags: []
---

# Blog Content Analyzer

This service contains a serverless application that takes Markdown, generates an audio file using AWS Polly, and performs text analysis using OpenAI's GPT-4 model. The analysis includes summarizing the content, calculating metadata, and scheduling social media posts.

For full details, please [check out the blog post](https://readysetcloud.io/blog/allen.helton/blog-level-up-writer-analytics-and-text-to-speech).

*Note - An updated blog post with newer features [can be found here](https://readysetcloud.io/blog/allen.helton/automatic-social-posts)*

## Workflow Overview

![](/images/workflow.png)

1. **Transform Markdown**: The workflow starts by converting the markdown blog post into plain text.
2. **Analyze**: The plain text is then analyzed in parallel. One branch uses ChatGPT to generate a summary, metadata, and social media post suggestions. The other branch uses AWS Polly to create an audio version of the blog post.
3. **Schedule** - If you use my [social media scheduler](https://github.com/allenheltondev/social-media-scheduler), social posts generated in this workflow will be automatically scheduled and published for you automatically
4. **Format Processed Data**: The analysis results and the audio file link are then formatted into a structured object.
5. **Save Processed Data**: Finally, the analysis results are saved in both the GitHub repository and a DynamoDB table.

## Deployment

The repo is deployed via AWS SAM. Once you have the SAM CLI installed on your machine, you can run the following commands:

```
sam build
sam deploy --guided
```

This will walk you through a wizard to collect the required deployment parameters.

You will also need to deploy the [serverless toolbox](https://github.com/allenheltondev/serverless-toolbox) repository for this to work. It uses the AskChatGPT function contained in that repository.

## Usage

The workflow requires the following arguments to run successfully:

* `key` - partition key of a record to update in DynamoDB (used to track analytics)
* `fileName` - Name of the file being processed (the file is not loaded, it is used as a reference)
* `commit` - Unique identifier for idempotency (I use the commit sha for the blog post)
* `content` - Full content of the blog post, including front matter

## Output

The workflow outputs the analysis results and the link to the audio file. These are saved in your GitHub repository and a DynamoDB table. The analysis results include a summary of the blog post, metadata (sentiment, tone, and word count), and social media post suggestions for Reddit, LinkedIn, and Twitter.

The analysis generated from ChatGPT is saved in the following format in DynamoDB:

```json
{
  "analysis": {
    "sentiment": "Positive",
    "skillLevel": 8,
    "tone": "Informative",
    "wordCount": 986,
    "writingStyle": "Conversational with a touch of humor"
 },
 "audio": "{link to public audio file in S3}",
 "processedOn": "{date of processing}"
}
```
