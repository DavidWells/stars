import fs from 'fs-extra'
import path from 'path'
import { getSavedJSONFileData } from './fs.js'
import { createStarTable } from './generate-readme.js'
import { SITE_DIRECTORY } from '../_constants.js'

async function generateStaticSite() {
  try {
    // Get the stars data
    const allStars = await getSavedJSONFileData()

    // Sort by starred date
    const sortedByStarredDate = allStars
      .sort((a, b) => new Date(b.starred_at) - new Date(a.starred_at))
      .map(({ repo, starred_at }) => {
        const licenseObj = repo.license || {}
        return {
          repo: repo.full_name,
          private: repo.private,
          description: repo.description,
          starredAt: starred_at,
          createdAt: repo.created_at,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          branch: repo.default_branch,
          license: licenseObj.spdx_id,
          visibility: repo.visibility,
          isFork: repo.fork,
          isPrivate: repo.private,
          isArchived: repo.archived,
          isTemplate: repo.is_template,
          isDisabled: repo.disabled,
          topics: repo.topics,
        }
      })
      .filter((repo) => !repo.private) // Exclude private repos

    // Generate the table HTML
    const tableHtml = createStarTable(sortedByStarredDate, false, 130)
    
    /* Make site directory if it doesn't exist */
    await fs.ensureDir(SITE_DIRECTORY)
    // Save the table HTML
    await fs.writeFile(path.join(SITE_DIRECTORY, 'stars-data.html'), tableHtml)

    console.log('✨ Static site content generated successfully!')
    console.log(`📊 Total stars processed: ${sortedByStarredDate.length}`)
  } catch (error) {
    console.error('Error generating static site:', error)
    process.exit(1)
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const result = await generateStaticSite()
  console.log(result)
}

export { 
  generateStaticSite
}