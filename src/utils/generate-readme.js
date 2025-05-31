import path from 'path'
import safe from 'safe-await'
import { markdownMagic, stringUtils } from 'markdown-magic'
import { getSavedJSONFileData, getSavedMdFileData } from './fs.js'
import { getStarCount } from './github-api.js'
import { README_FILEPATH, GITHUB_USERNAME, ROOT_DIRECTORY, getMarkdownDir } from '../_constants.js'
import { mkdir, writeFile, access } from 'fs/promises'

const EMPTY_WHITE_SPACE_CHAR = '‎'
const BRAIL_SPACE = '⠀'

function escapeHtml(unsafe) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const MAX_TABLE_CONTENT_WIDTH = 75
function createStarTable(sortedByStarredDate, datePadding = true, maxWidth = MAX_TABLE_CONTENT_WIDTH) {
  /* Make HTML Table */
  let html = `<table>
  <tr>
  <th align="left">Repo</th>
  <th align="center">Starred On</th>
  </tr>`

  sortedByStarredDate.forEach((data, i) => {
    //console.log('data', data)
    // Skip items missing required properties
    if (!data || !data.repo) {
      console.warn('Skipping item missing required repo property:', data)
      return
    }

    const { repo, description, starredAt, createdAt, tags } = data
    const url = `https://github.com/${repo}`
    const desc = (data.description || '').trim().replace(/\.$/, '')
    const escapedDesc = escapeHtml(desc)
    const formattedDescription = stringUtils.stringBreak(escapedDesc, maxWidth).join('<br/>')
    const _description = data.description ? `<br/>${formattedDescription}. ` : ''
    const tagsRender =
      tags && tags.length > 0
        ? `<br/>${stringUtils
            .stringBreak(tinyText(`Tags: ${tags.map((topic) => `#${topic}`).join(' ')}`), maxWidth + 60)
            .join('<br/>')}`
        : ''
    const langText = data.language ? ` - ${data.language}` : ''
    const createdText = createdAt ? ` - ${formatDate(createdAt)}` : ''
    const inlineMeta = tinyText(`${langText}${createdText}`)
    const starredText = BRAIL_SPACE.repeat(0) + formatDate(starredAt) + BRAIL_SPACE.repeat(0)
    const BlankLine = datePadding ? BRAIL_SPACE.repeat(10) + '<br/>' : ''
    const localReadMe = localReadMePath(repo)

    html += `
  <tr>
  <td><a href="${url}">${stringUtils
      .stringBreak(repo, maxWidth)
      .join('<br/>')}</a>${inlineMeta}${tagsRender}${_description}</td>
  <td><a href="${localReadMe}">${starredText}</a><br/>${BlankLine}</td>
  </tr>`
  })

  html += `
</table>`

  return html
}

function tablePlugin(data) {
  return () => createStarTable(data)
}

/*
repo: 0x4447/0x4447_product_s3_email
url: 'https://github.com/0x4447/0x4447_product_s3_email'
homepage: 'https://0x4447.com'
starredAt: '2020-01-24T21:14:39Z'
createdAt: '2019-01-06T21:35:50Z'
updatedAt: '2025-02-20T13:36:02Z'
language: null
license: MIT
branch: master
stars: 3026
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:06.662Z'
description: "\U0001F4EB A serverless email server on AWS using S3 and SES"
tags:
  - '0x4447'
  - 0x4447-product-s3-email
  - 0x4447-products
  - aws
  - aws-lambda
  - aws-s3
  - aws-ses
  - codepipeline
  - email
  - email-sender
  - free
  - free-email
  - s3
  - s3-bucket
  - s3-email
*/

async function generateMarkdownTable(opts) {
  const options = opts || {}
  /* Hey now you're an all star */
  const allStars = (await getSavedMdFileData(opts.markdownOutputDir)).map(({ frontmatter }) => {
    return frontmatter
  })
  console.log('getAllStars', allStars.length)

  let sortedByStarredDate = allStars
    .sort((a, b) => new Date(b.starredAt) - new Date(a.starredAt))
    .filter(Boolean)
    .map((repo) => {
      return {
        ...repo,
        isPrivate: repo.hasOwnProperty('isPublic') ? !repo.isPublic : false,
      }
    })
  
  // Due to limitations with github markdown rendering this has been truncated to 1000
  const mostRecentRepos = sortedByStarredDate.slice(0, 1000)
  console.log('allStars[0]', mostRecentRepos[0])
  console.log('Stars to process', mostRecentRepos.length)

  if (options.excludePrivateRepos) {
    let privateRepos = []
    sortedByStarredDate = sortedByStarredDate.filter((repo) => {
      if (repo.isPrivate) {
        privateRepos.push(repo)
      }
      return !repo.isPrivate
    })
    console.log('Filtered out private repos', privateRepos.length)
    console.log('privateRepos', privateRepos)
  }

  const readmePath = (opts.markdownOutputDir) ? path.join(opts.markdownOutputDir, '_index.md') : README_FILEPATH
  console.log('readmePath', readmePath)
  await ensureReadmeExists(readmePath)

  return markdownMagic(readmePath, {
    // debug: true,
    transforms: {
      STAR_COUNT: async function () {
        if (process.env.GITHUB_TOKEN) {
          const [err, result ] = await safe(getStarCount(opts.username || GITHUB_USERNAME))
          if (result) {
            return numberWithCommas(result.totalStars)
          }
        }
        // Fallback to FS
        return numberWithCommas(allStars.length)
      },
      ALL_STARS_TABLE: tablePlugin(mostRecentRepos),
      ALL_STARS_MD() {
        const MAX_WIDTH = 90
        /* Make Markdown Table */
        let md = `| Repo | Starred On |\n`
        md += '|:-------------|:--------------:|\n'
        mostRecentRepos.forEach((data) => {
          console.log('item', data)
          const { repo, description, starredAt, createdAt, tags } = data
          const url = `https://github.com/${repo}`
          const desc = (data.description || '').trim().replace(/\.$/, '')
          const escapedDesc = escapeHtml(desc)
          const formattedDescription = stringUtils.stringBreak(escapedDesc, MAX_WIDTH).join('<br/>')
          const _description = description ? `<br/>${formattedDescription}. ` : ''
          const tagsRender =
            tags && tags.length > 0
              ? `<br/>${stringUtils
                  .stringBreak(tinyText(`Tags: ${tags.map((topic) => `#${topic}`).join(' ')}`), MAX_WIDTH + 60)
                  .join('<br/>')}`
              : ''
          const langText = data.language ? ` - ${data.language}` : ''
          const createdText = createdAt ? ` - ${formatDate(createdAt)}` : ''
          const inlineMeta = tinyText(`${langText}${createdText}`)
          const starredText = formatDate(starredAt)
          // add table rows
          md += `| [${stringUtils
            .stringBreak(data.repo, MAX_WIDTH)
            .join('<br/>')}](${url})${inlineMeta}${tagsRender}${_description} | ${starredText} | \n`
        })

        return md
      },
    },
  })
}

async function ensureReadmeExists(readmePath) {
  // Ensure the directory exists
  try {
    await mkdir(path.dirname(readmePath), { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  // Check if readme exists, if not create it with template
  try {
    await access(readmePath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      const template = `# GitHub Stars

Total Stars: **<!-- doc-gen STAR_COUNT -->0<!-- end-doc-gen -->**

## All Stars

<!-- doc-gen ALL_STARS_TABLE -->
stars will go here
<!-- end-doc-gen -->
`
      await writeFile(readmePath, template)
      console.log('Created new readme template at:', readmePath)
    } else {
      throw err
    }
  }
}

function tinyText(text, newLine = false) {
  // return text
  if (!text) return ''
  const brTag = newLine ? '<br/>' : ''
  return `${brTag}<sup><sub>${text}</sub></sup>`
}

function localReadMePath(repo) {
  return `./stars/${repo}.md`
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function trimIsoDate(isoDateString) {
  return tinyText(isoDateString.split('T')[0])
  return EMPTY_WHITE_SPACE_CHAR.repeat(3) + isoDateString.split('T')[0] + EMPTY_WHITE_SPACE_CHAR.repeat(3)
}

// Add this helper function for date formatting
function formatDate(isoDate) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const username = process.argv[2] || process.env.GITHUB_USERNAME || 'davidwells'
  const results = await generateMarkdownTable({
    username,
    excludePrivateRepos: true,
    markdownOutputDir: getMarkdownDir(username)
  })
  console.log(results.results[0].outputPath)
}


export { generateMarkdownTable, createStarTable }
