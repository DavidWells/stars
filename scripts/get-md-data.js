import { getSavedMdFileData } from '../src/utils/fs.js'

async function displayMdData() {
  console.log('Fetching markdown file data...')
  const mdFiles = await getSavedMdFileData()
  
  console.log('\nSummary:')
  console.log('========')
  console.log(`Total files processed: ${mdFiles.length}`)
  
  // Count files with readme
  const filesWithReadme = mdFiles.filter(file => file.frontmatter.hasReadMe)
  console.log(`Files with readme: ${filesWithReadme.length}`)

  // Get unique languages
  const languages = new Set(mdFiles.map(file => file.frontmatter.language).filter(Boolean))
  console.log(`Unique languages: ${languages.size}`)

  // Get all unique tags
  const tags = new Set(mdFiles.flatMap(file => file.frontmatter.tags || []))
  console.log(`Unique tags: ${tags.size}`)

  // Group by organization
  const orgStats = mdFiles.reduce((acc, file) => {
    acc[file.org] = (acc[file.org] || 0) + 1
    return acc
  }, {})
  
  console.log('\nTop Organizations:')
  console.log('================')
  Object.entries(orgStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([org, count]) => {
      console.log(`${org}: ${count} repos`)
    })
  
  console.log('\nLanguage Distribution:')
  console.log('====================')
  const languageStats = mdFiles.reduce((acc, file) => {
    const lang = file.frontmatter.language || 'Unknown'
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {})
  
  Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .forEach(([lang, count]) => {
      console.log(`${lang}: ${count} repos`)
    })
  
  console.log('\nPopular Tags:')
  console.log('============')
  const tagStats = mdFiles.reduce((acc, file) => {
    (file.frontmatter.tags || []).forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})
  
  Object.entries(tagStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .forEach(([tag, count]) => {
      console.log(`${tag}: ${count} repos`)
    })
  
  console.log('\nSample Repository Data:')
  console.log('=====================')
  // Show detailed info for first 5 repos
  mdFiles.slice(0, 5).forEach(file => {
    console.log(`\n${file.fullName}:`)
    console.log('- Description:', file.frontmatter.description)
    console.log('- Stars:', file.frontmatter.stars)
    console.log('- Language:', file.frontmatter.language)
    console.log('- Has README:', file.frontmatter.hasReadMe)
    console.log('- Tags:', file.frontmatter.tags?.join(', ') || 'none')
  })
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  displayMdData().catch(console.error)
}

export { displayMdData } 