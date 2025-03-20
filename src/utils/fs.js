import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import { 
  JSON_CACHE_DIRECTORY, 
  STARS_DIRECTORY, 
  STATE_CACHE_FILEPATH,
  SLASH_REPLACEMENT,
  README_FRONTMATTER_KEY
} from '../_constants.js'

function formatRepoName(fileName) {
  return fileName.replace('.json', '').replace(SLASH_REPLACEMENT, '/')
}

async function saveState(state) {
  await fs.writeFile(STATE_CACHE_FILEPATH, JSON.stringify(state, null, 2))
}

async function getState() {
  const state = await fs.readFile(STATE_CACHE_FILEPATH, 'utf8')
  return JSON.parse(state)
}

async function getSavedMdFilePaths() {
  console.log('Getting saved md file paths...', STARS_DIRECTORY)
  try {
    // Get all .md files recursively
    const files = await fs.readdir(STARS_DIRECTORY, { recursive: true })
    
    // Filter for .md files and format paths
    const mdFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        // Remove .md extension
        const withoutExt = file.slice(0, -3)
        // Split into org/repo format
        const [org, repo] = withoutExt.split('/')
        return {
          path: file,
          fullPath: `${STARS_DIRECTORY}/${file}`,
          org,
          repo,
          fullName: withoutExt
        }
      })

    return mdFiles
  } catch (error) {
    console.error('Error reading saved markdown files:', error)
    return []
  }
}

async function getSavedMdFileData() {
  try {
    // Get all markdown file paths first
    const mdFiles = await getSavedMdFilePaths()
    
    // Read and parse each file
    const mdFileData = await Promise.all(
      mdFiles.map(async ({ fullPath, org, repo, fullName }) => {
        try {
          const fileContent = await fs.readFile(fullPath, 'utf8')
          const { data: frontmatter, content } = matter(fileContent)
          
          return {
            path: fullPath,
            org,
            repo,
            fullName,
            frontmatter,
            content,
            // Add error field to track parsing issues
            error: null
          }
        } catch (error) {
          console.error(`Error parsing markdown file ${fullPath}:`, error)
          return {
            path: fullPath,
            org,
            repo,
            fullName,
            frontmatter: {},
            content: '',
            error: error.message
          }
        }
      })
    )

    // Filter out any files that failed to parse
    const validFiles = mdFileData.filter(file => !file.error)
    
    // Log any errors we encountered
    const errorFiles = mdFileData.filter(file => file.error)
    if (errorFiles.length > 0) {
      console.error(`Failed to parse ${errorFiles.length} markdown files:`)
      errorFiles.forEach(file => {
        console.error(`- ${file.path}: ${file.error}`)
      })
    }

    // Sort by starredAt in descending order (newest first)
    return validFiles.sort((a, b) => {
      const dateA = new Date(a.frontmatter.starredAt || 0)
      const dateB = new Date(b.frontmatter.starredAt || 0)
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error reading markdown files:', error)
    return []
  }
}

async function getCleanedRepoNames() {
  const repoFilePaths = await getSavedJSONFilePaths()
  const alreadyProcessedRepoNames = repoFilePaths.map(formatRepoName)
  return alreadyProcessedRepoNames
}

async function getSavedJSONFilePaths() {
  let dataFiles = []
  try {
    // filter out any non .json files
    dataFiles = await fs.readdir(JSON_CACHE_DIRECTORY)
    dataFiles = dataFiles.filter((file) => file.endsWith('.json'))
  } catch (e) {
    console.error(`Error reading data folder: ${e}`)
  }
  return dataFiles
}

async function getSavedJSONFileData() {
  const repoFilePaths = await getSavedJSONFilePaths()
  const repoFileData = await Promise.all(repoFilePaths.map(async (filePath) => {
    const data = await fs.readFile(path.join(JSON_CACHE_DIRECTORY, filePath), 'utf8')
    try {
      const json = JSON.parse(data)
      return json
    } catch (e) {
      console.error(`Error parsing JSON file: ${filePath}`)
      throw e
    }
  }))
  return repoFileData
}

async function readMesToFetch(githubStarData, refresh = false) {
  const results = await Promise.all(
    githubStarData.map(async (item) => {
      const repo = item.repo
      const readmePath = `${STARS_DIRECTORY}/${repo.full_name}.md`
      try {
        const exists = await fs.pathExists(readmePath)
        if (!exists) {
          return item // README doesn't exist at all
        }

        // File exists, check if it has readme in frontmatter
        const fileContent = await fs.readFile(readmePath, 'utf8')
        const { data: frontmatter } = matter(fileContent)
        
        // If no readme field in frontmatter, we need to fetch it
        if (refresh) {
          console.log(`Refreshing readme for ${repo.full_name}, will fetch`)
          return item
        }
        
        if (frontmatter.isPublic && frontmatter.isPublic === false) {
          console.log(`Repo ${repo.full_name} is not public, skipping`)
          return null
        }

        // use hasOwnProperty to check if readme is in frontmatter
        if (!frontmatter.hasOwnProperty(README_FRONTMATTER_KEY)) {
          console.log(`No "${README_FRONTMATTER_KEY}" field in frontmatter for ${repo.full_name}, will fetch`)
          return item
        }

        // if readme is in frontmatter, check if it's true
        if (frontmatter[README_FRONTMATTER_KEY]) {
          console.log(`Readme already fetched for ${repo.full_name}, skipping`)
          return null
        }

        return null // Has readme in frontmatter
      } catch(e) {
        console.error(`Error checking readme for ${repo.full_name}:`, e)
        return item // Any error, try to fetch readme
      }
    })
  )

  const reposNeedingReadme = results.filter((item) => item !== null)
  return reposNeedingReadme
}

/*  
const githubStarData = await getSavedJSONFileData()
readMesToFetch(githubStarData).then((repos) => {
  console.log('repos', repos)
})
/** */

async function fileDoesNotExist(filePath) {
  try {
    const exists = await fs.pathExists(filePath)
    return !exists
  } catch (e) {
    // console.error(`Error checking file existence: ${e}`)
  }
  return false
}
async function resetDirectories() {
  await fs.remove(JSON_CACHE_DIRECTORY)
  await fs.remove(STARS_DIRECTORY)
}

async function initDirectories() {
  await fs.ensureDir(JSON_CACHE_DIRECTORY)
  await fs.ensureDir(STARS_DIRECTORY)
}

/**
 * Sorts frontmatter keys in a specific order with description and tags at the end
 * @param {Object} frontmatter - The frontmatter object to sort
 * @param {string[]} keysAtEnd - Array of keys to place at the end
 * @returns {Object} - New object with keys in specific order and undefined values removed
 */
function sortFrontmatterKeys(frontmatter, keysAtEnd = ['description', 'tags']) {
  // Define the order of keys (excluding description and tags which go at the end)
  const keyOrder = [
    'repo',
    'url',
    'homepage',
    'starredAt',
    'createdAt',
    'updatedAt',
    'language',
    'license',
    'branch',
    'stars',
    'isPublic',
    'isTemplate',
    'isArchived',
    'isFork',
    README_FRONTMATTER_KEY,
    'refreshedAt'
  ]

  // Create new object with specified key order
  const sortedFrontmatter = keyOrder.reduce((obj, key) => {
    if (frontmatter.hasOwnProperty(key) && frontmatter[key] !== undefined) {
      obj[key] = frontmatter[key]
    }
    return obj
  }, {})

  // Add the specified end keys in the order they were provided
  keysAtEnd.forEach(key => {
    if (frontmatter.hasOwnProperty(key) && frontmatter[key] !== undefined) {
      sortedFrontmatter[key] = frontmatter[key]
    }
  })

  return sortedFrontmatter
}

export {
  fileDoesNotExist,
  readMesToFetch,
  getState,
  saveState,
  getCleanedRepoNames,
  getSavedJSONFilePaths,
  getSavedJSONFileData,
  getSavedMdFilePaths,
  getSavedMdFileData,
  initDirectories,
  resetDirectories,
  sortFrontmatterKeys,
}
