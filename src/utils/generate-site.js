import fs from 'fs-extra'
import path from 'path'
import { build } from 'vite'
import { getSavedMdFileData } from './fs.js'
import { getMarkdownDir, ROOT_DIRECTORY, SITE_DIRECTORY, SITE_SOURCE_DIRECTORY } from '../_constants.js'

function normalizeStarData(star) {
  return {
    repo: star.repo,
    url: star.url,
    homepage: star.homepage,
    starredAt: star.starredAt,
    createdAt: star.createdAt,
    updatedAt: star.updatedAt,
    language: star.language,
    license: star.license,
    branch: star.branch,
    stars: star.stars,
    isPublic: star.isPublic,
    isTemplate: star.isTemplate,
    isArchived: star.isArchived,
    isFork: star.isFork,
    description: star.description,
    tags: Array.isArray(star.tags) ? star.tags : [],
  }
}

async function writeSiteData(username) {
  const markdownDir = getMarkdownDir(username)
  // Get the stars data
  const allStars = (await getSavedMdFileData(markdownDir)).map(({ frontmatter }) => {
    return frontmatter
  })
  console.log('getAllStars', allStars.length)

  const sortedByStarredDate = allStars
    .sort((a, b) => new Date(b.starredAt).getTime() - new Date(a.starredAt).getTime())
    .map((repo) => {
      return {
        ...repo,
        isPrivate: repo.hasOwnProperty('isPublic') ? !repo.isPublic : false,
      }
    })
    .filter((repo) => !repo.isPrivate)
    .map(normalizeStarData)

  const publicDir = path.join(SITE_SOURCE_DIRECTORY, 'public')
  await fs.ensureDir(publicDir)
  await fs.writeJson(
    path.join(publicDir, 'stars.json'),
    {
      generatedAt: new Date().toISOString(),
      total: sortedByStarredDate.length,
      stars: sortedByStarredDate,
    },
    { spaces: 2 }
  )

  return {
    markdownDir,
    stars: sortedByStarredDate,
  }
}

async function generateStaticSite(username) {
  try {
    const { markdownDir, stars } = await writeSiteData(username)

    await build({
      configFile: path.join(ROOT_DIRECTORY, 'vite.config.js'),
    })

    await fs.copy(markdownDir, path.join(SITE_DIRECTORY, 'stars'), {
      filter: (src) => path.basename(src) !== '.DS_Store',
    })
    await fs.writeFile(path.join(SITE_DIRECTORY, '.nojekyll'), '')

    console.log('✨ Static site content generated successfully!')
    console.log(`📊 Total stars processed: ${stars.length}`)
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
  generateStaticSite,
  writeSiteData
}
