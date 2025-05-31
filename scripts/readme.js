import { generateMarkdownTable } from '../src/utils/generate-readme.js'
import { getMarkdownDir } from '../src/_constants.js'

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const username = process.argv[2] || process.env.GITHUB_USERNAME || 'davidwells'
  const markdownDir = getMarkdownDir(username)
  generateMarkdownTable({
    excludePrivateRepos: true,
    markdownOutputDir: markdownDir
  }).then(() => {
    console.log('script done')
  })
}
