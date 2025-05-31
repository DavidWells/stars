import { collect } from './index.js'
import { getMarkdownDir } from './_constants.js'

// Get username from CLI args, env var, or default
const username = process.argv[2] || process.env.GITHUB_USERNAME || 'davidwells'
const markdownOutputDir = getMarkdownDir(username)

collect({
  username,
  markdownOutputDir,
})
.then((result) => {
  console.log('result', result)
})
.catch(console.error)