import fs from 'fs-extra'
import matter from 'gray-matter'
import { STARS_DIRECTORY } from '../_constants.js'
import { sortFrontmatterKeys } from './fs.js'

async function saveReadMe(repo, readme) {
  const repoDetails = (repo && typeof repo.repo === 'object') ? repo.repo : repo
  const repoPath = repoDetails.full_name || repoDetails.fullName || repoDetails.repo
  const owner = (repoDetails.owner && repoDetails.owner.login) ? repoDetails.owner.login : repoDetails.repo.split('/')[0]
  const readMePath = `${STARS_DIRECTORY}/${repoPath}.md`

  // Read existing frontmatter if file exists
  let existingFrontmatter = {}
  try {
    if (await fs.pathExists(readMePath)) {
      const existingContent = await fs.readFile(readMePath, 'utf8')
      const { data } = matter(existingContent)
      existingFrontmatter = data
    }
  } catch (error) {
    console.error(`Error reading existing markdown file ${readMePath}:`, error)
  }

  // Prepare frontmatter data
  const newFrontmatter = {
    ...existingFrontmatter,
    ...{
      hasReadMe: Boolean(readme),
      refreshedAt: new Date().toISOString()
    }
  }

  const sortedFrontmatter = sortFrontmatterKeys(newFrontmatter, ['description', 'tags'])

  // Create markdown content with frontmatter using gray-matter
  const readmeText = (readme) ? `\n${readme}` : ''
  const fileContent = matter.stringify(readmeText, sortedFrontmatter)

  // Ensure directory exists
  await fs.ensureDir(`${STARS_DIRECTORY}/${owner}`)

  return fs.writeFile(readMePath, fileContent).then(() => {
    return readMePath
  })
}

export { saveReadMe }
