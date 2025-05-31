import path from 'path'
import { fileURLToPath } from 'url'

// Add these lines at the top to define __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { GITHUB_TOKEN } = process.env
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'davidwells'
const SLASH_REPLACEMENT = '___|___'

const ROOT_DIRECTORY = path.join(__dirname, '..')
const README_FILEPATH = path.join(ROOT_DIRECTORY, 'README.md')
const STARS_DIRECTORY = path.join(ROOT_DIRECTORY, 'stars')
const SITE_DIRECTORY = path.join(ROOT_DIRECTORY, 'site')
const CACHE_DIRECTORY = path.join(ROOT_DIRECTORY, '.cache')
const JSON_CACHE_DIRECTORY_NAME = GITHUB_USERNAME
const JSON_CACHE_DIRECTORY = path.join(CACHE_DIRECTORY, JSON_CACHE_DIRECTORY_NAME)
const README_FRONTMATTER_KEY = 'hasReadMe'

function getMarkdownDir(username = GITHUB_USERNAME) {
  if (process.env.GITHUB_USERNAME && process.env.CI) {
    console.log('CI is true, using directory:', STARS_DIRECTORY)
    return STARS_DIRECTORY
  }
  return path.join(ROOT_DIRECTORY, `stars-${username}`)
}

export {
  fileURLToPath,
  getMarkdownDir,
  ROOT_DIRECTORY,
  GITHUB_TOKEN,
  GITHUB_USERNAME,
  CACHE_DIRECTORY,
  JSON_CACHE_DIRECTORY_NAME,
  JSON_CACHE_DIRECTORY,
  STARS_DIRECTORY,
  SITE_DIRECTORY,
  README_FILEPATH,
  SLASH_REPLACEMENT,
  README_FRONTMATTER_KEY
}
