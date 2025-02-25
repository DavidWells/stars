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
    await ghPages.publish(SITE_DIRECTORY)
    console.log('Successfully deployed to gh-pages')
  } catch (err) {
    console.error('Failed to deploy:', err)
  }
}

buildAndDeploy()
