import { getGitHashFromDate } from './utils/github-api.js'

const repo = '0no-co/GraphQLSP'
const date = '2023-04-12T16:54:48Z'

getGitHashFromDate(repo, date).then((hash) => {
  console.log('hash', hash)
})