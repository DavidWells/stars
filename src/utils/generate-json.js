import fs from 'fs-extra'
import { SLASH_REPLACEMENT, JSON_CACHE_DIRECTORY } from '../_constants.js'

async function saveToJSONFile(apiResponse = {}) {
  const cleanedRepo = cleanGithubRepo(apiResponse)
  const repoDetails = cleanedRepo.repo
  const data = JSON.stringify(cleanedRepo, null, 2)
  const filePath = `${JSON_CACHE_DIRECTORY}/${repoDetails.full_name.replace('/', SLASH_REPLACEMENT)}.json`
  return fs.writeFile(filePath, data).then(() => filePath)
}

function cleanGithubRepo(data) {
  const repoUrlsToRemove = [
    'forks_url', 'keys_url', 'collaborators_url', 'teams_url', 'hooks_url',
    'issue_events_url', 'events_url', 'assignees_url', 'branches_url',
    'tags_url', 'blobs_url', 'git_tags_url', 'git_refs_url', 'trees_url', 
    'statuses_url', 'languages_url', 'stargazers_url', 'contributors_url',
    'subscribers_url', 'subscription_url', 'commits_url', 'git_commits_url',
    'comments_url', 'issue_comment_url', 'contents_url', 'compare_url',
    'merges_url', 'archive_url', 'downloads_url', 'issues_url', 'pulls_url',
    'milestones_url', 'notifications_url', 'labels_url', 'releases_url',
    'deployments_url', 'node_id', 'git_url', 'ssh_url', 'clone_url', 'svn_url', 
    'web_commit_signoff_required', 'permissions'
  ]

  const ownerUrlsToRemove = [
    'followers_url', 'following_url', 'gists_url', 'starred_url',
    'subscriptions_url', 'organizations_url', 'repos_url', 'events_url',
    'received_events_url', 'gravatar_id'
  ]

  const cleanOwner = Object.fromEntries(
    Object.entries(data.repo.owner).filter(([key]) => !ownerUrlsToRemove.includes(key))
  )

  const cleanRepo = Object.fromEntries(
    Object.entries(data.repo).filter(([key]) => !repoUrlsToRemove.includes(key))
  )

  return Object.assign({}, data, { 
    repo: Object.assign({}, cleanRepo, { owner: cleanOwner }) 
  })
}

export { saveToJSONFile }
