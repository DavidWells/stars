---
repo: kamranahmedse/local-ses
url: 'https://github.com/kamranahmedse/local-ses'
homepage: null
starredAt: '2024-09-16T22:45:15Z'
createdAt: '2023-11-17T15:25:21Z'
updatedAt: '2024-12-28T08:12:13Z'
language: TypeScript
license: NA
branch: main
stars: 157
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:21.346Z'
description: Trap and test AWS SES emails locally
tags: []
---

# local-ses

> Trap and test AWS SES emails locally

![local-ses](./.github/email-demo.png)

## Setup

You can simply use `docker` to run the service locally

```bash
docker run -d --name local-ses -p 8282:8282 kamranahmed/local-ses:latest
```

This will start the service on port `8282`. Next, modify your SES client to use the local service. 

For example, if you are using `aws-sdk` you can do something like

```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({
  region: credentials.region,
  credentials: {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
  },
  endpoint: "http://localhost:8282", // <--- Add this to trap emails locally
});

// Send emails as usual
const command = new SendEmailCommand({/*...*/});
const result = await sesClient.send(command);

logInfo(`Email sent to ${toAddress} with message ID ${result.MessageId}`);
```

## License

MIT © [Kamran Ahmed](https://twitter.com/kamrify)
