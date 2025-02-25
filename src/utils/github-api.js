import fs from 'fs-extra'
import safe from 'safe-await'
import matter from 'gray-matter'
import { $fetch } from 'ofetch'
import { delay } from './delay.js'
import { STARS_DIRECTORY, README_FRONTMATTER_KEY } from '../_constants.js'

async function getSelfStaredRepos(delayPerPage) {
  const perPage = 100
  const repos = []
  let page = 1
  let loop = 0
  while (true) {
    console.log(`Getting page ${page}. Loop ${loop}`)
    if (loop > 1 && delayPerPage) {
      await delay(delayPerPage)
      loop++
    }
    const pageRepos = await $fetch(`https://api.github.com/user/starred`, {
      query: {
        page: page,
        per_page: perPage,
      },
      headers: {
        authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
        'user-agent': 'github-stars',
      },
      retry: 3,
      retryDelay: 100,
    })
    console.log(`Got ${pageRepos.length} repos`)
    console.log(pageRepos)
    repos.push(...pageRepos)
    console.log(`Current repos: ${repos.length}`)
    if (pageRepos.length < perPage) {
      break
    }
    page++
  }
  return repos
}

function extractRateLimit(headers) {
  if (!headers) return null
  const reset = parseInt(headers.get('x-ratelimit-reset'))
  return {
    limit: parseInt(headers.get('x-ratelimit-limit')),
    remaining: parseInt(headers.get('x-ratelimit-remaining')),
    reset: reset,
    resetTime: new Date(reset * 1000).toISOString(),
    used: parseInt(headers.get('x-ratelimit-used')),
  }
}

async function getReadMe(repo = {}, refresh) {
  const repoDetails = (repo && typeof repo.repo === 'object') ? repo.repo : repo
  const repoPath = repoDetails.full_name || repoDetails.fullName || repoDetails.repo
  const defaultBranch = repoDetails.default_branch || repoDetails.defaultBranch || repoDetails.branch || 'main'
  const filePath = `${STARS_DIRECTORY}/${repoPath}.md`
  
  // Check if file exists and has readme in frontmatter
  try {
    const exists = await fs.pathExists(filePath)
    if (exists) {
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data: frontmatter } = matter(fileContent)

      if (frontmatter.hasOwnProperty(README_FRONTMATTER_KEY) && !refresh) {
        console.log(`Readme already fetched for ${repoPath}, skipping...`)
        return
      }
    }
  } catch (err) {
    console.error(`Error checking file existence or frontmatter: ${err}`)
  }

  // from a commit https://raw.githubusercontent.com/org/name/dc3e42769b08fb091b3258c0e7c0dfbe19b11782/README.md

  console.log(`Getting readme for ${repoPath}`)
  const [apiError, response] = await safe(
    $fetch.raw(`https://api.github.com/repos/${repoPath}/readme`, {
      headers: {
        authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
        accept: 'application/vnd.github.raw+json',
        'user-agent': 'github-stars',
      },
      retry: 3,
      retryDelay: 100,
    })
  )

  let mdFromApi = null
  let rateLimit = null

  if (response) {
    const { headers, _data } = response
    mdFromApi = _data
    rateLimit = extractRateLimit(headers)
    // console.log('Remaing API calls:', rateLimit.remaining)
    console.log(`Remaining calls: ${rateLimit.remaining} til ${rateLimit.resetTime}`)
  }

  if (apiError) {
    console.error(`Error getting readme from github API: ${apiError}`)
  }

  /* Try raw request if error for README.md */
  if (apiError || !mdFromApi) {
    console.log(`Attempting HTTP GET for ${repoPath}/README.md`)
    // Make HTTP GET request to the raw readme file
    // const rawREADME_md = await getRawReadMe(repoDetails, 'README.md')
    // if (rawREADME_md) {
    //   return rawREADME_md
    // }
    const rawREADME = await getRawReadMe(repoPath, defaultBranch, 'README')
    if (rawREADME) {
      return { content: rawREADME, rateLimit }
    }
    const raw_readme = await getRawReadMe(repoPath, defaultBranch, 'readme')
    if (raw_readme) {
      return { content: raw_readme, rateLimit }
    }
  }
  
  return { content: mdFromApi, rateLimit }
}


async function getRawReadMe(repoPath, branch = 'main', readmeFileName = 'README.md') {
  if (!repoPath) {
    console.error(`Repo path is not set for ${repo}`)
    return
  }

  if (!branch) {
    console.error(`Branch is not set for ${repo}`)
    return
  }

  const [err, rawMdData] = await safe($fetch(`https://raw.githubusercontent.com/${repoPath}/${branch}/${readmeFileName}`, {
    headers: {
      'user-agent': 'github-stars',
    },
  }))

  if (err) {
    console.error(`Error getting raw readme from github: ${err}`)
    return
  }

  return rawMdData
}

async function getRepoHash(repo, mainBranch = 'main') {
  const [err, data] = await safe($fetch(`https://api.github.com/repos/${repo}/commits/${mainBranch}`, {
    headers: {
      authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
      'user-agent': 'github-stars',
    },
    retry: 3,
    retryDelay: 100,
  }))

  if (err) {
    console.error(`Error getting repo hash: ${err}`)
    return 'NA'
  }

  return data.sha
}

async function getGitHashFromDate(repo, date) {
  try {
    const commits = await $fetch(`https://api.github.com/repos/${repo}/commits`, {
      query: {
        until: date,
        per_page: 1
      },
      headers: {
        'authorization': 'Bearer ' + process.env.GITHUB_TOKEN,
        'user-agent': 'github-stars',
      },
      retry: 3,
      retryDelay: 100,
    })

    if (!commits || !commits[0] || !commits[0].sha) {
      console.log(`No commits found for ${repo} before ${date}`)
      return null
    }

    return commits[0].sha
  } catch (error) {
    console.error(`Error fetching git hash for ${repo}: ${error.message}`)
    return null
  }
}

async function getStarredRepos(username, page = 1) {
  const res = await $fetch.raw(`https://api.github.com/users/${username}/starred`, {
    query: {
      page: page,
      per_page: 100,
    },
    headers: {
      authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
      Accept: 'application/vnd.github.v3.star+json',
      'user-agent': 'github-stars',
    },
    retry: 3,
    retryDelay: 100,
    responseType: 'json',
  })
  // console.log(res)

  const { headers, _data } = res
  
  const linkHeader = headers.get('link')
  const links = linkHeader ? parseLinkHeader(linkHeader) : {}
  
  // Extract rate limit info from headers
  const rateLimit = extractRateLimit(headers)
  
  return {
    repos: _data,
    pagination: links,
    rateLimit,
  }
}

function parseLinkHeader(header) {
  const links = {}
  const parts = header.split(',')
  
  parts.forEach(part => {
    const section = part.split(';')
    const url = section[0].replace(/<(.*)>/, '$1').trim()
    const name = section[1].replace(/rel="(.*)"/, '$1').trim()
    links[name] = url
  })
  
  return links
}

async function getStarCount(username) {
  const res = await $fetch.raw(`https://api.github.com/users/${username}/starred`, {
    query: {
      per_page: 1,
    },
    headers: {
      authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
      Accept: 'application/vnd.github.v3.star+json',
      'user-agent': 'github-stars',
    },
    retry: 3,
    retryDelay: 100,
    responseType: 'json',
  })
  const { headers, body } = res

  const linkHeader = headers.get('link')
  const links = linkHeader ? parseLinkHeader(linkHeader) : {}
  // console.log('links', links)

  // Get total count from last page URL if available
  let totalStars = 0
  if (links.last) {
    const lastPageUrl = new URL(links.last)
    const lastPage = parseInt(lastPageUrl.searchParams.get('page'))
    totalStars = lastPage // GitHub's default per_page is 30
  }

  const rateLimit = extractRateLimit(headers)
  console.log(`Remaining calls: ${rateLimit.remaining} til ${rateLimit.resetTime}`)
  
  return {
    totalStars,
    rateLimit,
  }
}

// getStarCount('davidwells').then(console.log)

async function getSavedMdFilePaths() {
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

export {
  getStarredRepos,
  getSelfStaredRepos,
  getReadMe,
  getRawReadMe,
  getRepoHash,
  getGitHashFromDate,
  extractRateLimit,
  getStarCount,
  getSavedMdFilePaths,
}
