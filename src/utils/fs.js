import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import {
  CACHE_DIRECTORY,
  STARS_DIRECTORY, 
  SLASH_REPLACEMENT,
  README_FRONTMATTER_KEY,
  GITHUB_USERNAME
} from '../_constants.js'

const STATE_FILENAME = 'state.json'

function getStateFilePath(cacheDir, username) {
  return path.join(cacheDir, `state-${username}.json`)
}

function formatRepoName(fileName) {
  return fileName.replace('.json', '').replace(SLASH_REPLACEMENT, '/')
}

async function saveState(state, cacheDir = CACHE_DIRECTORY, username) {
  const stateFilePath = getStateFilePath(cacheDir, username)
  await fs.writeFile(stateFilePath, JSON.stringify(state, null, 2))
}

async function getState(cacheDir = CACHE_DIRECTORY, username) {
  const stateFilePath = getStateFilePath(cacheDir, username)
  const state = await fs.readFile(stateFilePath, 'utf8')
  return JSON.parse(state)
}

async function getSavedMdFilePaths(markdownOutputDir) {
  if (!markdownOutputDir) {
    throw new Error('markdownOutputDir is required')
  }
  console.log('Star output dir: ', markdownOutputDir)
  try {
    // Get all .md files recursively
    const files = await fs.readdir(markdownOutputDir, { recursive: true })
    
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
          fullPath: `${markdownOutputDir}/${file}`,
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

async function getSavedMdFileData(markdownOutputDir) {
  try {
    // Get all markdown file paths first
    const mdFiles = await getSavedMdFilePaths(markdownOutputDir)
    
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

function getUserCacheDir(cacheDir, username) {
  const jsonCacheDir = path.join(cacheDir, username)
  console.log('User cache dir:  ', jsonCacheDir)
  return jsonCacheDir
}

async function getSavedJSONFilePaths(cacheDir, username) {
  let dataFiles = []
  try {
    // filter out any non .json files
    dataFiles = await fs.readdir(getUserCacheDir(cacheDir, username))
    dataFiles = dataFiles.filter((file) => file.endsWith('.json'))
  } catch (e) {
    console.error(`Error reading data folder: ${e}`)
  }
  return dataFiles
}

async function getSavedJSONFileData(cacheDir, username) {
  const repoFilePaths = await getSavedJSONFilePaths(cacheDir, username)
  const repoFileData = await Promise.all(repoFilePaths.map(async (filePath) => {
    const data = await fs.readFile(path.join(getUserCacheDir(cacheDir, username), filePath), 'utf8')
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

async function readMesToFetch(githubStarData, refresh = false, markdownOutputDir = STARS_DIRECTORY) {
  const results = await Promise.all(
    githubStarData.map(async (item) => {
      const repo = item.repo
      const readmePath = `${markdownOutputDir}/${repo.full_name}.md`
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

async function resetDirectories(markdownOutputDir, cacheDir) {
  await fs.remove(cacheDir)
  await fs.remove(markdownOutputDir)
}

async function initDirectories(markdownOutputDir, cacheDir, username) {
  await fs.ensureDir(cacheDir)
  await fs.ensureDir(markdownOutputDir)
  const jsonCacheDir = getUserCacheDir(cacheDir, username)
  await fs.ensureDir(jsonCacheDir)
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
