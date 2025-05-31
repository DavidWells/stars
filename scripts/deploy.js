import ghPages from 'gh-pages'
import { generateStaticSite } from '../src/utils/generate-site.js'
import { SITE_DIRECTORY } from '../src/_constants.js'

async function buildAndDeploy(username) {
  /* Generate the static site */
  console.log('Generating static site...')
  await generateStaticSite(username)

  /* Deploy the static site */
  try {
    console.log('Deploying to gh-pages...')
    await deploy()
    console.log('Deploy complete!')
  } catch (err) {
    console.error('Failed to deploy:', err)
  }
}

async function deploy() {
  if (!process.env.CI) {
    return ghPages.publish(SITE_DIRECTORY)
  }

  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set as action secret')
  }

  if (!process.env.GITHUB_REPOSITORY) {
    throw new Error('GITHUB_REPOSITORY is not set in the environment')
  }

  console.log('Inside CI...')
  await ghPages.publish(SITE_DIRECTORY, {
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
    user: {
      name: 'github-actions[bot]',
      email: 'github-actions[bot]@users.noreply.github.com'
    },
    silent: true // Prevents token from being exposed in logs
  })
}

const username = process.argv[2] || process.env.GITHUB_USERNAME || 'davidwells'
buildAndDeploy(username)
