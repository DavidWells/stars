import ghPages from 'gh-pages'
import { generateStaticSite } from '../src/utils/generate-site.js'
import { SITE_DIRECTORY } from '../src/_constants.js'

async function buildAndDeploy() {
  /* Generate the static site */
  console.log('Generating static site...')
  await generateStaticSite()

  /* Deploy the static site */
  console.log('Deploying to gh-pages...')
  try {
    await deploy()
    console.log('Successfully deployed to gh-pages')
  } catch (err) {
    console.error('Failed to deploy:', err)
  }
}

async function deploy() {
  console.log('Deploying to gh-pages...')
  if (!process.env.CI) {
    try {
      await ghPages.publish(SITE_DIRECTORY)
      console.log('Successfully deployed to gh-pages')
    } catch (err) {
      console.error('Failed to deploy:', err)
    }
    return
  }

  console.log('Inside CI...')
  try {
    await ghPages.publish(SITE_DIRECTORY, {
      repo: `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
      user: {
        name: 'github-actions[bot]',
        email: 'github-actions[bot]@users.noreply.github.com'
      },
      silent: true // Prevents token from being exposed in logs
    })
    console.log('Successfully deployed to gh-pages')
  } catch (err) {
    console.error('Failed to deploy:', err)
  }
}

buildAndDeploy()
