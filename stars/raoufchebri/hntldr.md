---
repo: raoufchebri/hntldr
url: 'https://github.com/raoufchebri/hntldr'
homepage: null
starredAt: '2025-03-29T01:05:29Z'
createdAt: '2025-03-26T14:32:41Z'
updatedAt: '2025-03-29T01:05:30Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-29T22:30:01.997Z'
description: null
tags: []
---

# HNTLDR (Hacker News TL;DR)

HNTLDR is a Next.js application that provides summaries and insights from Hacker News. The project includes a web application and several packages for tracking Hacker News stories, generating summaries, and sending newsletters.

## Project Structure

```
.
├── app/                # Next.js web application
├── packages/          # Project packages
│   ├── hn-tracker/    # Hacker News tracking service
│   ├── summary-daily/ # Daily summary generation
│   ├── summary-weekly/# Weekly summary generation
│   └── newsletter-*   # Newsletter generation and sending
└── scripts/          # Utility scripts
```

## Package Details

### HN Tracker (packages/hn-tracker)
An AWS Lambda function that runs hourly to track Hacker News top stories. It:
- Fetches the top 10 stories from Hacker News API
- Records story rankings, scores, and timestamps
- Stores the data in a PostgreSQL database for trend analysis
- Runs on an hourly schedule via EventBridge

### Summary Generation (packages/summary-daily, packages/summary-weekly)
Lambda functions that generate summaries of top Hacker News stories:
- Analyzes story performance over 24h (daily) or 7d (weekly) periods
- Fetches full article content for top-performing stories
- Uses OpenAI to generate concise summaries
- Creates audio versions using ElevenLabs text-to-speech
- Stores audio files in S3 for web playback

### Newsletter Distribution (packages/newsletter-daily, packages/newsletter-weekly)
Lambda functions that create and send newsletters:
- Queries the database for top stories
- Generates dynamic email subjects using OpenAI
- Creates beautiful HTML email templates
- Sends newsletters via Resend to subscribers
- Includes links to audio summaries and discussions

## Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL database (Neon.tech recommended)
- [Resend](https://resend.com) account for email newsletters
- [OpenAI](https://openai.com) API key for summaries
- [ElevenLabs](https://elevenlabs.io) account for voice generation
- AWS Account with:
  - AWS CLI installed and configured
  - IAM permissions for:
    - Lambda function creation and management
    - S3 bucket creation and management
    - EventBridge rule creation
    - CloudWatch logs access
  - S3 bucket for storing audio files
- Environment variables configured (see below)

## Database Setup (Neon)

1. Create a Neon account:
   - Go to [Neon.tech](https://neon.tech)
   - Sign up for a free account

2. Create a new project:
   - Click "New Project"
   - Name it "hntldr" (or your preferred name)
   - Choose your region
   - Click "Create Project"

3. Set up the database schema:
   ```bash
   # Connect to your database
   psql <your_connection_string>
   
   # Run the schema file
   \i schema.sql
   ```
   The schema file creates:
   - `hacker_news_rankings`: Tracks HN story rankings and scores
   - `subscribers`: Manages newsletter subscribers
   - `summary_daily`: Stores daily story summaries
   - `summary_weekly`: Stores weekly story summaries
   - `summary_sources`: Links summaries to their source stories

4. Get your connection strings:
   - Go to your project dashboard
   - Click "Connection Details"
   - Copy the connection strings
   - Update your `.env` file:
     ```
     DATABASE_URL_PROD=your_production_connection_string
     DATABASE_URL_DEV=your_development_connection_string
     ```

5. Enable Connection Pooling (recommended for production):
   - Go to your project settings
   - Enable "Connection Pooling"
   - Use the pooled connection string for better performance

## Environment Variables

Required environment variables:

### Newsletter Configuration
- `RESEND_API_KEY` - API key from Resend
- `FROM_EMAIL` - Email address to send newsletters from
- `RESEND_AUDIENCE_ID_PROD` - Production audience ID from Resend
- `RESEND_AUDIENCE_ID_DEV` - Development audience ID from Resend

### OpenAI Configuration
- `OPENAI_API_KEY` - API key from OpenAI for generating summaries

### Database Configuration
- `DATABASE_URL_PROD` - PostgreSQL connection string for production
- `DATABASE_URL_DEV` - PostgreSQL connection string for development

### Voice Generation
- `ELEVEN_LABS_API_KEY` - API key from ElevenLabs
- `ELEVEN_LABS_VOICE_ID` - Voice ID for audio generation

Copy `.env.example` to `.env` and fill in your values for each variable.

## Running the Web Application

### Local Development

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

## Deployment

### Web Application (Vercel)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the app directory:
   ```bash
   cd app
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

5. Configure environment variables in Vercel:
   - Go to your project settings in Vercel dashboard
   - Add all required environment variables from `.env`

### AWS Lambda Functions

Each package in the `packages` directory contains its own deployment script. To deploy:

1. Configure AWS CLI with your credentials:
   ```bash
   aws configure
   ```

2. Deploy HN Tracker:
   ```bash
   cd packages/hn-tracker
   ./deploy.sh --prod  # Use --dev for development environment
   ```

3. Deploy Summary Generators:
   ```bash
   cd packages/summary-daily
   ./deploy.sh --prod
   
   cd ../summary-weekly
   ./deploy.sh --prod
   ```

4. Deploy Newsletter Functions:
   ```bash
   cd packages/newsletter-daily
   ./deploy.sh --prod
   
   cd ../newsletter-weekly
   ./deploy.sh --prod
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

