import { generateMarkdownTable } from '../src/utils/generate-readme.js'

generateMarkdownTable({
  excludePrivateRepos: true
}).then(() => {
  console.log('script done')
})
