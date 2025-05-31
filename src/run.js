import { collect } from './index.js'
import path from 'path'
import { ROOT_DIRECTORY } from './_constants.js'

const CUSTOM_USERNAME = process.env.GITHUB_USERNAME || 'davidwells'
const CUSTOM_OUTPUT_DIRECTORY = path.join(ROOT_DIRECTORY, `stars-${CUSTOM_USERNAME}`)

collect({
  username: CUSTOM_USERNAME,
  markdownOutputDir: CUSTOM_OUTPUT_DIRECTORY,
})
.then(console.log)
.catch(console.error)