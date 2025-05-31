import fs from 'fs-extra'
import path from 'path'
import { getSavedJSONFileData, getSavedMdFileData } from './fs.js'
import { createStarTable } from './generate-readme.js'
import { getMarkdownDir, SITE_DIRECTORY } from '../_constants.js'

async function generateStaticSite(username) {
  const markdownDir = getMarkdownDir(username)
  try {
    // Get the stars data
    const allStars = (await getSavedMdFileData(markdownDir)).map(({ frontmatter }) => {
      return frontmatter
    })
    console.log('getAllStars', allStars.length)

    let sortedByStarredDate = allStars
      .sort((a, b) => new Date(b.starredAt) - new Date(a.starredAt))
      .map((repo) => {
        return {
          ...repo,
          isPrivate: repo.hasOwnProperty('isPublic') ? !repo.isPublic : false,
        }
      })

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
  const username = process.argv[2] || process.env.GITHUB_USERNAME || 'davidwells'
  const result = await generateStaticSite(username)
  console.log(result)
}

export { 
  generateStaticSite
}