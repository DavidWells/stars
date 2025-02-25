import fs from 'fs-extra'
import safe from 'safe-await'
import pLimit from 'p-limit'
import matter from 'gray-matter'
import { delay } from './utils/delay.js'
import { generateMarkdownTable } from './utils/generate-readme.js'
import { saveReadMe } from './utils/generate-star-md.js'
import { getStarredRepos, getReadMe, getStarCount } from './utils/github-api.js'
import { saveToJSONFile } from './utils/generate-json.js'
import { 
  getCleanedRepoNames, 
  getSavedJSONFileData,
  getSavedMdFileData,
  initDirectories, 
  resetDirectories,
  readMesToFetch, 
  saveState,
  sortFrontmatterKeys 
} from './utils/fs.js'
import {
  GITHUB_TOKEN,
  GITHUB_USERNAME,
  STARS_DIRECTORY,
  README_FRONTMATTER_KEY
} from './_constants.js'

if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is not set')
}

const { INITIAL_SEED } = process.env

const DELAY_PER_PAGE = 2000

async function getAllStars({
  username,
  pageStart = 1,
  // If not provided, will go until rate limit is reached
  maxPages = Infinity,
  delayPerPage = DELAY_PER_PAGE,
  dataFiles = [],
  refreshAll = false
}) {
  const perPage = 100
  const allReposFound = []
  const newReposFound = []

  let rateLimitState = {}
  let noNewStarsFound = false
  let someNewStarsFound = false
  let page = pageStart

  /* Recursively get all stars */
  while (true) {
    console.log(`Getting page ${page}...`)
    if (INITIAL_SEED === 'true' && page > 2) {
      await delay(delayPerPage)
    }
    const { repos, pagination, rateLimit } = await getStarredRepos(username, page)    
    console.log(`Remaining calls: ${rateLimit.remaining} til ${rateLimit.resetTime}`)

    /* Save all repos found */
    console.log(`Fetch retrieved ${repos.length} repos`)
    allReposFound.push(...repos)
    console.log(`Current stars collection: ${newReposFound.length}`)

    /* Save rate limit state */
    rateLimitState = rateLimit

    /* Check if data folder exists and already has any of these repos */
    const newRepos = repos.filter(({ repo }) => {
      // console.log('New repo found:', repo.full_name)
      // console.log(`${repo.full_name} Already processed?`, dataFiles.includes(repo.full_name))
      return !dataFiles.includes(repo.full_name)
    })

    if (newRepos.length > 0) {
      someNewStarsFound = true
    }
    /* Save new repos found */
    console.log(`Inside we found ${newRepos.length} new stars`)
    newReposFound.push(...newRepos)
    console.log(`Current NEW stars collection: ${newReposFound.length}`)

    /* Stop if no new repos found and not refreshing all */
    if (!newRepos.length && !refreshAll) {
      console.log('[Nothing new detected] No new repos found since last check, stopping loop here')
      noNewStarsFound = true
      break
    }

    /* Stop if no new repos found and not refreshing all */
    if (newRepos.length < perPage && !refreshAll) {
      console.log(`[New stars detected] ${newRepos.length} new repos found, stopping loop here`)
      break
    }

    /* Stop if rate limit is 0 or less than 0 */
    if (rateLimit.remaining <= 0) {
      console.log('Rate limit reached, Stopped at page', page)
      console.log('Resume this process later')
      break
    }

    /* Stop if last page reached */
    if (repos.length < perPage || (typeof maxPages !== 'undefined' && page >= maxPages)) {
      console.log('Last page reached, stopping loop here')
      break
    }

    page++
  }

  if (noNewStarsFound && !refreshAll) {
    const persistedStars = await getSavedJSONFileData()
    return {
      repos: persistedStars,
      newRepos: newReposFound,
      initialPage: pageStart,
      lastPage: page,
      rateLimitState,
      via: 'File system'
    }
  }

  if (someNewStarsFound && !refreshAll) {
    // Combine persisted stars with new stars and make sure no duplicates
    const persistedStars = await getSavedJSONFileData()
    const combinedStars = [...persistedStars, ...newReposFound]
    const uniqueStars = combinedStars.filter((star, index, self) => {
      const existingIndex = self.findIndex((t) => t.repo.full_name === star.repo.full_name)
      return existingIndex === index
    })

    console.log('persistedStars', persistedStars.length)
    console.log('newReposFound', newReposFound.length)
    console.log('combinedStars', combinedStars.length)
    console.log('uniqueStars', uniqueStars.length)

    return {
      repos: uniqueStars,
      newRepos: newReposFound,
      initialPage: pageStart,
      lastPage: page,
      rateLimitState,
      via: 'GitHub API and File system'
    }
  }

  return {
    repos: refreshAll ? allReposFound : newReposFound,
    newRepos: refreshAll ? allReposFound : newReposFound,
    initialPage: pageStart,
    lastPage: page,
    rateLimitState,
    via: 'GitHub API'
  }
}

async function collect(username) {
  const PAGE_START = 1
  const MAX_PAGES = Infinity
  const FORCE_REPO_DATA_REFRESH = false
  const FORCE_README_REFRESH = false

  /* Initialize directories, if they don't exist */
  await initDirectories()

  const existingStarMdData = (await getSavedMdFileData())
  // .filter(({ frontmatter }) => {
  //   return frontmatter.isPublic
  // })

  console.log('existingStarMdData', existingStarMdData.length)
  // console.log('existingStarMdData[0]', existingStarMdData[0])
  // process.exit(1)

  const { totalStars, rateLimit } = await getStarCount(username)
  console.log(`${username} has ${totalStars} stars`)
  console.log('rateLimit', rateLimit)

  /* We have all the Markdown files, so instead refresh the readmes */
  if ((existingStarMdData.length >= totalStars)) {
    const readMesWeNeed = existingStarMdData
      .filter(({ frontmatter }) => {
        // TODO check refreshedAt timestamp
        return !frontmatter.hasOwnProperty(README_FRONTMATTER_KEY)
      })
      .map(({ frontmatter }) => {
        return frontmatter
      }) // .slice(0, 10)

    if (readMesWeNeed.length > 0) {
      console.log('Refreshing readmes for', readMesWeNeed.length, 'repos')
      const paths = await getReadmeData(readMesWeNeed, FORCE_README_REFRESH)
      console.log('readmes refreshed', paths.length)
      return
    }
    console.log('No new stars found. exiting...')
    return
  }
  

  const existingStarDataFilePaths = existingStarMdData
    .filter(({ frontmatter }) => {
      // TODO check refreshedAt timestamp
      return frontmatter.hasOwnProperty(README_FRONTMATTER_KEY)
    })
    .map(({ fullName }) => fullName)
  console.log('existingStarDataFilePaths', existingStarDataFilePaths.length)
  // process.exit(1)

  const githubStarData = await getAllStars({
    username,
    pageStart: PAGE_START,
    maxPages: MAX_PAGES,
    refreshAll: FORCE_REPO_DATA_REFRESH,
    dataFiles: existingStarDataFilePaths,
  })

  console.log('All stars found', githubStarData.repos.length)
  console.log('New stars found', githubStarData.newRepos.length)
  console.log('initialPage', githubStarData.initialPage)
  console.log('lastPage', githubStarData.lastPage)
  console.log('rateLimitState', githubStarData.rateLimitState)
  console.log('via', githubStarData.via)

  const state = {
    lastRun: new Date().toISOString(),
    run: {
      startPage: githubStarData.initialPage,
      endPage: githubStarData.lastPage,
      count: githubStarData.repos.length,
      via: githubStarData.via,
    },
    starCount: totalStars,
    totalMdFiles: existingStarMdData.length,
    totalRepos: githubStarData.repos.length,
    newRepos: githubStarData.newRepos.length,
    rateLimitState: githubStarData.rateLimitState,
  }

  console.log('state', state)

  // Save lastPage and initialPage to file state.json file
  await saveState(state)

  /* Process all repos found and save to JSON */
  const processFilesPromise = githubStarData.newRepos.map(async (repo) => {
    // Save JSON cache
    const jsonPath = await saveToJSONFile(repo)
    
    // Generate and save markdown with frontmatter
    const repoData = repo.repo || repo
    const mdPath = `${STARS_DIRECTORY}/${repoData.full_name}.md`

    // Prepare new frontmatter
    const newFrontmatter = {
      repo: repoData.full_name,
      url: repoData.html_url,
      homepage: repoData.homepage,
      starredAt: repo.starred_at,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      language: repoData.language,
      license: repoData.license ? repoData.license.spdx_id : 'NA',
      branch: repoData.default_branch,
      stars: repoData.stargazers_count,
      // watchers: repoData.subscribers_count, // needs extra request
      isPublic: repoData.visibility === 'public',
      isTemplate: repoData.is_template,
      isArchived: repoData.archived,
      isFork: repoData.fork,
      description: repoData.description,
      tags: repoData.topics,
    }

    let existingFrontmatter = {}
    let existingContent = ''

    // Try to read existing file
    try {
      if (await fs.pathExists(mdPath)) {
        const fileContent = await fs.readFile(mdPath, 'utf8')
        const { data, content } = matter(fileContent)
        existingFrontmatter = data
        /* Remove keys we don't want */
        delete existingFrontmatter.readme
        delete existingFrontmatter.defaultBranch
        delete existingFrontmatter.watchers
        existingContent = content
      }
    } catch (error) {
      console.error(`Error reading existing markdown file ${mdPath}:`, error)
    }

    // Merge frontmatter, preferring new values but keeping any additional fields from existing
    const mergedFrontmatter = {
      ...existingFrontmatter,
      ...newFrontmatter
    }

    // Sort frontmatter keys with specified keys at the end
    const sortedFrontmatter = sortFrontmatterKeys(mergedFrontmatter, ['description', 'tags'])

    // Use gray-matter to stringify the content
    const mdContent = matter.stringify(existingContent, sortedFrontmatter)
    await fs.outputFile(mdPath, mdContent)
    
    return {
      jsonPath,
      mdPath
    }
  })

  const filePaths = await Promise.all(processFilesPromise)
  console.log('finished saving', filePaths.length)
  // console.log('filePaths', filePaths)

  await generateMarkdownTable({
    excludePrivateRepos: true
  })

  /* Half the rate limit per hour. to avoid rate limit */
  const GITHUB_API_LIMIT = 2500

  /* Resolve un-fetched readmes */
  const readMesWeNeed = (
    await readMesToFetch(githubStarData.newRepos, FORCE_README_REFRESH)
  ).slice(0, GITHUB_API_LIMIT)
  console.log('Repos that need a README saved', readMesWeNeed.length)

  const readMePaths = await getReadmeData(readMesWeNeed, FORCE_README_REFRESH)

  console.log(`Wrote ${readMePaths.length} README files`)

  if (githubStarData.rateLimitState.remaining <= 0) {
    console.log('Rate limit reached, stopping here')
    // process.exit(1)
  }
}

const limit = pLimit(3)

async function getReadmeData(readMesWeNeed, refresh = false) {

  const readMePaths = await Promise.all(
    readMesWeNeed.map(repo => {
      return limit(async () => {
        const [readmeError, readme] = await safe(getReadMe(repo, refresh))
        const readmeContent = (readme && readme.content) || ''
        return saveReadMe(repo, readmeContent)
      })
    })
  )

  return readMePaths
}

collect(GITHUB_USERNAME).then(() => {
  console.log('script done')
})